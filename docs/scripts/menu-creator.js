(function() {
    const scenes = document.querySelectorAll('section.scene');
    if (scenes.length === 0) return;

    const tocList = document.querySelector('.toc-list');
    if (!tocList) return;

    tocList.innerHTML = '';

    scenes.forEach((scene, index) => {
        const sceneId = `scene-${index + 1}`;
        scene.id = sceneId;

        const titleElement = scene.querySelector('h2');
        let titleText = '';

        if (titleElement) {
            titleText = titleElement.textContent;
        } else {
            const firstLine = scene.querySelector('.line, p');
            if (firstLine) {
                titleText = firstLine.textContent.substring(0, 50);
                if (firstLine.textContent.length > 50) titleText += '...';
            } else {
                titleText = `Сцена ${index + 1}`;
            }
        }

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${sceneId}`;
        link.textContent = `${index + 1}. ${titleText}`;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ block: 'start' });
                history.pushState(null, '', link.getAttribute('href'));
            }
        });

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    function scrollTocToActiveLink() {
        const activeLink = document.querySelector('.toc-list a.active');
        if (!activeLink) return;
        
        const tocContainer = document.querySelector('.table-of-contents');
        if (!tocContainer) return;
        
        const containerRect = tocContainer.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        // Проверяем, виден ли активный пункт в меню
        const isVisible = linkRect.top >= containerRect.top && linkRect.bottom <= containerRect.bottom;
        
        // Если пункт не виден, прокручиваем меню так, чтобы он оказался наверху
        if (!isVisible) {
            const scrollTo = tocContainer.scrollTop + (linkRect.top - containerRect.top) - 20;
            tocContainer.scrollTop = scrollTo;
        }
    }

    const observerOptions = { threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.toc-list a').forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(`.toc-list a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    scrollTocToActiveLink();
                }
            }
        });
    }, observerOptions);

    scenes.forEach(scene => observer.observe(scene));
})();