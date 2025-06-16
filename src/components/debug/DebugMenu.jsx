import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBug, FaAngleDown, FaBell, FaCheck, FaExclamation } from 'react-icons/fa';

const DebugMenu = ({ position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Xác định class vị trí
  const positionClass = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  }[position] || 'bottom-4 right-4';

  return (
    <div className="debug-menu fixed z-50">
      {/* Debug menu button */}
      <button 
        className={`w-12 h-12 rounded-full flex items-center justify-center bg-purple-700 text-white shadow-lg hover:bg-purple-800 transition-all duration-200 ${positionClass}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Debug Menu"
        aria-label="Debug Menu"
      >
        {isOpen ? <FaAngleDown /> : <FaBug />}
      </button>
      
      {/* Debug menu popup */}
      {isOpen && (
        <div className="debug-menu-popup absolute bottom-16 right-4 w-72 bg-white rounded-lg shadow-xl p-3 border border-purple-200">
          <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b">Debug Menu</h3>
          
          <ul className="space-y-1">
            <li>
              <Link 
                to="/debug/confirm-dialog" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-100 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaExclamation className="text-purple-600" />
                <span>Confirm Dialog Demo</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/demo/toast" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-100 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaBell className="text-purple-600" />
                <span>Toast Notifications</span>
              </Link>
            </li>
          </ul>
          
          <div className="mt-3 pt-2 border-t text-xs text-gray-500">
            <p>Developer mode enabled</p>
            <p>Version: {import.meta.env.VITE_APP_VERSION || '1.0.0'}</p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .debug-menu-popup {
          animation: slideUp 0.2s ease-out forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DebugMenu;
