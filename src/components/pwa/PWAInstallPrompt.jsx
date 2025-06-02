import React, { useState, useEffect } from 'react';

/**
 * Component hiển thị prompt để cài đặt PWA
 * Chỉ hiển thị khi browser hỗ trợ PWA installation
 */
const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (event) => {
      console.log('PWA: beforeinstallprompt event fired');
      
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      
      // Save the event so it can be triggered later
      setDeferredPrompt(event);
      
      // Show install prompt after a delay (not immediately)
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 5000); // Show after 5 seconds
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('PWA: App was installed');
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`PWA: User response to the install prompt: ${outcome}`);
    
    if (outcome === 'accepted') {
      console.log('PWA: User accepted the install prompt');
    } else {
      console.log('PWA: User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  // Don't show if dismissed in this session
  if (sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  // Don't show if no install prompt available
  if (!showInstallPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '400px',
      margin: '0 auto',
      animation: 'slideUp 0.3s ease-out'
    }}>
      <div style={{ flex: 1, marginRight: '16px' }}>
        <div style={{ 
          fontWeight: 'bold', 
          fontSize: '16px',
          marginBottom: '4px' 
        }}>
          📱 Cài đặt ứng dụng Bicomex
        </div>
        <div style={{ 
          fontSize: '14px',
          opacity: 0.9,
          lineHeight: 1.4
        }}>
          Thêm vào màn hình chính để truy cập nhanh và sử dụng offline
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleInstallClick}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={e => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseOut={e => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          Cài đặt
        </button>
        
        <button
          onClick={handleDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            padding: '8px',
            borderRadius: '6px',
            fontSize: '18px',
            cursor: 'pointer',
            opacity: 0.7,
            transition: 'opacity 0.2s ease',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={e => {
            e.target.style.opacity = '1';
          }}
          onMouseOut={e => {
            e.target.style.opacity = '0.7';
          }}
        >
          ✕
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `
      }} />
    </div>
  );
};

export default PWAInstallPrompt;
