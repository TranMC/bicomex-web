import { useContext } from 'react';
import { NewsletterContext } from '../context/NewsletterContext';

/**
 * Hook để sử dụng chức năng đăng ký nhận bản tin
 * @returns {Object} Các phương thức và state để làm việc với newsletter
 */
const useNewsletter = () => {
  const context = useContext(NewsletterContext);
  
  if (!context) {
    throw new Error('useNewsletter phải được sử dụng trong NewsletterProvider');
  }
  
  return context;
};

export default useNewsletter;
