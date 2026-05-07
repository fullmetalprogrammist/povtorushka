document.querySelectorAll('p.line').forEach(p => {
    let character = p.getAttribute('data-character');
    if (!character || character === '') character = 'other';
    const img = document.createElement('img');
    img.src = `./img/chars/${character}.webp`;
    img.alt = character;
    img.className = 'character-portrait';
    img.loading = 'lazy';
    img.setAttribute('data-character', character);
    img.onerror = () => { img.src = './img/chars/missingportrait.webp'; };
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        const char = img.getAttribute('data-character');
        const section = img.closest('section');
        const selector = char === 'other' 
            ? 'p.line[data-character=""], p.line:not([data-character])'
            : `p.line[data-character="${char}"]`;
        const lines = section.querySelectorAll(selector);
        const isHidden = lines[0]?.style.opacity === '0';
        lines.forEach(line => {
            line.style.opacity = isHidden ? '1' : '0';
        });
    });
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