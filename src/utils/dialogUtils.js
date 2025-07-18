export const scrollDialogToViewport = () => {
  const dialogs = document.querySelectorAll('.react-confirm-alert-body');
  
  if (dialogs.length > 0) {
    const viewportTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportTop + (viewportHeight / 2);
    
    dialogs.forEach(dialog => {
      const dialogHeight = dialog.offsetHeight;
      const idealTop = viewportCenter - (dialogHeight / 2);
      
      dialog.style.top = `${idealTop}px`;
      dialog.style.transform = 'translateX(-50%)';
      dialog.style.left = '50%';
      dialog.style.position = 'fixed';
      dialog.style.marginTop = '0';
      dialog.style.zIndex = '10000';
    });
  }
};

export default scrollDialogToViewport;
