/* App.jsx : Its Main react component - the root UI component
           :  the entry point of the app where we render the main UI.
           : Here we can set up global state, routing, and render the main layout.

Flow : index.html -> main.jsx -> App.jsx => UI appears on the screen
Note: React components must return JSX
JSX : JavaScript XML = HTML inside JavaScript
*/
import Navbar from "./components/Navbar"; // importing the Navbar component to use in our main App component
import Hero from "./components/Hero";
import MoodSelector from "./components/MoodSelector";
import HowItWorks from "./components/HowItWorks";
import Programs from './components/Programs'
import BreathingWidget from './components/BreathingWidget'
import Leaderboard from './components/Leaderboard'
import Notifications from './components/Notifications'
import Testimonials from './components/Testimonials'
import Blog from './components/Blog'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'

export default function App() {
  //creates and exports(makes available to other files) the main App component
  return (
    <div className="min-h-screen bg-midnight">
      <Navbar />         {/*renders the Navbar component at the top of the page */}
      <main>
        <Hero />         {/*renders the Hero component in the main content area middle */}
        <MoodSelector />   {/*renders the MoodSelector component below the Hero component */}
        <HowItWorks />  {/*renders the HowItWorks component below the MoodSelector component */}
        <Programs />    {/*renders the Programs component below the HowItWorks component */}
       <BreathingWidget /> {/*renders the BreathingWidget component below the Programs component */}
        <Leaderboard />   {/*renders the Leaderboard component at the bottom of the main content area */} 
        <Notifications /> {/*renders the Notifications component at the bottom of the main content area */}
        <Testimonials />  {/*renders the Testimonials component at the bottom of the main content area */}
        <Blog />          {/*renders the Blog component at the bottom of the main content area */}
        <FAQ />           {/*renders the FAQ component at the bottom of the main content area */}
        <CTABanner />     {/*renders the CTA Banner component at the bottom of the main content area */}
       
      </main>
      <Footer />        
    </div>
  );
}
