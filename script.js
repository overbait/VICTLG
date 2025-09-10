document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const totalPages = pages.length;
    let currentPageIndex = 0;

    // --- Core Navigation Function ---
    function showPage(index) {
        // Clamp the index to be within bounds
        const newIndex = Math.max(0, Math.min(index, totalPages - 1));

        pages.forEach((page, i) => {
            page.classList.toggle('active', i === newIndex);
        });
        currentPageIndex = newIndex;
    }

    // --- Event Listener Setup ---
    function setupEventListeners() {
        // Previous and Next buttons
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
        const tocLinks = document.querySelectorAll('#toc-list a');
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetPage = document.querySelector(targetId);
                const targetIndex = Array.from(pages).indexOf(targetPage);
                if (targetIndex !== -1) {
                    showPage(targetIndex);
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
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Generating...';
        btn.disabled = true;

        // Use a container that holds all pages for export
        const element = document.getElementById('catalog-container');

        const options = {
            margin: 0,
            filename: 'VIS-Product-Catalog-2025-A4.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2, // A higher scale can improve quality
                useCORS: true,
                logging: false
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            // Important: This tells html2pdf to process each top-level child of the element as a new page
            pagebreak: { mode: 'css', before: '.page' },
            enableLinks: true
        };

        // We don't need to manually show/hide pages; html2pdf's pagebreak mode handles it.
        html2pdf().set(options).from(element).save().then(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }).catch((err) => {
            console.error("Error generating PDF:", err);
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    }


    // --- Initialization ---
    setupEventListeners();
    showPage(0); // Show the first page initially
});
