// tailwind.config.js is the configuration file where you customize Tailwind CSS.
// it tells Tailwind what files to scan and what custom styles to use. 🎨
// "Hey Tailwind, scan THESE files and use THESE custom styles."

/** @type {import('tailwindcss').Config} */                     // this Gives type information to editors like VS Code

export default {                                        // Exports the configuration object
  content: ['./index.html', './src/**/*.{js,jsx}'],     // VVIMP Line : Tells Tailwind to scan these files(main HTML and All js and jsx files) for class names
  // Controls design system (colors, fonts, spacing)
  theme: {
    extend: {
      colors: {                        // Define your custom colors here
        midnight: '#0A0E1A',
        aurora: '#4ECDC4',
        gold: '#F7C948',
      },
      fontFamily: {                  // Define your custom fonts here
        display: ['"Cormorant Garamond"', 'poppins', 'serif'],           // here first font is the primary(prefered) and second one is the fallback font
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


// so helps to write classes like "bg-midnight" instead of "background-color: #0A0E1A;" in your HTML/JSX files.