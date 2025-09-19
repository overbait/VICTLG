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

        // Contact buttons - navigate to last page
        const contactButtons = document.querySelectorAll('.contact-bar');
        contactButtons.forEach(button => {
            button.addEventListener('click', () => {
                showPage(totalPages - 1); // Navigate to last page (contact page)
            });
        });

    }

// Product to image mapping
const productImageMap = {
  // TRANSMITTERS
  'V25-850M': 'D60.jpg',
  'V50-850M': 'D60.jpg',
  'VM100-850M': 'D60.jpg',
  'T56-850': 'T56-250C.jpg',
  'V25-1550M': 'D60.jpg',

  // RECEIVERS
  'R56-850': 'R56-850.jpg',
  'D30-850M': 'D60.jpg',
  'D60M FC': 'D60.jpg',

  // ICS
  'A56-230C': 'A56.jpg',
  'A56-105C': 'A56.jpg',
  'T56-250C': 'T56-250C.jpg',

  // CHIPS - VM100 series
  'VM100 850': 'VM100.jpg',
  'VM100 880': 'VM100.jpg',
  'VM100 910': 'VM100.jpg',
  'VM100 940': 'VM100.jpg',
  'VM100 850 MA-SM': 'VM100MA.jpg',
  'VM100 880 MA-SM': 'VM100MA.jpg',
  'VM100 910 MA-SM': 'VM100MA.jpg',
  'VM100 940 MA-SM': 'VM100MA.jpg',
  'VM100 850 qSM': 'V25.jpg',
  'VM100 910 qSM': 'V25.jpg',

  // CHIPS - V50/VM50 series
  'V50 850': 'V50.jpg',
  'VM50 940': 'V50.jpg', // closest match
  'V25 940 HP MA': 'V25.jpg',
  'VM50 850': 'V50.jpg',
  'V25 850 HT': 'V25.jpg',

  // PHOTODIODES
  'D40 SWDM': 'D40.jpg',
  'D35 SWDM': 'D35.jpg',
  'D30 SWDM': 'D35.jpg', // closest match
  'D70 SWDM': 'D40.jpg',
  'D400G': 'D40.jpg' // closest match
};

function addProductImages() {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const productName = card.querySelector('h4 .mono')?.textContent?.trim();
    const imagePlaceholder = card.querySelector('.product-image-placeholder');

    if (productName && imagePlaceholder && productImageMap[productName]) {
      const imageSrc = `media/${productImageMap[productName]}`;
      imagePlaceholder.innerHTML = `<img src="${imageSrc}" alt="${productName} product image" class="product-image">`;
    }
  });
}

function addDatasheetButtons() {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const url = card.getAttribute('data-datasheet');
    const btn = document.createElement('div');
    btn.classList.add('product-datasheet');
    const content = `<span>DATASHEET</span><img src="media/linkpic.png" alt="link icon">`;
    btn.innerHTML = url
      ? `<a href="${url}" target="_blank" rel="noopener">${content}</a>`
      : content;
    card.appendChild(btn);
  });
}

    // --- Initialization ---
    setupEventListeners();
    addProductImages();
    addDatasheetButtons();
    showPage(0); // Show the first page initially
});

// Also try to add images after window load to ensure all resources are loaded
window.addEventListener('load', () => {
    setTimeout(() => addProductImages(), 100); // Small delay to ensure everything is ready
});
