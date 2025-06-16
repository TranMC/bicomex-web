import { Link } from 'react-router-dom';
import { FaHome, FaAngleRight } from 'react-icons/fa';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items, variant = 'default' }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className={`breadcrumbs-nav ${variant}`}>
      <div className="breadcrumbs-container">
        <Link to="/" className="breadcrumb-link">
          <FaHome className="breadcrumb-icon" />
          <span>Trang chủ</span>
        </Link>
        
        {items.map((item, index) => (
          <span key={index} className="breadcrumb-item">
            <FaAngleRight className="breadcrumb-separator" />
            {item.href ? (
              <Link to={item.href} className="breadcrumb-link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb-active">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
