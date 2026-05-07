document.querySelectorAll('p.line').forEach(p => {
    let character = p.getAttribute('data-character');
    if (!character || character === '') character = 'other';
    const img = document.createElement('img');
    img.src = `./img/chars/${character}.webp`;
    img.alt = character;
    img.className = 'character-portrait';
    img.loading = 'lazy';
    const imgDiv = document.createElement('div');
    imgDiv.className = 'portrait-slot';
    imgDiv.appendChild(img);
    const wrapper = document.createElement('div');
    wrapper.className = 'line-wrapper';
    p.classList.add('bubble');
    p.parentNode.insertBefore(wrapper, p);
    wrapper.appendChild(imgDiv);
    wrapper.appendChild(p);
});