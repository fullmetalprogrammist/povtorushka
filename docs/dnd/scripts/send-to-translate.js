document.querySelectorAll('p.line').forEach(el => {
    let timer;
    let touchStarted = false;
    const start = (e) => {
        touchStarted = true;
        timer = setTimeout(() => {
            if (touchStarted) {
                if (e.cancelable) e.preventDefault();
                const text = encodeURIComponent(el.textContent);
                window.open(`https://translate.google.com/?sl=en&tl=ru&text=${text}&op=translate`);
            }
        }, 1000);
    };
    const cancel = () => {
        touchStarted = false;
        clearTimeout(timer);
    };
    el.addEventListener('mousedown', start);
    el.addEventListener('mouseup', cancel);
    el.addEventListener('mouseleave', cancel);
    el.addEventListener('touchstart', start, {passive: true});
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchcancel', cancel);
});