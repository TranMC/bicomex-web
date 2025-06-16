import { Link } from 'react-router-dom';
import { FaHome, FaAngleRight } from 'react-icons/fa';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumbs-nav">
      <ol className="breadcrumbs-list">
        <li>
          <Link to="/" className="breadcrumb-link">
            <FaHome className="breadcrumb-icon" />
            <span>Trang chủ</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="breadcrumbs-item">
            <FaAngleRight className="breadcrumb-separator" />
            {item.href && idx !== items.length - 1 ? (
              <Link to={item.href} className="breadcrumb-link">{item.label}</Link>
            ) : (
              <span className="breadcrumb-active">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
