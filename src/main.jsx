import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))

// Lazy load app for faster initial paint
root.render(<App />)
