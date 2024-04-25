import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Watermark from "./Watermark";
import { useLocation } from "react-router-dom";
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import logo from "../../assets/logo.png"
function PdfDetails() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const[pdfUrl,setPdfUrl]=useState("")
  const [windowWidth, setWindowWidth] = useState();

  const location = useLocation();
  const { template, clickedPdf } = location.state;

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    const tempDoc = document.querySelectorAll(".react-pdf__Document");
    tempDoc.forEach((t) => {
      t.style.display = "flex";
      t.style.justifyContent = "center";
    });
  }

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayers.forEach((layer) => {
      const { style } = layer;
      style.top = "0";
      style.left = "0";
      style.transform = "";
      style.display = "none";
    });

    const tempCanvas = document.querySelectorAll(".react-pdf__Page__canvas");

    tempCanvas.forEach((t) => {
      t.style.border = "2px solid #999595";
    });
  }

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
};

  useEffect(() => {
    
    template?.template_pdfs?.forEach((pdf)=>{
      if(pdf._id===clickedPdf._id){
        setPdfUrl(pdf?.url)
       }
    })
    
   setWindowWidth(window.innerWidth);
   window.addEventListener("resize", updateWindowWidth);

    const container = document.querySelector(".pdf-container");
    const handleContextMenu = (event) => {
      event.preventDefault();
    };
    if (container) {
      container.addEventListener("contextmenu", handleContextMenu);
    }
    return () => {
      if (container) {
        container.removeEventListener("contextmenu", handleContextMenu);
      }
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <>
       <Nav />
      <hr style={{ color: "black", margin: '0' }} />

      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="file-upload-temp-editor" />}
        <div className="col-md-10 p-4">
      <div className="pdf-container mt-5">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page  pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset}>
            <img  className="View_pdf_logo" src={logo} alt="logo"/>
            <Watermark />
            <p className="View_pdf_page_no">Page {pageNumber} of {numPages}</p>
          </Page>
        </Document>

        <div className="mt-5 d-flex justify-content-center align-items-center">
          <button
            className="btn View_pdf_prev_btn"
            onClick={() => {
              if (pageNumber > 1) {
                setPageNumber(pageNumber - 1);
              } else {
                return;
              }
            }}
          >
            Previous
          </button>
          <p className="ms-2 me-2">
            Page {pageNumber} of {numPages}
          </p>
          <button
            className="btn View_pdf_next_btn"
            onClick={() => {
              if (pageNumber === numPages) {
                return;
              } else {
                setPageNumber(pageNumber + 1);
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default PdfDetails;