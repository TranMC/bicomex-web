import './index.css'
import { renderApp } from './hmr';

// Render lần đầu tiên
renderApp();

// Thiết lập HMR
if (import.meta.hot) {
  import.meta.hot.accept('./App.jsx', () => {
    renderApp();
  });

  import.meta.hot.accept('./hmr.jsx', () => {
    renderApp();
  });
}
