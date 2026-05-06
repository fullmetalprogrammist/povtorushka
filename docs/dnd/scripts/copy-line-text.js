document.addEventListener('DOMContentLoaded', function() {
    const lines = document.querySelectorAll('.line');
    
    lines.forEach(line => {
        line.addEventListener('click', async function(e) {
            const text = this.textContent;
            
            try {
                await navigator.clipboard.writeText(text);
            } catch (err) {
              
            }
        });
    });
});