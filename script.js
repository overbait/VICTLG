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

        // PDF Export Button
        const exportBtn = document.getElementById('export-pdf-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', generatePdf);
        }
    }

    // --- PDF Generation Logic ---
    function generatePdf() {
        const btn = document.getElementById('export-pdf-btn');
        const originalText = btn.textContent;
        btn.textContent = 'GENERATING...';
        btn.disabled = true;

        const element = document.getElementById('catalog-container');

        const options = {
            margin: 0,
            filename: 'VIS-Product-Catalog-2025-TechnoDoc.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: null
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: { mode: 'css', before: '.page' },
            enableLinks: true
        };

        html2pdf().set(options).from(element).save().then(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }).catch((err) => {
            console.error("Error generating PDF:", err);
            btn.textContent = originalText;
            btn.disabled = false;
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

    // --- Initialization ---
    setupEventListeners();
    addDatasheetButtons();
    showPage(0); // Show the first page initially
});
