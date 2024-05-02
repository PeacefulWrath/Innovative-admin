
import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import emailjs from "@emailjs/browser";

function InvoiceManagement() {
  const [windowWidth, setWindowWidth] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const [detailsCnt, setDetailsCnt] = useState([])
  const [companyName, setCompanyName] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  const [companyPhoneNo, setCompanyPhoneNo] = useState("")
  const [companyEmail, setCompanyEmail] = useState("")
  const [invoiceNo, setInvoiceNo] = useState("")
  const [date, setDate] = useState("")
  const [billingAdd, setBillingAdd] = useState("")
  const [shippingAdd, setShippingAdd] = useState("")
  const [details, setDetails] = useState([])
  const [showPdf, setShowPdf] = useState(false)
  const [receiverEmail, setReceiverEmail] = useState("")
  const [receiverName,setReceiverName]=useState("")

  useEffect(() => emailjs.init("ptuqDG8Zl2iuDoPXR"), []);

  const handleGeneratePDF = async () => {
    const input = document.getElementById('content');

    await html2canvas(input)
      .then(async(canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
         
        

        pdf.save('download.pdf');

        // console.log("dlll",pdf)
        const pdfDataUrl = canvas.toDataURL('image/png');

   
        // document.getElementById("embed").src=pdfDataUrl

        // await  handleSend(pdfDataUrl)
      });
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleCreateModalClose = () => {
    setShowCreate(false);
  };

  const handlePdfModalClose = () => {
    setShowPdf(false)
  }




  const handleCreate = () => {
    setShowCreate(false)
    setShowPdf(true)
  }

  const handleSend=async(pdf)=>{
    // console.log("pdf",pdf)
    const serviceId = "service_5rcwcy8";
    const customerTemplateId = "template_fcwwhlj";
    try {
      await emailjs.send(serviceId, customerTemplateId, {
        Name: receiverName,
        Email: receiverEmail,
        Pdf:` Hello {{Name}},

        You got a new message from Innovative:
        
        {{Pdf}}
        
        Best wishes,
        Innovative team <img src=${pdf} width="100%" height="600px" />`
        
      });
    } catch (error) {
      console.log(error);
    } finally {
      alert("email send successfully")
      // handlePdfModalClose()
    }
  }


  useEffect(() => {
    console.log(process.env.REACT_APP_EMAIL_PUBLIC_KEY)
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);


    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

 


  return (
    <div>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />

      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="invoice-management" />}
        <div className="col-md-10 p-4">
          <div className="d-flex justify-content-end mb-5">
            <button
              className="btn "
              style={{
                width: "fit-content",
                background: "#90EE90",
                whiteSpace: "nowrap",
              }}
              onClick={() => {
                setShowCreate(true)
              }}
            >
              <AddIcon />
              <span className="ms-2">create invoice</span>
            </button>
          </div>

        </div>
      </div>


      <Modal show={showCreate} onHide={handleCreateModalClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Add Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>

            <div className="d-flex mt-4">
              <label
                class="form-check-label"
                for="company-name"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company-name"
                className="ms-3"
                onChange={(e) => {
                  setCompanyName(e.target.value)
                }}
              />

            </div>

            <div className="d-flex mt-4">
              <label
                class="form-check-label"
                for="company-address"
              >
                Company Address
              </label>
              <textarea
                type="text"
                id="company-address"
                className="ms-3"
                onChange={(e) => {
                  setCompanyAddress(e.target.value)
                }}
              />

            </div>


            <div className="d-flex mt-4">
              <label
                class="form-check-label"
                for="company-phone-no"
              >
                Company Phone No
              </label>
              <input
                type="text"
                id="company-phone-no"
                className="ms-3"
                onChange={(e) => {
                  setCompanyPhoneNo(e.target.value)
                }}
              />

            </div>


            <div className="d-flex mt-4">
              <label
                class="form-check-label"
                for="company-email"
              >
                Company Email
              </label>
              <input
                type="text"
                id="company-email"
                className="ms-3"
                onChange={(e) => {
                  setCompanyEmail(e.target.value)
                }}
              />

            </div>

            <div className="d-flex mt-4">
              <label
                class="form-check-label"
                for="invoice-no"
              >
                Invoice No
              </label>
              <input
                type="text"
                id="invoice-no"
                className="ms-3"
                onChange={(e) => {
                  setInvoiceNo(e.target.value)
                }}
              />

            </div>

            <div className="d-flex mt-4">
              <label
                class="form-check-label"
                for="invoice-no"
              >
                Date
              </label>
              <input
                type="text"
                id="invoice-date"
                className="ms-3"
                onChange={(e) => {
                  setDate(e.target.value)
                }}
              />

            </div>


            <div className="d-flex mt-4">
              <label
                class="form-check-label"
                for="billing-address"
              >
                Billing Address
              </label>
              <textarea
                type="text"
                id="billing-address"
                className="ms-3"
                onChange={(e) => {
                  setBillingAdd(e.target.value)
                }}
              />

            </div>

            <div className="d-flex mt-4">
              <label
                class="form-check-label"
                for="shipping-address"
              >
                Shipping Address
              </label>
              <textarea
                type="text"
                id="shipping-address"
                className="ms-3"
                onChange={(e) => {
                  setShippingAdd(e.target.value)
                }}
              />

            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-between">
                <label className="pb-1">Add Details</label>
                <button
                  className="btn"
                  style={{
                    width: "fit-content",
                    background: "#cfb0cc",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    const tempDetailsCnt = detailsCnt;
                    tempDetailsCnt.push(detailsCnt.length + 1);
                    setDetailsCnt([...tempDetailsCnt]);
                  }}
                >
                  Add details <AddIcon />
                </button>
              </div>
            </div>

            {detailsCnt.length !== 0 &&
              detailsCnt.map((_, ind) => (
                <>
                  <div className="d-flex mt-2">
                    <input
                      type="text"
                      id={`qty-${ind}`}
                      className="form-control"
                      placeholder="qty"
                    />
                    <input
                      type="text"
                      id={`desc-${ind}`}
                      className="ms-2 form-control"
                      placeholder="description"
                    />
                    <input
                      type="text"
                      id={`unit-price-${ind}`}
                      className="ms-2 form-control"
                      placeholder="unit price"
                    />
                    <input
                      type="text"
                      id={`total-${ind}`}
                      className="ms-2 form-control"
                      placeholder="total"
                    />
                  </div>


                </>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            style={{ background: "red", border: "none" }}
            onClick={handleCreateModalClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {

              handleCreate();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showPdf} onHide={handlePdfModalClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            send pdf
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>

          <div className="d-flex mt-4">
              <label
                class="form-check-label"
                for="receiver-name"
              >
                Receiver Name:
              </label>
              <input
                type="text"
                id="receiver-name"
                className="ms-3"
                onChange={(e) => {
                  setReceiverName(e.target.value)
                }}
              />

            </div>
            <div className="d-flex mt-4">
              <label
                class="form-check-label"
                for="receiver-email"
              >
                Receiver Email
              </label>
              <input
                type="text"
                id="receiver-email"
                className="ms-3"
                onChange={(e) => {
                  setReceiverEmail(e.target.value)
                }}
              />

            </div>

           

            <div id="content" className="mt-5 border border-success" >
              <p className="d-flex justify-content-center">{companyName}</p>
              <p className="d-flex justify-content-center">{companyAddress}</p>
              <p className="d-flex justify-content-center">{companyPhoneNo}</p>
              <p className="d-flex justify-content-center">{companyEmail}</p>
              <p className="d-flex justify-content-center">{invoiceNo}</p>
              <p className="d-flex justify-content-center">{date}</p>
              <p className="d-flex justify-content-center">{billingAdd}</p>
              <p className="d-flex justify-content-center">{shippingAdd}</p>
              {
                details.map((d) => {
                  <p className="d-flex justify-content-center">{d}</p>
                })
              }
              <p></p>
            </div>


          



          </>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            style={{ background: "red", border: "none" }}
            onClick={handlePdfModalClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleGeneratePDF()
              // handleSendPdf();
            }}
          >
            Download & Send
          </Button>
        </Modal.Footer>
      </Modal>


     
    </div>
  )
}

export default InvoiceManagement