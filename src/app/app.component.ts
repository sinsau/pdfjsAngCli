import { Component, OnInit } from '@angular/core';

declare var pdfjsLib: any;
declare var pdfjsViewer: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  url = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js';
    console.log(pdfjsLib);
    console.log(pdfjsViewer);
  }

  ngOnInit() {
    this.setup();
  }

  private setup() {
    const container = document.getElementById('viewerContainer');
    const pdfLinkService = new pdfjsViewer.PDFLinkService();

    const pdfViewer = new pdfjsViewer.PDFViewer({
      container,
      linkService: pdfLinkService,
      // disableAutoFetch: true
    });
    pdfLinkService.setViewer(pdfViewer);

    const pdfFindController = new pdfjsViewer.PDFFindController({
      pdfViewer,
    });
    pdfViewer.setFindController(pdfFindController);

    pdfjsLib.getDocument({
      url: this.url,
    }).then((pdfDocument) => {
      pdfViewer.setDocument(pdfDocument);
      pdfLinkService.setDocument(pdfDocument, null);
    });

  }
}
