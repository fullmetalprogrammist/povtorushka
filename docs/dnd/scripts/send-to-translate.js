document.querySelectorAll('p.line').forEach(el => {
    // Для десктопа: удержание 1 секунда
    let timer;
    const start = (e) => {
        timer = setTimeout(() => {
            const text = encodeURIComponent(el.textContent);
            window.open(`https://translate.google.com/?sl=en&tl=ru&text=${text}&op=translate`);
        }, 1000);
    };
    const cancel = () => clearTimeout(timer);
    el.addEventListener('mousedown', start);
    el.addEventListener('mouseup', cancel);
    el.addEventListener('mouseleave', cancel);
    
    // Для мобилы: свайп вправо
    let touchStartX = 0;
    el.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    el.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchEndX - touchStartX > 50) {
            const text = encodeURIComponent(el.textContent);
            window.open(`https://translate.google.com/?sl=en&tl=ru&text=${text}&op=translate`);
        }
    });
});