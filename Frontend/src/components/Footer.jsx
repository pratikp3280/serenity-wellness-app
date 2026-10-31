// Footer.jsx : A Footer is a UI component that represents the last section of a webpage,
//  containing important links, company info, support, and legal details

/* Footer
│
├── Logo + Description + Socials
├── Links Sections (4 columns)
│     ├── Product
│     ├── Company
│     ├── Support
│     └── Legal
│
└── Bottom Bar (copyright + status)
*/
import { motion } from "framer-motion";

//Array of links(Objects) to display in the footer, categorized into Product, Company, Support, and Legal sections
const links = {
  Product: ["Features", "How It Works", "Programs", "Community", "Pricing"],
  Company: ["About Us", "Blog", "Careers", "Press", "Partners"],
  Support: ["Help Center", "Contact Us", "Status", "Feedback", "Accessibility"],
  Legal: [
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Licenses",
    "GDPR",
  ],
};

// Social media icons - SVG{Scalable Vector Graphics} components for Instagram, Twitter, YouTube, and LinkedIn used in the footer's social section
function TwitterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.058-1.865-3.058-1.865 0-2.151 1.455-2.151 2.959v5.703h-3v-10h2.881v1.367h.041c.401-.76 1.381-1.561 2.844-1.561 3.041 0 3.604 2.001 3.604 4.604v5.59z" />
    </svg>
  )
}

// Animation variants for Framer Motion
// - Defines how elements will animate when they come into view
const socials = [
  {
    Icon: InstagramIcon,
    label: "Instagram",
    url: "https://www.instagram.com/serenityapp/",
  },
  {
    Icon: TwitterIcon,
    label: "X / Twitter",
    url: "https://twitter.com/serenityapp",
  },
  {
    Icon: YoutubeIcon,
    label: "YouTube",
    url: "https://www.youtube.com/serenityapp",
  },
  {
    Icon: LinkedInIcon,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/pratik-p-patil-1485aa1bb/",
  },
];

// Footer component - The main export of this file, representing the footer section of the webpage,
export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aurora/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4 w-fit">
              <span className="text-aurora text-xl">✦</span>
             <span className="font-display text-6xl font-bold text-yellow tracking-wide">
  serenity
</span>
            </a>

            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
              Find your calm, one breath at a time. Science-backed mindfulness
              built for modern life.
            </p>

            <div className="flex items-center gap-3">
              {socials.map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 glass-card rounded-full flex items-center justify-center text-white/30 hover:text-aurora transition-all duration-200 border border-white/8 hover:border-aurora/30"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Rendering: Links by Category  */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
             <h4
  className={
    'text-xs font-semibold tracking-widest uppercase mb-5 ' +
    (category === 'Product'
      ? 'text-aurora'
      : category === 'Company'
      ? 'text-indigo-400'
      : category === 'Support'
      ? 'text-yellow-400'
      : 'text-pink-400')
  }
>
  {category}
</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/45 text-sm hover:text-aurora transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          {/* 👉 Auto updates year  */}
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Serenity Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-aurora animate-pulse" />
              <span className="text-white/20 text-xs">
                All systems operational
              </span>
            </div>

            <span className="text-white/10 text-xs hidden sm:block">·</span>

            <div className="hidden sm:flex items-center gap-1">
              <span className="text-white/20 text-xs">Made with</span>
              <span className="text-aurora/60 text-xs">♥</span>
              <span className="text-white/20 text-xs">By <span><a href="https://www.linkedin.com/in/pratik-p-patil-1485aa1bb/" className="text-aurora/60 hover:text-aurora transition-colors duration-200">Pratik</a></span> for your mind</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
