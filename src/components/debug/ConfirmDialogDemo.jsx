import { useState, useContext } from 'react';
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaExclamationCircle, FaPalette } from 'react-icons/fa';
import { ConfirmContext } from '../../context/ConfirmContextInstance';
import '../../styles/components/confirmDemo.css';

const ConfirmDialogDemo = () => {
  const { confirm, alert } = useContext(ConfirmContext);
  const [result, setResult] = useState(null);
  
  const showConfirmDialog = async (type = 'info') => {
    const confirmed = await confirm({
      title: `Xác nhận ${type === 'info' ? 'thông tin' : type === 'warning' ? 'cảnh báo' : type === 'error' ? 'lỗi' : 'thành công'}`,
      message: 'Đây là demo cho dialog xác nhận. Bạn có muốn tiếp tục không?',
      type,
      confirmText: 'Tiếp tục',
      cancelText: 'Hủy bỏ'
    });
    
    setResult(confirmed ? 'Bạn đã chọn "Tiếp tục"' : 'Bạn đã chọn "Hủy bỏ"');
  };
  
  const showAlertDialog = async (type = 'info') => {
    await alert({
      title: `Thông báo ${type === 'info' ? 'thông tin' : type === 'warning' ? 'cảnh báo' : type === 'error' ? 'lỗi' : 'thành công'}`,
      message: 'Đây là demo cho dialog thông báo. Dialog này chỉ có một nút đóng.',
      type,
      confirmText: 'Đã hiểu'
    });
    
    setResult('Bạn đã đóng dialog thông báo');
  };
  
  return (
    <div className="confirm-demo">
      <h2>Demo Confirm Dialog</h2>
      <p>Kiểm tra các loại dialog khác nhau:</p>
      
      <div className="button-group">
        <h3>Dialog xác nhận (Confirm)</h3>
        <div className="buttons">
          <button onClick={() => showConfirmDialog('info')} className="info">
            <FaInfoCircle /> Thông tin
          </button>
          <button onClick={() => showConfirmDialog('warning')} className="warning">
            <FaExclamationTriangle /> Cảnh báo
          </button>
          <button onClick={() => showConfirmDialog('error')} className="error">
            <FaExclamationCircle /> Lỗi
          </button>
          <button onClick={() => showConfirmDialog('success')} className="success">
            <FaCheckCircle /> Thành công
          </button>
        </div>
      </div>
      
      <div className="button-group">
        <h3>Dialog thông báo (Alert)</h3>
        <div className="buttons">
          <button onClick={() => showAlertDialog('info')} className="info">
            <FaInfoCircle /> Thông tin
          </button>
          <button onClick={() => showAlertDialog('warning')} className="warning">
            <FaExclamationTriangle /> Cảnh báo
          </button>
          <button onClick={() => showAlertDialog('error')} className="error">
            <FaExclamationCircle /> Lỗi
          </button>
          <button onClick={() => showAlertDialog('success')} className="success">
            <FaCheckCircle /> Thành công
          </button>
        </div>
      </div>
      
      <div className="button-group">
        <h3>Dialog với nội dung dài</h3>
        <div className="buttons">
          <button 
            onClick={() => alert({
              title: 'Nội dung dài',
              message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere.',
              type: 'info'
            })}
            className="info"
          >
            <FaPalette /> Dialog với nội dung dài
          </button>
        </div>
      </div>
      
      {result && (
        <div className="result">
          <p><strong>Kết quả:</strong> {result}</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmDialogDemo;
