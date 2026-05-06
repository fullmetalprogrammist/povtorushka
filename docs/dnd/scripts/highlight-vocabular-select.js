let currentHighlight = null;

document.querySelectorAll('.vocab-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Снимаем подсветку с предыдущего
            if (currentHighlight) {
                currentHighlight.classList.remove('dialog-highlight');
            }
            
            // Подсвечиваем новый
            targetElement.classList.add('dialog-highlight');
            currentHighlight = targetElement;
            
            // Скроллим
            targetElement.scrollIntoView({ block: 'center' });
        }
    });
});