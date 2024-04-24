import React from 'react';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js"
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import {
  Modal,
  Button,
} from "react-bootstrap";
import { createTemplates, fetchTemplates } from '../../api-calls/apicalls';



function FileUploadTempEditor() {
  const [windowWidth, setWindowWidth] = useState();
  const [templates, setTemplates] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false)
  const [templateName, setTemplateName] = useState("")
  const [templateDesc, setTemplateDesc] = useState("")
  const [templateImage, setTemplateImage] = useState()
  const [templatePdfs, setTemplatePdfs] = useState([])
  const [templateZips, setTemplateZips] = useState([])
  const [links, setLinks] = useState([])
  const [templateLinkNames, setTemplateLinkNames] = useState([])
  const [templateLinkUrls, setTemplateLinkUrls] = useState([])
  const [watermarkBtn, setWatermarkBtn] = useState([])
  const [logoBtn, setLogoBtn] = useState([])
  const [pageNoBtn, setPageNoBtn] = useState([])
  const [pdfDownloadBtn, setPdfDownloadBtn] = useState([])
  const [zipDownloadBtn, setZipDownloadBtn] = useState([])
  const [viewTemplate,setViewTemplate]=useState(false)
 
  const handleAddTemplates = () => {
    setShowAddModal(true)
  }

  const handleAddClose = () => {
    setShowAddModal(false)
  }

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const imageFileHandler = (e) => {
    let selectedImage = e.target.files[0]


    if (selectedImage.type !== "image/png") {
      alert("please select image")
      document.getElementById("add-image").value = ""
      return;
    }
    setTemplateImage(selectedImage)
  };

  const pdfFilesHandler = (e) => {
    let allSelectedPdfs = e.target.files
    let tempPdfs = []

    for (let i = 0; i < allSelectedPdfs.length; i++) {
      if (allSelectedPdfs[i].type !== "application/pdf") {
        alert("please select pdfs")
        document.getElementById("add-pdfs").value = ""
        return;
      }
      else {
        tempPdfs.push(allSelectedPdfs[i])
      }
    }
    setTemplatePdfs(tempPdfs)
  }

  const zipFilesHandler = (e) => {


    let allSelectedZips = e.target.files
    let tempZips = []

    for (let i = 0; i < allSelectedZips.length; i++) {
      if (allSelectedZips[i].type !== "application/x-zip-compressed") {
        alert("please select zips")
        document.getElementById("add-zips").value = ""
        return;
      }
      else {
        tempZips.push(allSelectedZips[i])
      }
    }
    setTemplateZips(tempZips)
  }

  const handleLinks = () => {
    const tempLinks = links
    tempLinks.push(links.length + 1)
    setLinks([...tempLinks])
  }

  const handleCreate = async () => {
    let addData = new FormData()

    addData.append("template_name", templateName)
    addData.append("template_desc", templateDesc)
    addData.append("files", templateImage)
    templatePdfs.forEach((pdf, index) => {
      // console.log("ooo",document.getElementById(`flexSwitch-pdf-wm-${index}`).value )
      addData.append("files", pdf)
      addData.append("watermark", document.getElementById(`flexSwitch-pdf-wm-${index}`).value == "off" ? false : true)
      addData.append("top_left_logo", document.getElementById(`flexSwitch-pdf-lb-${index}`).value == "off" ? false : true)
      addData.append("bottom_right_page_no", document.getElementById(`flexSwitch-pdf-pn-${index}`).value == "off" ? false : true)
      addData.append("pdf_downloadable", document.getElementById(`flexSwitch-pdf-do-${index}`).value == "off" ? false : true)
    })

    templateZips.forEach((zip, index) => {
      addData.append("files", zip)
      addData.append("zip_downloadable", document.getElementById(`flexSwitch-zip-do-${index}`).value == "off" ? false : true)
    })

    links.forEach((data, ind) => {
      addData.append("link_preview_name", document.getElementById(`link-name-${ind}`).value)
      addData.append("link_url", document.getElementById(`link-url-${ind}`).value)
    })


    let createdData = await createTemplates(addData);

    let tempCreatedData = [];
    tempCreatedData.push(createdData);
    setTemplates([...templates, ...tempCreatedData]);
    handleAddClose();
  }

  const handleSubBtns = (id) => {
    // console.log("id",id)
    // console.log("ooo",document.getElementById(`${id}`).value )
    if (document.getElementById(`${id}`).value == "off") {
      document.getElementById(`${id}`).value = "on"
    }
    else {
      document.getElementById(`${id}`).value = "off"
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
      let templatesData = await fetchTemplates()
      setTemplates([...templatesData])
    };

    fetcher();

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  useEffect(() => {
    if (templatePdfs.length !== 0) {
      templatePdfs.forEach((temp, index) => {
        document.getElementById(`flexSwitch-pdf-wm-${index}`).value = "off"
        document.getElementById(`flexSwitch-pdf-lb-${index}`).value = "off"
        document.getElementById(`flexSwitch-pdf-pn-${index}`).value = "off"
        document.getElementById(`flexSwitch-pdf-do-${index}`).value = "off"
      })
    }
  }, [templatePdfs])


  useEffect(() => {
    if (templateZips.length !== 0) {
      templateZips.forEach((temp, index) => {
        document.getElementById(`flexSwitch-zip-do-${index}`).value = "off"
      })
    }
  }, [templateZips])

  return (
    <>
      <Nav />
      <hr style={{ color: "black", margin: '0' }} />

      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="file-upload-temp-editor" />}
        <div className="col-md-10 p-4">
          <div className="d-flex justify-content-end mb-5">
            <button className='btn ' style={{ width: "fit-content", background: "#90EE90", whiteSpace: "nowrap" }} onClick={() => { handleAddTemplates() }}><AddIcon /><span className='ms-2'>create</span></button>
          </div>
          <div className="d-flex row">
            <div className="col fw-bold">
              {`Templates(${templates?.length || 0})`}
            </div>
            <div className="col d-flex">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <button
                  className="btn btn-outline-primary"
                  type="search"
                  id="button-addon2"
                >
                  Search
                </button>

              </div>
            </div>
          </div>
          <table className="table mt-1 p-4 w-70 text-center">
            <thead>
              <tr className="table-primary table-striped">
                <th scope="col">SN.</th>
                <th scope="col">Template Name</th>
                <th scope="col">View</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            {templates && templates?.length !== 0 ? templates.map((temp, index) => (
              <tbody>

                <tr >
                  <th scope="col">{index + 1}.</th>
                  <th scope="col"> {temp?.template_name}</th>
                  <th scope="col"> 
                  <Link to="/view" state={{ templateData: temp }}>
                    view
                  </Link>
                  </th>
                  <th scope="col ">
                    <CreateIcon
                      className="text-primary border border-primary rounded me-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {

                      }}
                    />
                    <DeleteIcon
                      className="text-danger border border-danger cursor-pointer rounded"
                      style={{ cursor: "pointer" }}
                      onClick={() => {

                      }}
                    />
                  </th>
                </tr>

              </tbody>
            )) : (

              <></>

            )}

          </table>
        </div>
      </div>

      <Modal
        show={showAddModal} onHide={handleAddClose}
        size="lg"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title>Add Templates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-2">
            <div className="mb-2">
              <label className="pb-1">Template Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Template Name"
                value={templateName}
                onChange={(e) => {
                  setTemplateName(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <label className="pb-1">Template Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Template Description"
                value={templateDesc}
                onChange={(e) => {
                  setTemplateDesc(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <label className="pb-1">Template Image</label>
              <input
                type="file"
                id="add-image"
                className="form-control"
                placeholder="Template Image"
                onChange={imageFileHandler}
              />
            </div>
            <div className="mb-2">
              <label className="pb-1">Template Pdfs</label>
              <input
                type="file"
                id="add-pdfs"
                className="form-control"
                placeholder="Template Pdfs"
                onChange={pdfFilesHandler}
                multiple
              />
            </div>
            {templatePdfs && templatePdfs.length !== 0 &&
              <div className="mb-2">
                {templatePdfs.map((temp, tempIndex) => (
                  <div className="d-flex">
                    {temp?.name}
                    <div class="form-check form-switch ms-2">
                      <input class="form-check-input" type="checkbox" role="switch" id={`flexSwitch-pdf-wm-${tempIndex}`}
                        onChange={() => {
                          handleSubBtns(`flexSwitch-pdf-wm-${tempIndex}`)
                        }}

                      />
                      <label class="form-check-label" for={`flexSwitch-pdf-wm-${tempIndex}`}>Watermark</label>
                    </div>
                    <div class="form-check form-switch ms-3">
                      <input class="form-check-input" type="checkbox" role="switch" id={`flexSwitch-pdf-lb-${tempIndex}`} onChange={() => {
                        handleSubBtns(`flexSwitch-pdf-lb-${tempIndex}`)
                      }} />
                      <label class="form-check-label" for={`flexSwitch-pdf-lb-${tempIndex}`}>Top Left Logo</label>
                    </div>
                    <div class="form-check form-switch  ms-3">
                      <input class="form-check-input" type="checkbox" role="switch" id={`flexSwitch-pdf-pn-${tempIndex}`} onChange={() => {
                        handleSubBtns(`flexSwitch-pdf-pn-${tempIndex}`)
                      }} />
                      <label class="form-check-label" for={`flexSwitch-pdf-pn-${tempIndex}`}>Bottom Right Page No</label>
                    </div>
                    <div class="form-check form-switch ms-3">
                      <input class="form-check-input" type="checkbox" role="switch" id={`flexSwitch-pdf-do-${tempIndex}`} onChange={() => {
                        handleSubBtns(`flexSwitch-pdf-do-${tempIndex}`)
                      }} />
                      <label class="form-check-label" for={`flexSwitch-pdf-do-${tempIndex}`}>Download Option</label>
                    </div>
                  </div>
                ))}
              </div>}
            <div className="mb-2">
              <label className="pb-1">Template Zips</label>
              <input
                type="file"
                id="add-zips"
                className="form-control"
                placeholder="Template Zips"
                onChange={zipFilesHandler}
                multiple
              />
            </div>
            {templateZips && templateZips.length !== 0 &&
              <div className="mb-2">
                {templateZips.map((temp, tempIndex) => (
                  <div className="d-flex">
                    {temp?.name}
                    <div class="form-check form-switch ms-3">
                      <input class="form-check-input" type="checkbox" role="switch" id={`flexSwitch-zip-do-${tempIndex}`} onChange={() => {
                        handleSubBtns(`flexSwitch-zip-do-${tempIndex}`)
                      }} />
                      <label class="form-check-label" for={`flexSwitch-zip-do-${tempIndex}`}>Download Option</label>
                    </div>
                  </div>
                ))}
              </div>}
            <div className="mb-2">
              <div className='d-flex justify-content-between'>
                <label className="pb-1">Template Links</label>
                <button className='btn' style={{ width: "fit-content", background: "#cfb0cc", whiteSpace: "nowrap" }} onClick={() => { handleLinks() }}>add links <AddIcon /></button>
              </div>

              {links.length !== 0 && links.map((data, ind) => (
                <div className='d-flex mt-2'>
                  <input
                    type="text"
                    id={`link-name-${ind}`}
                    className="form-control"
                    placeholder="Template Links Name"
                  />
                  <input
                    type="text"
                    id={`link-url-${ind}`}
                    className="form-control ms-2"
                    placeholder="Template Links Url"
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn" style={{ background: "red", border: "none" }} onClick={handleAddClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>

      </Modal >

    </>


  )



}

export default FileUploadTempEditor