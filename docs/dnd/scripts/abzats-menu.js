let currentOpenContainer = null;

document.querySelectorAll('p.line').forEach(p => {
    p.style.position = 'relative';
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'line-buttons';
    buttonContainer.innerHTML = `
        <button class="btn-copy"><span class="material-icons">content_copy</span></button>
        <button class="btn-translate"><span class="material-icons">translate</span></button>
    `;
    p.appendChild(buttonContainer);
    
    let hideTimeout;
    
    const showButtons = () => {
        if (currentOpenContainer && currentOpenContainer !== buttonContainer) {
            currentOpenContainer.style.display = 'none';
        }
        clearTimeout(hideTimeout);
        buttonContainer.style.display = 'flex';
        currentOpenContainer = buttonContainer;
    };
    
    const hideButtons = () => {
        hideTimeout = setTimeout(() => {
            buttonContainer.style.display = 'none';
            if (currentOpenContainer === buttonContainer) currentOpenContainer = null;
        }, 3000);
    };
    
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };
    
    const handleAction = (actionFn) => {
        let text = p.cloneNode(true);
        text.querySelectorAll('.line-buttons').forEach(el => el.remove());
        let finalText = text.textContent.trim();
        const selection = window.getSelection();
        if (selection.toString().trim() && p.contains(selection.anchorNode)) {
            finalText = selection.toString();
        }
        actionFn(finalText);
    };

    // Копирование в буфер
    p.querySelector('.btn-copy').addEventListener('click', (e) => {
        e.stopPropagation();
        handleAction((text) => navigator.clipboard.writeText(text));
    });

    // Отправка в переводчик
    p.querySelector('.btn-translate').addEventListener('click', (e) => {
        e.stopPropagation();
        handleAction((text) => window.open(`https://translate.google.com/?sl=en&tl=ru&text=${encodeURIComponent(text)}&op=translate`));
    });
    
    p.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
        showButtons();
        hideButtons();
    });
    
    buttonContainer.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
    });
    
    buttonContainer.addEventListener('mouseleave', () => {
        hideButtons();
    });
});