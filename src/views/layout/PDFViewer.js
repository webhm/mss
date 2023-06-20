
import Hammer from 'hammerjs';

class PDFViewer {
    constructor(pdfUrl, containerId) {
        // Crear un objeto de la librería PDF.js para cargar el PDF
        this.pdfjsLib = window["pdfjs-dist/build/pdf"];
        // The workerSrc property shall be specified.
        this.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "assets/dashforge/lib/pdf.js/build/pdf.worker.js";

        this.pdfUrl = pdfUrl;

        this.containerId = containerId;

    }

    async load() {
        const loadingTask = this.pdfjsLib.getDocument(this.pdfUrl);
        const pdf = await loadingTask.promise;

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const canvas = document.createElement("canvas");
            canvas.style.display = "block";
            const container = document.getElementById(this.containerId);
            container.appendChild(canvas);

            const viewport = page.getViewport({ scale: 1 });
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
                canvasContext: canvas.getContext("2d"),
                viewport: viewport,
            };
            await page.render(renderContext);
        }
    }

    async printRenderedPDF() {
        const container = document.getElementById(this.containerId);
        const canvasList = container.querySelectorAll("canvas");
        const printWindow = window.open("", "printWindow");
        printWindow.document.write("<html><head><title>Print</title></head><body>");
        for (let i = 0; i < canvasList.length; i++) {
            const canvas = canvasList[i];
            const imgData = canvas.toDataURL("image/png");
            printWindow.document.write("<img src='" + imgData + "'>");
        }
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
    }
}



export default PDFViewer;

