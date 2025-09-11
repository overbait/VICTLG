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
        // Read HTML and CSS files
        console.log('Reading HTML and CSS files...');
        let html = await fs.readFile('index.html', 'utf-8');
        const css = await fs.readFile('style.css', 'utf-8');

        // Inline the CSS
        console.log('Inlining CSS...');
        html = html.replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`);

        // By setting the content directly, we avoid navigation issues.
        // We must provide a base URL so that relative image paths like 'media/...' work correctly.
        await page.setContent(html, {
            waitUntil: 'networkidle0'
        });

        // Prepare the page for printing: display all sections
        console.log('Preparing all pages for printing...');
        await page.evaluate(() => {
            const pages = document.querySelectorAll('.page');
            pages.forEach(p => {
                p.style.display = 'flex'; // Use 'flex' as per the active page style
                p.classList.remove('active'); // Ensure no 'active' class is present
            });
            // Also remove the export button if it exists, to not include it in the PDF
            const exportContainer = document.getElementById('export-container');
            if (exportContainer) {
                exportContainer.remove();
            }
        });

        // Generate the PDF
        console.log('Generating PDF...');
        await page.pdf({
            path: 'VIS-Product-Catalog-2025.pdf',
            format: 'A4',
            printBackground: true,
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
