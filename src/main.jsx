import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { OldCarsProvider } from './context/OldCarsContext.jsx'

createRoot(document.getElementById('root')).render(
  <OldCarsProvider>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </OldCarsProvider>
)
