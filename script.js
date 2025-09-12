document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const totalPages = pages.length;
    let currentPageIndex = 0;

    // --- Core Navigation Function ---
    function showPage(index) {
        const newIndex = Math.max(0, Math.min(index, totalPages - 1));

        pages.forEach((page, i) => {
            page.classList.toggle('active', i === newIndex);
        });
        currentPageIndex = newIndex;
    }

    // --- Event Listener Setup ---
    function setupEventListeners() {
        // Previous and Next buttons on each page
        pages.forEach((page, index) => {
            const prevBtn = page.querySelector('.prev-btn');
            const nextBtn = page.querySelector('.next-btn');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => showPage(index - 1));
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => showPage(index + 1));
            }
        });

        // Table of Contents links
        const tocLinks = document.querySelectorAll('.toc-nav a');
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetPage = document.querySelector(targetId);
                if (targetPage) {
                    const targetIndex = Array.from(pages).indexOf(targetPage);
                    if (targetIndex !== -1) {
                        showPage(targetIndex);
                    }
                }
            });
        });

    }

    // --- Add Datasheet Buttons ---
    function addDatasheetButtons() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const datasheetButton = document.createElement('div');
            datasheetButton.classList.add('product-datasheet');
            datasheetButton.innerHTML = `
                <span>DATASHEET</span>
                <img src="media/linkpic.png" alt="link icon">
            `;
            card.appendChild(datasheetButton);
        });
    }

    // --- Dynamic Footer Height for Cover Page Styling ---
    /* function setCoverFooterHeight() {
        const coverFooter = document.querySelector('#cover .cover-footer');
        if (coverFooter) {
            const footerHeight = coverFooter.offsetHeight;
            document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
        }
    } */

    // --- Initialization ---
    setupEventListeners();
    addDatasheetButtons();
    //setCoverFooterHeight(); // Set initial height
    showPage(0); // Show the first page initially

    // Recalculate after all resources (like fonts) are loaded and on resize
    //window.addEventListener('load', setCoverFooterHeight);
    //window.addEventListener('resize', setCoverFooterHeight);
});
