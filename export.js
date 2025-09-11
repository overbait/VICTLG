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

        // The logic to show all pages is now in print.css,
        // so we don't need the page.evaluate block to change styles.

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
