document.querySelectorAll('p.line').forEach(el => {
    let timer;
    const start = (e) => {
        if (e.cancelable) e.preventDefault();
        timer = setTimeout(() => {
            const text = encodeURIComponent(el.textContent);
            window.open(`https://translate.google.com/?sl=en&tl=ru&text=${text}&op=translate`);
        }, 1000);
    };
    const cancel = () => clearTimeout(timer);
    el.addEventListener('mousedown', start);
    el.addEventListener('mouseup', cancel);
    el.addEventListener('mouseleave', cancel);
    el.addEventListener('touchstart', start, {passive: false});
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchcancel', cancel);
});