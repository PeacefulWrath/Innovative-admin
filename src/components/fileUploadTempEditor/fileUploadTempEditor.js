import React from 'react';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import axios from "axios";
import { Link } from "react-router-dom";

function FileUploadTempEditor() {
  const [windowWidth, setWindowWidth] = useState();
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [])
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const [disableUploadBtn, setDisableUploadBtn] = useState(true);
  const[waterMarkBtn,setWaterMarkBtn]=useState(false)
  const[logoBtn,setLogoBtn]=useState(false)
  const[pageNoBtn,setPageNoBtn]=useState(false)
  const[downloadBtn,setDownloadBtn]=useState(false)



  const saveFile = async (formData) => {
    let fileData = {};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/`,
        formData,
        {


          "watermark": waterMarkBtn,
      
          "logo": logoBtn,
       "pageNo":pageNoBtn,
          "downloadable": downloadBtn
        },
        {
         
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fileData = response;
    } catch (error) {
      console.log("err", error);
    } finally {
      return fileData;
    }
  };

  // const convertFile = async (formData) => {
  //   let convertedMessage = {};
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/api/convert`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     convertedMessage = response.data.message;
  //     console.log(convertedMessage);
  //   } catch (error) {
  //     console.log("err", error);
  //   } finally {
  //     return convertedMessage;
  //   }
  // };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileType = selectedFile.name.split(".")[1];
    if (
      selectedFile &&
      (fileType === "pdf"
        // fileType === "docx" ||
        // fileType === "pptx" ||
        // fileType === "xlsx"
      )
    ) {
      setDisableUploadBtn(false);
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError(
        "Please choose a valid file; make sure file extension must be end with pdf"
      );
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    // console.log("fff", file.name.split(".")[1]);
    // const fileType = file.name.split(".")[1];
    // if (fileType === "docx" || fileType === "pptx" || fileType === "xlsx") {
    //   const convertedData = await convertFile(formData);

    //   if (convertedData !== "file converted successfully") {
    //     alert("file conversion failed");
    //     return;
    //   }
    // }
    const insertedData = await saveFile(formData);
    if (insertedData) {
      alert("pdf uploaded successfully");
      // window.location.reload();
    } else {
      alert("pdf upload failed");
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      let filesData = [];
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/`
        );
        filesData = response.data;
      } catch (error) {
        console.log("err", error);
      } finally {
        setFiles([...filesData]);
      }
    };

    fetcher();
  }, []);

  return (
    <>
      <Nav />
      <hr style={{ color: "black", margin: '0' }} />
      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="file-upload-temp-editor" />}
        {/* <div className="col-md-10 p-4">
          <div className="container mt-5">
            <div
              className="d-flex justify-content-center align-items-center mb-5"
              style={{ marginLeft: "2.2%" }}
            >
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ marginLeft: "-5%" }}               >
              <button
                className="btn"
                style={{ backgroundColor: "green", color: "white" }}
                onClick={handleUpload}
                disabled={disableUploadBtn}
              >
                Upload
              </button>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5"                >
              <div class="form-check form-switch         ">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitch1" onChange={()=>{
                  setWaterMarkBtn(!waterMarkBtn)
                }} checked={waterMarkBtn}/>
                <label class="form-check-label" for="flexSwitch1">Watermark</label>
              </div>
              <div class="form-check form-switch ms-3">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitch2" onChange={()=>{
                  setLogoBtn(!logoBtn)
                }} checked={logoBtn} />
                <label class="form-check-label" for="flexSwitch2">Top Left Logo</label>
              </div>
              <div class="form-check form-switch  ms-3">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitch3" onChange={()=>{
                  setPageNoBtn(!pageNoBtn)
                }} checked={pageNoBtn} />
                <label class="form-check-label" for="flexSwitch3">Bottom Right Page No</label>
              </div>
              <div class="form-check form-switch ms-3">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitch4" onChange={()=>{
                  setDownloadBtn(!downloadBtn)
                }} checked={downloadBtn} />
                <label class="form-check-label" for="flexSwitch4">Download Option</label>
              </div>


            </div>
            {error && (
              <div className="d-flex justify-content-center align-items-center">
                <p style={{ color: "red", marginTop: "23px", marginLeft: "5px" }}>
                  {error}
                </p>
              </div>
            )}
          </div>
          {files.length !== 0 ? (
            <div className="mt-5">
              <hr style={{ color: "#6A0DAD" }} />
              {files.length !== 0 && (
                <div className="col p-4">
                  <div className="d-flex row">
                    <div className="col fw-bold">
                      {`Files (${files.length})`}
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
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {files.map((f, index) => (
                      <tbody>
                        <tr >
                          <td scope="col">{index + 1}</td>
                          <td>{f?.file_name}</td>
                          <td>
                            <Link to="/pdfDetails" state={{ pdfUrl: f?.pdf_url }}>
                              view
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <div className="spinner-border" role="status"></div>
            </div>
          )}
        </div> */}


        
      </div>
    </>
  )
}

export default FileUploadTempEditor