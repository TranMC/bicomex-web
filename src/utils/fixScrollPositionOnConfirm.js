const fixScrollPositionOnConfirm = () => {
  let scrollPosition = 0;
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const addedNodes = Array.from(mutation.addedNodes);
        const overlayAdded = addedNodes.some(node => 
          node.nodeType === 1 && node.classList && node.classList.contains('react-confirm-alert-overlay')
        );
        
        if (overlayAdded) {
          scrollPosition = window.scrollY || document.documentElement.scrollTop;
          
          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.top = `-${scrollPosition}px`;
          document.body.style.width = '100%';
        }
        
        const overlayRemoved = mutation.removedNodes && Array.from(mutation.removedNodes).some(node => 
          node.nodeType === 1 && node.classList && node.classList.contains('react-confirm-alert-overlay')
        );
        
        if (overlayRemoved) {
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          window.scrollTo(0, scrollPosition);
        }
      }
    });
  });
  
  observer.observe(document.body, { childList: true });
  
  return () => {
    observer.disconnect();
  };
};

export default fixScrollPositionOnConfirm;
