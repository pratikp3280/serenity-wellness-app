/* main.jsx - Entry point of the React application. 
            - It renders the App component into the root DOM node.
            - It also imports global styles and sets up any necessary providers (like Context or Redux) if needed.
            - bridge between React and the actual DOM, telling React where to display the UI.
            - It’s the first file that runs when the app starts, and it kickstarts the whole React rendering process.
            - takes app component and injects it into the index.html iside <div id="root"></div>, making the UI appear on the screen.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

  </StrictMode>,
)
