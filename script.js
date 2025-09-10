document.getElementById('export-pdf-btn').addEventListener('click', () => {
    const element = document.getElementById('catalog-container');

    // Show a temporary message to the user
    const btn = document.getElementById('export-pdf-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Generating PDF...';
    btn.disabled = true;

    const options = {
        margin: 0,
        filename: 'VIS-Product-Catalog-2025.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },
        enableLinks: true
    };

    html2pdf().set(options).from(element).save().then(() => {
        // Restore button state after PDF is generated
        btn.innerHTML = originalText;
        btn.disabled = false;
    }).catch((err) => {
        console.error("Error generating PDF:", err);
        // Restore button state on error
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
});
