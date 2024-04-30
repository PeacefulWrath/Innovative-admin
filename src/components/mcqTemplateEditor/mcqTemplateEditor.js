import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import {
  createMcqTemplates,
  fetchMcqTemplates,
} from "../../api-calls/apicalls";

function McqTemplateEditor() {
  const [windowWidth, setWindowWidth] = useState();
  const [mcqTemplates, setMcqTemplates] = useState([]);
  const [paperName, setPaperName] = useState("");
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mcqsCnt, setMcqsCnt] = useState([]);
  const [optionsType, setOptionsType] = useState([]);
  const [templateOptImages, setTemplateOptImages] = useState([]);
  const [templateOptTexts, setTemplateOptTexts] = useState([]);
  const [answerImages, setAnswerImages] = useState([]);
  const[explainations,setExplainations]=useState([])
  const[marks,setMarks]=useState([])

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleMcqsInputCnt = () => {
    const tempMcqs = mcqsCnt;
    tempMcqs.push(mcqsCnt.length + 1);
    setMcqsCnt([...tempMcqs]);
  };

  const handleSubBtns = (id, index) => {
    if (document.getElementById(`${id}`).value == "off") {
      document.getElementById(`${id}`).value = "on";
      let oppositeId = id;

      id.split("-").forEach((ele, index) => {
        if (index === 3) {
          id.split("-")[index] == "image"
            ? oppositeId.replace("image", "text")
            : oppositeId.replace("text", "image");
        }
      });

      document.getElementById(`${oppositeId}`).value = "off";

      let tempOptionsType = optionsType;
      if (id.includes("image")) {
        tempOptionsType[index] = "image";
      } else if (id.includes("text")) {
        tempOptionsType[index] = "text";
      }

      setOptionsType([...tempOptionsType]);
    } else if (document.getElementById(`${id}`).value == "on") {
      document.getElementById(`${id}`).value = "off";
      let oppositeId = id;

      id.split("-").forEach((ele, index) => {
        if (index === 3) {
          id.split("-")[index] == "image"
            ? oppositeId.replace("image", "text")
            : oppositeId.replace("text", "image");
        }
      });

      document.getElementById(`${oppositeId}`).value = "on";
      let tempOptionsType = optionsType;
      if (oppositeId.includes("image")) {
        tempOptionsType[index] = "image";
      } else if (oppositeId.includes("text")) {
        tempOptionsType[index] = "text";
      }

      setOptionsType([...tempOptionsType]);
    }
  };

  const imageFilesHandler = (e, cntInd, optInd) => {
    let selectedImage = e.target.files[0];
    let tempTemplateImages = templateOptImages;

    if (selectedImage.type !== "image/png") {
      alert("please select images");
      document.getElementById(`add-opt-image-${cntInd}-${optInd}`).value = "";
      tempTemplateImages[cntInd].splice(1, optInd);
      return;
    } else if (
      Array.isArray(tempTemplateImages[cntInd]) &&
      tempTemplateImages[cntInd]?.length !== 0
    ) {
      tempTemplateImages[cntInd][optInd] = selectedImage;
      setTemplateOptImages([...tempTemplateImages]);
    } else {
      tempTemplateImages[cntInd] = [];
      tempTemplateImages[cntInd][optInd] = selectedImage;
      setTemplateOptImages([...tempTemplateImages]);
    }
  };

  const textOptHandler = (e, cntInd, optInd) => {
    let selectedText = e.target.value;
    let tempTemplateTexts = templateOptTexts;

    if (
      Array.isArray(tempTemplateTexts[cntInd]) &&
      tempTemplateTexts[cntInd]?.length !== 0
    ) {
      tempTemplateTexts[cntInd][optInd] = selectedText;
      setTemplateOptTexts([...tempTemplateTexts]);
    } else {
      tempTemplateTexts[cntInd] = [];
      tempTemplateTexts[cntInd][optInd] = selectedText;
      setTemplateOptTexts([...tempTemplateTexts]);
    }
  };

  const answerImageFilesHandler = (e, ind) => {
    let selectedImage = e.target.files[0];
    let tempAnswerImages = answerImages;
    // console.log(selectedImage.type)
    if (selectedImage.type !== "image/png") {
      alert("please select images");
      document.getElementById(`add-img-answer-${ind}`).value = "";
      tempAnswerImages.splice(1, ind);
      return;
    } else {
      tempAnswerImages[ind] = selectedImage;
    }

    setAnswerImages([...tempAnswerImages]);
  };

  const handleCreate = async () => {
    let addData = new FormData();

    addData.append("paper_name", paperName);

    optionsType.forEach((ot) => {
      addData.append("options_type", ot);
    });
    templateOptImages &&
      templateOptImages.length !== 0 &&
      templateOptImages.forEach((temp) => {
        if (temp) {
          temp.forEach((tTemp) => {
            addData.append("options", tTemp);
          });
        }
      });
    answerImages.forEach((ai) => {
      addData.append("answers", ai);
    });

    templateOptTexts &&
      templateOptTexts.length !== 0 &&
      templateOptTexts.forEach((temp) => {
        if (temp) {
          temp.forEach((tTemp) => {
            addData.append("text_options", tTemp);
          });
        }
      });

    let tempAnswerText = [];
    mcqsCnt.forEach((mc, ind) => {
      addData.append(
        "question",
        document.getElementById(`add-question-${ind}`).value
      );
      if (optionsType[ind] == "text") {
        tempAnswerText[ind] = document.getElementById(
          `add-text-answer-${ind}`
        ).value;
      }
    });

    if (tempAnswerText.length !== 0) {
      addData.append("answer_text", JSON.stringify(tempAnswerText));
    }


    explainations&&explainations.length!==0&&explainations.forEach((exp)=>{
      addData.append("explaination",exp)
    })

    marks&&marks.length!==0&&marks.forEach((mark)=>{
      addData.append("mark",mark)
    })

    let createdData = await createMcqTemplates(addData);
    let tempCreatedData = [];
    tempCreatedData.push(createdData);
    setMcqTemplates([...mcqTemplates, ...tempCreatedData]);
    handleClose();
    window.location.reload();
  };

  const handleMarks=async(e,ind)=>{
    let tempMarks=marks
    tempMarks[ind]=e.target.value
    setMarks([...tempMarks])
  }

  const handleExplainations=async(e,ind)=>{
    let tempExplainations=explainations
    tempExplainations[ind]=e.target.value
    setExplainations([...tempExplainations])
  }

  useEffect(() => {
    if (mcqsCnt.length !== 0) {
      const index = mcqsCnt.length - 1;
      document.getElementById(`add-option-type-text-${index}`).value = "off";
      document.getElementById(`add-option-type-image-${index}`).value = "off";
    }
  }, [mcqsCnt]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
      let mcqTemplatesData = await fetchMcqTemplates();
      setMcqTemplates([...mcqTemplatesData]);
    };

    fetcher();

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <div>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />

      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="mcq-temp-editor" />}
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
                setUpdate(false);
                setShowModal(true);
              }}
            >
              <AddIcon />
              <span className="ms-2">create</span>
            </button>
          </div>
          <div className="d-flex row">
            <div className="col fw-bold">
              {`Mcq Templates(${mcqTemplates?.length || 0})`}
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
                <th scope="col">Mcq Template Name</th>
                <th scope="col">View</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            {mcqTemplates && mcqTemplates?.length !== 0 ? (
              mcqTemplates.map((temp, index) => (
                <tbody>
                  <tr>
                    <th scope="col">{index + 1}.</th>
                    <th scope="col">{temp?.paper_name}</th>
                    <th scope="col">
                      <Link to="/view-mcq-template" state={{ templateData: temp }}>
                      view
                      </Link>
                    </th>
                    <th scope="col ">
                      <CreateIcon
                        className="text-primary border border-primary rounded me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {}}
                      />
                      <DeleteIcon
                        className="text-danger border border-danger cursor-pointer rounded"
                        style={{ cursor: "pointer" }}
                        // onClick={() => {console.log("del")}}
                      />
                    </th>
                  </tr>
                </tbody>
              ))
            ) : (
              <>
                <p>no data found</p>
              </>
            )}
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {update ? "Update Templates" : "Add Templates"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-2">
            <div className="mb-2">
              <label className="pb-1">Paper Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Paper Name"
                value={paperName}
                onChange={(e) => {
                  setPaperName(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <div className="d-flex justify-content-between">
                <label className="pb-1">Template Mcqs</label>
                <button
                  className="btn"
                  style={{
                    width: "fit-content",
                    background: "#cfb0cc",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    handleMcqsInputCnt();
                  }}
                >
                  add mcqs <AddIcon />
                </button>
              </div>
              {mcqsCnt.length !== 0 &&
                mcqsCnt.map((data, ind) => (
                  <>
                    <div className="d-flex mt-2">
                      <input
                        type="text"
                        id={`add-question-${ind}`}
                        className="form-control"
                        placeholder="question"
                      />
                    </div>

                    <div className="d-flex mt-2 justify-content-center">
                      options type
                      <div class="ms-4 form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name={`flexRadioDefault-${ind}`}
                          id={`add-option-type-text-${ind}`}
                          onChange={() => {
                            handleSubBtns(`add-option-type-text-${ind}`, ind);
                          }}
                        />
                        <label
                          class="form-check-label"
                          for={`add-option-type-text-${ind}`}
                        >
                          text
                        </label>
                      </div>
                      <div class="ms-2 form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name={`flexRadioDefault-${ind}`}
                          id={`add-option-type-image-${ind}`}
                          onChange={() => {
                            handleSubBtns(`add-option-type-image-${ind}`, ind);
                          }}
                        />
                        <label
                          class="form-check-label"
                          for={`add-option-type-image-${ind}`}
                        >
                          Image
                        </label>
                      </div>
                    </div>

                    {optionsType[ind] == "image" &&
                      [...Array(4)].map((_, index) => (
                        <>
                          <input
                            type="file"
                            id={`add-opt-image-${ind}-${index}`}
                            className="form-control mt-2"
                            placeholder="options images"
                            onChange={(e) => {
                              imageFilesHandler(e, ind, index);
                            }}
                          />
                        </>
                      ))}

                    {optionsType[ind] == "text" &&
                      [...Array(4)].map((_, index) => (
                        <>
                          <input
                            type="text"
                            id={`add-opt-text-${ind}-${index}`}
                            className="form-control mt-2"
                            placeholder="options text"
                            onChange={(e) => {
                              textOptHandler(e, ind, index);
                            }}
                          />
                        </>
                      ))}

                    {optionsType[ind] == "text" && (
                      <div className="d-flex mt-2">
                        <p>answer:</p>
                        <input
                          type="text"
                          id={`add-text-answer-${ind}`}
                          className="form-control ms-2"
                          placeholder="answer"
                        />
                      </div>
                    )}

                    {optionsType[ind] == "image" && (
                      <div className="d-flex mt-2">
                        <p>answer:</p>
                        <input
                          type="file"
                          id={`add-img-answer-${ind}`}
                          className="form-control ms-2"
                          placeholder="answer"
                          onChange={(e) => {
                            answerImageFilesHandler(e, ind);
                          }}
                        />
                      </div>
                    )}

<div className="d-flex mt-2">
<input  placeholder="marks" onChange={(e)=>{
  handleMarks(e,ind)
}} type="number"/>

  </div>
<div className="d-flex mt-2">
<textarea className="w-100" placeholder="explaination" onChange={(e)=>{
  handleExplainations(e,ind)
}} />

  </div>
                  </>
                ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            style={{ background: "red", border: "none" }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCreate();
              // update ? handleUpdate() : handleCreate();
            }}
          >
            {update ? "update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default McqTemplateEditor;
