import m from "mithril";
import App from "../../models/App";
import HeaderPublic from "../layout/headerPublic";
import PDFViewer from "../layout/PDFViewer";

// Inicio
class Inicio extends App {

  pdfViewer;

  constructor() {
    super();
    this.title = "Inicio";
    this.getMenu().then(() => {
      this.view = this.page;
      m.redraw();
      console.log(1, this);




    });
  }



  getMenu() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve("hello");
        // las para router
      }, 3000);
    });
  }

  vHeader() {
    return m('h1');
  }



  vMain() {
    return [
      m("h1.mg-t-150.tx-center", "AAAAAAAA"),
      m('button', {
        onclick: () => {

          this.pdfViewer.printRenderedPDF();

        }
      }, 'Imprimir'),
      m('div.pd-0.mg-0.w-100[id="pdf"]', {
        style: {
          "width": "100%",
          "height": "500px",
          "overflow-y": "scroll",
        },
        oncreate: () => {


          this.pdfViewer = new PDFViewer("https://api.hospitalmetropolitano.org/v2/pacientes/d/MUNyQ05jNDNrT2lwQWlJTmJqaTdSUT09.pdf", "pdf");
          this.pdfViewer.load();

        }
      }),

    ];
  }

  page() {
    return [this.vHeader(), this.vMain()];
  }
}

export default Inicio;
