import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Tạo root container
const root = createRoot(document.getElementById('root'))

// Render app
root.render(<App />)
