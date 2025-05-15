// File này xử lý HMR cho React một cách rõ ràng

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.jsx';

// Chỉ tạo root một lần và lưu trữ nó
let root;

export function renderApp() {
  if (!root) {
    const container = document.getElementById('root');
    root = createRoot(container);
  }

  // Render ứng dụng
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
