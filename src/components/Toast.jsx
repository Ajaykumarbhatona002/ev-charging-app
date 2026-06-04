import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 4000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const colors = {
    success: { bg: '#d4edda', text: '#155724' },
    error: { bg: '#f8d7da', text: '#721c24' },
    info: { bg: '#d1ecf1', text: '#0c5460' }
  };

  const color = colors[type] || colors.success;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: color.bg,
      color: color.text,
      padding: '16px 24px',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      zIndex: 10000,
      fontWeight: '500',
      maxWidth: '400px',
      animation: 'slideInRight 0.3s ease-out'
    }}>
      {message}
    </div>
  );
};

export default Toast;

