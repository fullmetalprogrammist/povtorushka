const menuBtn = document.querySelector('.chapters-menu');
const toc = document.querySelector('.table-of-contents');
const tocLinks = document.querySelectorAll('.toc-list a');

if (menuBtn && toc) {
    menuBtn.addEventListener('click', () => {
        toc.classList.toggle('mobile-visible');
    });
    
    tocLinks.forEach(link => {
        link.addEventListener('click', () => {
            toc.classList.remove('mobile-visible');
        });
    });
}