let currentOpenContainer = null;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            const p = entry.target;
            const buttonContainer = p.querySelector('.line-buttons');
            if (buttonContainer && buttonContainer.style.display === 'flex') {
                buttonContainer.style.display = 'none';
                p.classList.remove('active');
                if (currentOpenContainer === buttonContainer) currentOpenContainer = null;
            }
        }
    });
}, { threshold: 0 });

document.querySelectorAll('p.line').forEach(initLine);

function initLine(p) {
  observer.observe(p);
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'line-buttons';
    buttonContainer.innerHTML = `
        <button class="btn-copy"><span class="material-icons">content_copy</span></button>
        <button class="btn-translate"><span class="material-icons">translate</span></button>
        <button class="btn-favorites"><span class="material-icons">bookmark</span></button>
        <button class="btn-close"><span class="material-icons">close</span></button>
    `;
    p.appendChild(buttonContainer);
    
    const showButtons = () => {
        if (currentOpenContainer && currentOpenContainer !== buttonContainer) {
            currentOpenContainer.style.display = 'none';
            if (currentOpenContainer.parentElement) {
                currentOpenContainer.parentElement.classList.remove('active');
            }
        }
        buttonContainer.style.display = 'flex';
        p.classList.add('active');
        currentOpenContainer = buttonContainer;
    };

    const hideLineButtons = () => {
        buttonContainer.style.display = 'none';
        p.classList.remove('active');
        if (currentOpenContainer === buttonContainer) currentOpenContainer = null;
    };

    const handleLineText = (actionFn) => {
        let text = p.cloneNode(true);
        text.querySelectorAll('.line-buttons').forEach(el => el.remove());
        let finalText = text.textContent.trim();
        const selection = window.getSelection();
        if (selection.toString().trim() && p.contains(selection.anchorNode)) {
            finalText = selection.toString();
        }
        hideLineButtons();
        actionFn(finalText);
    };
    
    // Копирование в буфер
    p.querySelector('.btn-copy').addEventListener('click', (e) => {
        e.stopPropagation();
        handleLineText((text) => navigator.clipboard.writeText(text));
    });
    
    // Отправка в переводчик
    p.querySelector('.btn-translate').addEventListener('click', (e) => {
        e.stopPropagation();
        handleLineText((text) => window.open(`https://translate.google.com/?sl=en&tl=ru&text=${encodeURIComponent(text)}&op=translate`));
    });
    
    // Добавление в избранное
    p.querySelector('.btn-favorites').addEventListener('click', (e) => {
        e.stopPropagation();
        handleLineText((text) => {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || {};
            const pageId = document.body.id;
            const id = p.id;
            
            if (!favorites[pageId]) {
                favorites[pageId] = [];
            }
            
            const exists = favorites[pageId].some(fav => fav.id === id);
            if (!exists) {
                favorites[pageId].unshift({
                    id: id,
                    text: text,
                    timestamp: Date.now(),
                });
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderFavorites();
            }
        });
    });

    // Закрытие меню
    p.querySelector('.btn-close').addEventListener('click', (e) => {
        e.stopPropagation();
        hideLineButtons();
    });
    

    // Чтобы на мобилах не появлялось дефолтное меню "Копировать, Выбрать все" и т.д.
    p.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
        showButtons();
    });
    
    p.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showButtons();
    });
}