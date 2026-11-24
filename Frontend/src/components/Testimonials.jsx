import { useEffect, useRef, useState } from "react";

import { motion, useInView } from "framer-motion";

import { apiRequest } from "../services/api";


// Animation configuration.
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};


// --------------------------------------------------
// Star Rating Component
// --------------------------------------------------

function StarRating({ count }) {

  return (

    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>

      {Array.from({ length: 5 }).map((_, index) => (

        <svg
          key={index}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill={index < count ? "#F7C948" : "none"}
          stroke="#F7C948"
          strokeWidth="1.5"
        >

          <polygon
            points="12,2 15.09,8.26 22,9.27
            17,14.14 18.18,21.02 12,17.77
            5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          />

        </svg>

      ))}

    </div>

  );
}


// --------------------------------------------------
// Generate profile initials.
// --------------------------------------------------

function getInitials(fullName) {

  if (!fullName?.trim()) {
    return "S";
  }

  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

}


// --------------------------------------------------
// Individual Testimonial Card.
// --------------------------------------------------

function TestimonialCard({ testimonial }) {

  return (

    <article className="glass-card rounded-3xl p-6
      flex-shrink-0 w-72 md:w-80 mx-3
      flex flex-col gap-4 min-h-[230px]"
    >

      {/* Actual rating */}

      <StarRating count={testimonial.rating} />


      {/* Actual feedback */}

      <p className="text-white/70 text-sm
        leading-relaxed flex-1"
      >
        "{testimonial.comment}"
      </p>


      {/* Real reviewer details */}

      <div className="flex items-center gap-3">

        {/* Initial-based profile icon */}

        <div className="w-11 h-11 rounded-full
          bg-[#4ECDC4]/10
          border border-[#4ECDC4]/20
          flex items-center justify-center
          text-[#4ECDC4] font-semibold
          text-sm flex-shrink-0"
        >

          {getInitials(testimonial.fullName)}

        </div>


        <div>

          <p className="text-white text-sm font-medium">
            {testimonial.fullName}
          </p>

          <p className="text-white/40 text-xs mt-1">
            {testimonial.occupation}
          </p>

        </div>

      </div>

    </article>

  );

}


// --------------------------------------------------
// Main Testimonials Component.
// --------------------------------------------------

export default function Testimonials() {

  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });


  // Actual backend data.
  const [testimonials, setTestimonials] = useState([]);

  const [summary, setSummary] = useState({
    averageRating: 0,
    reviewCount: 0,
  });


  // UI states.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // --------------------------------------------------
  // Fetch approved testimonials and actual statistics.
  // --------------------------------------------------

  useEffect(() => {

    let isMounted = true;

    const fetchTestimonials = async () => {

      try {

        const [reviewsData, summaryData] = await Promise.all([

          apiRequest("/api/testimonials"),

          apiRequest("/api/testimonials/summary"),

        ]);

        if (!isMounted) return;

        setTestimonials(
          Array.isArray(reviewsData) ? reviewsData : []
        );

        setSummary({

          averageRating:
            Number(summaryData?.averageRating) || 0,

          reviewCount:
            Number(summaryData?.reviewCount) || 0,

        });

      } catch (err) {

        if (isMounted) {
          setError(
            err.message || "Unable to load testimonials."
          );
        }

      } finally {

        if (isMounted) {
          setLoading(false);
        }

      }

    };

    fetchTestimonials();

    return () => {
      isMounted = false;
    };

  }, []);


  // Duplicate the real data for seamless scrolling.
  const doubledTestimonials = [
    ...testimonials,
    ...testimonials,
  ];


  return (

    <section
      ref={ref}
      className="py-28 relative overflow-hidden"
    >

      {/* Background */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(17,24,48,0.3) 50%, transparent 100%)",
        }}
      />


      {/* Heading */}

      <div className="max-w-6xl mx-auto px-6 mb-14">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.7 }}
          className="text-center"
        >

          <p className="text-aurora/60 text-sm
            tracking-widest uppercase mb-4"
          >
            Member Reviews
          </p>


          <h2 className="font-display text-5xl
            md:text-6xl font-light text-white"
          >

            Words from our{" "}

            <span className="italic gradient-text">
              members
            </span>

          </h2>


          <p className="text-white/40 text-base mt-5">
            Experiences shared by people on their wellness journey.
          </p>

        </motion.div>

      </div>


      {/* Loading State */}

      {loading && (

        <div className="max-w-5xl mx-auto px-6">

          <div className="glass-card rounded-3xl p-10 text-center">

            <p className="text-gray-400">
              Loading approved member reviews...
            </p>

          </div>

        </div>

      )}


      {/* Error State */}

      {!loading && error && (

        <div className="max-w-5xl mx-auto px-6">

          <div className="glass-card rounded-3xl p-10 text-center">

            <p className="text-red-300 text-sm">
              We couldn't load member reviews right now.
            </p>

          </div>

        </div>

      )}


      {/* Empty State */}

      {!loading && !error && testimonials.length === 0 && (

        <div className="max-w-5xl mx-auto px-6">

          <div className="glass-card rounded-3xl p-10 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl
              bg-[#4ECDC4]/10
              flex items-center justify-center mb-5"
            >

              <span className="text-2xl text-[#4ECDC4]">
                ✨
              </span>

            </div>


            <h3 className="text-xl text-white font-medium">
              Every journey starts with one experience.
            </h3>


            <p className="text-sm text-gray-400 mt-3
              max-w-lg mx-auto leading-relaxed"
            >
              Member experiences will appear here once
              their reviews have been approved.
            </p>

          </div>

        </div>

      )}


      {/* Actual Testimonial Cards */}

      {!loading && !error && testimonials.length > 0 && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >

          {/* Left fade */}

          <div
            className="absolute left-0 top-0 bottom-0
              w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #0A0E1A, transparent)",
            }}
          />


          {/* Right fade */}

          <div
            className="absolute right-0 top-0 bottom-0
              w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, #0A0E1A, transparent)",
            }}
          />


          {/* Scrolling cards */}

          <div className="overflow-hidden">

            <div className="testimonials-track flex w-max">

              {doubledTestimonials.map((testimonial, index) => (

                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                />

              ))}

            </div>

          </div>

        </motion.div>

      )}


    

    </section>

  );

}