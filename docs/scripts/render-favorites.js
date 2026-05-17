function renderFavorites() {
    const section = document.getElementById('favorites');
    if (!section) return;
    
    const favoritesAll = JSON.parse(localStorage.getItem('favorites')) || [];
    const pageId = document.body.id;
    const favorites = favoritesAll[pageId] || [];
    
    section.querySelectorAll('.favorite-item, .favorite-empty').forEach(el => el.remove());
    
    if (favorites.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.className = 'favorite-empty';
        emptyMsg.textContent = 'В избранное еще ничего не добавлено';
        section.appendChild(emptyMsg);
        return;
    }
    
    favorites.forEach((fav, index) => {
        const div = document.createElement('div');
        div.className = 'favorite-item';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'favorite-content';
        
        const textP = document.createElement('p');
        textP.className = 'favorite-text';
        textP.textContent = fav.text;
        
        const dateSpan = document.createElement('div');
        dateSpan.className = 'favorite-date';
        dateSpan.textContent = new Date(fav.timestamp).toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
        
        contentDiv.appendChild(textP);
        contentDiv.appendChild(dateSpan);
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'favorite-remove';
        removeBtn.innerHTML = '<span class="material-icons">delete</span>';
        removeBtn.setAttribute('data-index', index);
        
        div.appendChild(contentDiv);
        div.appendChild(removeBtn);
        section.appendChild(div);
        
        // Переход к абзацу при клике на блок (не на кнопку удаления)
        contentDiv.addEventListener('click', () => {
            const targetP = document.getElementById(fav.id);
            if (targetP) {
                targetP.scrollIntoView({ block: 'center' });
                targetP.classList.add('highlight');
                setTimeout(() => targetP.classList.remove('highlight'), 3000);
            }
        });
    });
    
    section.querySelectorAll('.favorite-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            let favs = JSON.parse(localStorage.getItem('favorites')) || {};
            const pageId = document.body.id;
            if (favs[pageId]) {
                favs[pageId].splice(btn.dataset.index, 1);
                if (favs[pageId].length === 0) delete favs[pageId];
                localStorage.setItem('favorites', JSON.stringify(favs));
                renderFavorites();
            }
        });
    });
}

renderFavorites();