// NavBar component for the Serenity app
/* its a Reusble UI peice that shows a  *_navigation links (Home, About, Contact) - these links will be used to navigate to different pages of the app
 *_branding (Serenity logo and name)
 *_Action buttons (Login, Sign Up)
 *_responsive design (collapses into a hamburger menu on smaller screens)
 */

// importing useState{to manage dynamic UI} from React
import { useState } from "react";

export default function Navbar() {
  // creating a functional component & making accessible to other files
  // This variable remembers if mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);
  // menuOpen = current value (false = closed)
  // setMenuOpen = function to update it

  return (
    // What your component renders on screen(JSX = HTML-like syntax in React)

    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-aurora text-lg">✦</span>
          <span className="font-display italic  text-3xl text-white ">
            Serenity
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-white/60 hover:text-aurora text-sm transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-white/60 hover:text-aurora text-sm transition-colors"
          >
            How It Works
          </a>
          <a
            href="#community"
            className="text-white/60 hover:text-aurora text-sm transition-colors"
          >
            Community
          </a>
          <a
            href="#blog"
            className="text-white/60 hover:text-aurora text-sm transition-colors"
          >
            Blog
          </a>
          <a
            href="#faq"
            className="text-white/60 hover:text-aurora text-sm transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* CTA Button */}
        <a
          href="#cta"
          className="hidden md:block btn-aurora px-5 py-2.5 rounded-full text-sm"
        >
          Start Free
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"} 

        </button>
      </div>

      {/* Mobile Menu — only shows when menuOpen is true */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 py-8 border-t border-white/5 mt-4">
          {" "}
        
          <a
            href="#features"
            onClick={() => setMenuOpen(false)}
            className="text-white/70 text-lg"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMenuOpen(false)}
            className="text-white/70 text-lg"
          >
            How It Works
          </a>
          <a
            href="#community"
            onClick={() => setMenuOpen(false)}
            className="text-white/70 text-lg"
          >
            Community
          </a>
          <a
            href="#blog"
            onClick={() => setMenuOpen(false)}
            className="text-white/70 text-lg"
          >
            Blog
          </a>
          <a
            href="#faq"
            onClick={() => setMenuOpen(false)}
            className="text-white/70 text-lg"
          >
            FAQ
          </a>
          <a href="#cta" className="btn-aurora px-8 py-3 rounded-full">
            Start Free
          </a>
        </div>
      )}
    </nav>
  );
}

/**
 * User clicks ☰
      ↓
setMenuOpen(true)
      ↓
menuOpen = true
      ↓
Mobile menu appears

User clicks ✕ or link
      ↓
setMenuOpen(false)
      ↓
Menu disappears
 * 
 */
