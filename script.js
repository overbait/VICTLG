document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const totalPages = pages.length;
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    const paginationContainer = document.getElementById('pagination-container');
    const currentPageNumEl = document.getElementById('current-page-num');
    const totalPageNumEl = document.getElementById('total-page-num');
    const navLinks = document.querySelectorAll('#nav-links .nav-link');

    let currentPage = 0;

    // --- Page Navigation Logic ---

    function getPageId(index) {
        return pages[index] ? pages[index].id : null;
    }

    function updateNavLinks(activeIndex) {
        const activeId = getPageId(activeIndex);
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            page.classList.remove('active');
            if (index === pageIndex) {
                page.classList.add('active');
            }
        });

        // Update pagination dots
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === pageIndex);
        });

        // Update page counter
        currentPageNumEl.textContent = String(pageIndex + 1).padStart(2, '0');

        // Update nav links
        updateNavLinks(pageIndex);

        // Update button states
        prevBtn.disabled = pageIndex === 0;
        nextBtn.disabled = pageIndex === totalPages - 1;

        currentPage = pageIndex;
    }

    function createPagination() {
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            dot.addEventListener('click', () => showPage(i));
            paginationContainer.appendChild(dot);
        }
        totalPageNumEl.textContent = String(totalPages).padStart(2, '0');
    }

    // --- Event Listeners ---

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            showPage(currentPage - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            showPage(currentPage + 1);
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            const targetIndex = Array.from(pages).findIndex(p => `#${p.id}` === targetId);
            if (targetIndex !== -1) {
                showPage(targetIndex);
            }
        });
    });

    // --- PDF Export Logic ---

    document.getElementById('export-pdf-btn').addEventListener('click', () => {
        const btn = document.getElementById('export-pdf-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Generating...';
        btn.disabled = true;

        // Temporarily show all pages for PDF generation
        pages.forEach(page => page.style.display = 'block');
        // Ensure the container is ready for html2pdf
        const element = document.getElementById('catalog-container');

        const options = {
            margin: 0,
            filename: 'VIS-Product-Catalog-2025.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: null // Use CSS background
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            enableLinks: true
        };

        html2pdf().set(options).from(element).save().then(() => {
            // Restore button and page visibility
            btn.innerHTML = originalText;
            btn.disabled = false;
            pages.forEach((page, index) => {
                page.style.display = ''; // Revert to CSS control
            });
            showPage(currentPage); // Re-apply the active page view
        }).catch((err) => {
            console.error("Error generating PDF:", err);
            // Restore button and page visibility on error
            btn.innerHTML = originalText;
            btn.disabled = false;
            pages.forEach((page, index) => {
                page.style.display = ''; // Revert to CSS control
            });
            showPage(currentPage); // Re-apply the active page view
        });
    });

    // --- Initialization ---
    createPagination();
    showPage(0);
});
