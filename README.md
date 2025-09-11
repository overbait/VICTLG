# VI SYSTEMS - Product Catalog Viewer

This project is a simple web-based viewer for the VI SYSTEMS 2025 product catalog.

## Usage

To view the catalog, open the `index.html` file in a modern web browser.

## Export to PDF

The catalog can be exported to a single, high-quality PDF file using a command-line script.

### Requirements

- [Node.js](https://nodejs.org/) (which includes npm)

### Setup

1.  Clone the repository and navigate into the project directory.
2.  Install the necessary dependencies by running the following command in your terminal:
    ```bash
    npm install
    ```

### Generating the PDF

Once the dependencies are installed, you can generate the PDF by running the export script:

```bash
node export.js
```

This will create a file named `VIS-Product-Catalog-2025.pdf` in the root of the project directory.