const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

(async () => {
    console.log('Starting PDF generation...');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        // Go to the local HTML file
        const filePath = path.resolve(__dirname, 'index.html');
        console.log(`Navigating to: file://${filePath}`);
        await page.goto(`file://${filePath}`, {
            waitUntil: 'networkidle0', // Wait for all network connections to be idle
            timeout: 60000 // 60-second timeout
        });

        // Emulate print media type to apply print.css
        console.log('Emulating print media type...');
        await page.emulateMediaType('print');

        // --- Convert navigation buttons to PDF links ---
        console.log('Converting navigation buttons to PDF links...');
        await page.evaluate(() => {
            const pages = Array.from(document.querySelectorAll('.page'));
            pages.forEach((currentPage, index) => {
                // Handle Next Button
                const nextBtn = currentPage.querySelector('.next-btn');
                if (nextBtn && index < pages.length - 1) {
                    const nextPageId = pages[index + 1].id;
                    if (nextPageId) {
                        const link = document.createElement('a');
                        link.href = `#${nextPageId}`;
                        link.className = nextBtn.className;
                        link.innerHTML = nextBtn.innerHTML;
                        // Copy over inline styles if any, for visual consistency
                        link.style.cssText = nextBtn.style.cssText;
                        nextBtn.parentNode.replaceChild(link, nextBtn);
                    }
                }

                // Handle Prev Button
                const prevBtn = currentPage.querySelector('.prev-btn');
                if (prevBtn && index > 0) {
                    const prevPageId = pages[index - 1].id;
                    if (prevPageId) {
                        const link = document.createElement('a');
                        link.href = `#${prevPageId}`;
                        link.className = prevBtn.className;
                        link.innerHTML = prevBtn.innerHTML;
                        link.style.cssText = prevBtn.style.cssText;
                        prevBtn.parentNode.replaceChild(link, prevBtn);
                    }
                }

                // Handle Contact Button - always link to last page
                const contactBtn = currentPage.querySelector('.contact-bar');
                if (contactBtn && pages.length > 0) {
                    const lastPageId = pages[pages.length - 1].id;
                    if (lastPageId) {
                        const link = document.createElement('a');
                        link.href = `#${lastPageId}`;
                        link.className = contactBtn.className;
                        link.innerHTML = contactBtn.innerHTML;
                        link.style.cssText = contactBtn.style.cssText;
                        contactBtn.parentNode.replaceChild(link, contactBtn);
                    }
                }
            });
        });

        // Generate the PDF
        console.log('Generating PDF...');
        await page.pdf({
            path: 'VIS-Product-Catalog-2025.pdf',
            format: 'A4',
            printBackground: true, // Important for backgrounds and colors
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        });

        console.log('PDF generated successfully: VIS-Product-Catalog-2025.pdf');

    } catch (error) {
        console.error('An error occurred during PDF generation:', error);
    } finally {
        await browser.close();
        console.log('Browser closed.');
    }
})();
