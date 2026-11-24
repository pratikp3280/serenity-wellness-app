import { useEffect, useState } from "react";

import {
  Star,
  Send,
  MessageSquareQuote,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../services/api";

const OCCUPATION_OPTIONS = [
  "Student",
  "Software Developer",
  "Teacher",
  "Healthcare Professional",
  "Designer",
  "Entrepreneur",
  "Parent / Caregiver",
  "Other",
];

export default function ReviewForm() {

  const { user } = useAuth();

  // Existing review belonging to the logged-in user.
  const [myReview, setMyReview] = useState(null);

  // Form fields.
  const [rating, setRating] = useState(0);
  const [occupation, setOccupation] = useState("");
  const [otherOccupation, setOtherOccupation] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);

  // UI states.
  const [loadingReview, setLoadingReview] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  // --------------------------------------------------
  // 1. Load the logged-in user's existing review.
  // --------------------------------------------------

  useEffect(() => {

    let isMounted = true;

    const loadMyReview = async () => {

      try {

        const review = await apiRequest("/api/testimonials/me");

        if (!isMounted) return;

        // apiRequest returns null when the backend responds with 204.
        if (review) {

          setMyReview(review);

          setRating(review.rating);
          setComment(review.comment || "");

          // Check whether the occupation is a predefined option.
          if (OCCUPATION_OPTIONS.includes(review.occupation)) {

            setOccupation(review.occupation);

          } else {

            // Existing custom occupation.
            setOccupation("Other");
            setOtherOccupation(review.occupation || "");

          }

          // The user previously submitted this review.
          setConsent(true);
        }

      } catch (err) {

        if (isMounted) {
          setError(err.message || "Unable to load your review.");
        }

      } finally {

        if (isMounted) {
          setLoadingReview(false);
        }

      }
    };

    loadMyReview();

    return () => {
      isMounted = false;
    };

  }, []);


  // --------------------------------------------------
  // 2. Handle review submission and updates.
  // --------------------------------------------------

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setSuccessMessage("");

    // Validate star rating.
    if (rating < 1 || rating > 5) {

      setError("Please select a star rating.");

      return;
    }

    // Resolve predefined or custom occupation.
    const finalOccupation =
      occupation === "Other"
        ? otherOccupation.trim()
        : occupation.trim();

    if (!finalOccupation) {

      setError("Please enter your occupation.");

      return;
    }

    // Validate feedback.
    if (!comment.trim()) {

      setError("Please write your feedback.");

      return;
    }

    // Confirm public display consent.
    if (!consent) {

      setError("Please confirm that your review may be displayed publicly after approval.");

      return;
    }

    const isUpdate = Boolean(myReview);

    setSubmitting(true);

    try {

      // Request body matches TestimonialRequest.java.
      const requestData = {
        rating,
        occupation: finalOccupation,
        comment: comment.trim(),
      };

      // POST creates a new review or updates the existing one.
      const savedReview = await apiRequest(
        "/api/testimonials",
        {
          method: "POST",
          body: requestData,
        }
      );

      setMyReview(savedReview);

      // Show appropriate feedback.
      setSuccessMessage(
        isUpdate
          ? "Your review has been updated and sent for approval."
          : "Thank you! Your review has been submitted for approval."
      );

    } catch (err) {

      setError(err.message || "Unable to submit your review. Please try again.");

    } finally {

      setSubmitting(false);

    }

  };


  // --------------------------------------------------
  // 3. Loading state.
  // --------------------------------------------------

  if (loadingReview) {

    return (
      <section className="rounded-3xl border border-white/10
        bg-white/[0.03] p-7"
      >
        <p className="text-gray-400 text-sm">
          Loading your review...
        </p>
      </section>
    );
  }


  // --------------------------------------------------
  // 4. Review form UI.
  // --------------------------------------------------

  return (

    <section className="rounded-3xl border border-[#4ECDC4]/20
      bg-gradient-to-br from-[#142A32]/70 to-[#111426]
      p-6 sm:p-8 space-y-6"
    >

      {/* Heading */}

      <div className="flex items-start gap-4">

        <div className="w-12 h-12 rounded-xl
          bg-[#4ECDC4]/10 flex items-center justify-center
          flex-shrink-0"
        >
          <MessageSquareQuote
            size={23}
            className="text-[#4ECDC4]"
          />
        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.2em]
            text-[#4ECDC4]"
          >
            Your voice matters
          </p>

          <h2 className="font-display text-3xl text-white mt-1">
            Share Your Experience
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Your experience may help someone else begin their
            wellness journey.
          </p>

        </div>

      </div>


      {/* User Information */}

      <div className="rounded-2xl border border-white/10
        bg-white/[0.03] p-4"
      >

        <p className="text-xs text-gray-500 mb-2">
          Reviewing as
        </p>

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full
            bg-[#4ECDC4]/15 border border-[#4ECDC4]/20
            flex items-center justify-center
            text-[#4ECDC4] font-semibold"
          >
            {(user?.fullName || "S").trim().charAt(0).toUpperCase()}
          </div>

          <div>

            <p className="text-white font-medium">
              {user?.fullName || "Serenity Member"}
            </p>

            <p className="text-xs text-gray-500">
              Your registered account
            </p>

          </div>

        </div>

      </div>


      {/* Review Form */}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Star Rating */}

        <div>

          <label className="block text-sm font-medium
            text-white mb-3"
          >
            How would you rate your Serenity experience?
          </label>

          <div className="flex items-center gap-2">

            {[1, 2, 3, 4, 5].map((value) => (

              <button
                key={value}
                type="button"
                aria-label={`Rate ${value} out of 5 stars`}
                aria-pressed={rating === value}
                onClick={() => setRating(value)}
                className="transition-transform hover:scale-110
                  focus:outline-none focus:ring-2
                  focus:ring-[#4ECDC4] rounded-md"
              >

                <Star
                  size={32}
                  strokeWidth={1.5}
                  className={
                    value <= rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-600"
                  }
                />

              </button>

            ))}

            {rating > 0 && (

              <span className="text-sm text-gray-400 ml-2">
                {rating} / 5
              </span>

            )}

          </div>

        </div>


        {/* Occupation */}

        <div>

          <label
            htmlFor="review-occupation"
            className="block text-sm font-medium
              text-white mb-2"
          >
            Your occupation
          </label>

          <select
            id="review-occupation"
            value={occupation}
            onChange={(event) => setOccupation(event.target.value)}
            required
            className="w-full rounded-xl
              bg-[#0A0E1A] border border-white/10
              px-4 py-3 text-sm text-white
              focus:outline-none focus:border-[#4ECDC4]"
          >

            <option value="">
              Select your occupation
            </option>

            {OCCUPATION_OPTIONS.map((item) => (

              <option key={item} value={item}>
                {item}
              </option>

            ))}

          </select>


          {/* Custom occupation */}

          {occupation === "Other" && (

            <input
              type="text"
              value={otherOccupation}
              onChange={(event) =>
                setOtherOccupation(event.target.value)
              }
              placeholder="Enter your occupation"
              maxLength={100}
              required
              className="w-full mt-3 rounded-xl
                bg-[#0A0E1A] border border-white/10
                px-4 py-3 text-sm text-white
                placeholder:text-gray-600
                focus:outline-none focus:border-[#4ECDC4]"
            />

          )}

        </div>


        {/* Feedback */}

        <div>

          <label
            htmlFor="review-comment"
            className="block text-sm font-medium
              text-white mb-2"
          >
            Share your experience
          </label>

          <textarea
            id="review-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Tell us how Serenity has been part of your wellness journey..."
            rows={5}
            maxLength={1000}
            required
            className="w-full rounded-xl resize-y
              bg-[#0A0E1A] border border-white/10
              px-4 py-3 text-sm text-white
              placeholder:text-gray-600
              focus:outline-none focus:border-[#4ECDC4]"
          />

          <p className="text-xs text-gray-500 text-right mt-2">
            {comment.length} / 1000 characters
          </p>

        </div>


        {/* Public display consent */}

        <label className="flex items-start gap-3
          cursor-pointer"
        >

          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 accent-[#4ECDC4]"
          />

          <span className="text-xs text-gray-400 leading-relaxed">
            I understand that my name, occupation, rating and
            feedback may appear publicly on Serenity after my
            review is approved.
          </span>

        </label>


        {/* Error */}

        {error && (

          <div className="flex items-start gap-2
            rounded-xl border border-red-400/20
            bg-red-400/10 p-3 text-sm text-red-300"
          >

            <AlertCircle size={17} className="flex-shrink-0 mt-0.5" />

            <p>{error}</p>

          </div>

        )}


        {/* Success */}

        {successMessage && (

          <div className="flex items-start gap-2
            rounded-xl border border-[#4ECDC4]/20
            bg-[#4ECDC4]/10 p-3 text-sm text-[#8DE5DF]"
          >

            <CheckCircle2
              size={17}
              className="flex-shrink-0 mt-0.5"
            />

            <p>{successMessage}</p>

          </div>

        )}


        {/* Existing Review Status */}

        {myReview && (

          <div className="flex items-center gap-2
            text-sm text-gray-400"
          >

            <Clock3
              size={16}
              className={
                myReview.status === "APPROVED"
                  ? "text-green-400"
                  : "text-amber-400"
              }
            />

            Review status:

            <span className="font-medium text-white">
              {myReview.status}
            </span>

          </div>

        )}


        {/* Submit Button */}

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto
            inline-flex items-center justify-center gap-2
            rounded-xl bg-[#4ECDC4]
            px-6 py-3 text-sm font-semibold
            text-[#0A0E1A]
            hover:bg-[#68ddd5]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors"
        >

          <Send size={16} />

          {submitting
            ? "Submitting..."
            : myReview
              ? "Update Your Review"
              : "Submit Your Review"
          }

        </button>

      </form>

    </section>
  );
}