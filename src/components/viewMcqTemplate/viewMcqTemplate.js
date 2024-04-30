import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import "./viewMcqTemplate.css";
import dotted from "../../assets/Dotted.png";
import line from "../../assets/Line.png";
import rightPng from "../../assets/Right.png";
import { setRef } from "@mui/material";

function ViewMcqTemplate() {
  const location = useLocation();
  const { templateData } = location.state;
  const [windowWidth, setWindowWidth] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [prevInd, setPrevInd] = useState(null);
  const [explaination, setExplaination] = useState("");
  const [explainationColor, setExplainationColor] = useState("");
  const [marks,setMarks]=useState(0)
  const [showMarks,setShowMarks]=useState(false)
  const [right,setRight]=useState([])

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    console.log(templateData);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);
   !showMarks&& templateData &&
      templateData?.mcqs?.length !== 0 &&
      templateData?.mcqs.forEach((temp, ind) => {
        if (ind === templateData?.mcqs.length - 1) {
          document.getElementById(`dotted-${ind}`).style.display = "none";
          document.getElementById(`line-${ind}`).style.display = "none";
        } else {
          document.getElementById(`dotted-${ind}`).style.display = "flex";
          document.getElementById(`line-${ind}`).style.display = "none";
        }
      });

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const handleSaveAndNext = () => {
    let tempPageNo = pageNumber;

    if (tempPageNo === templateData?.mcqs?.length) {
      setShowMarks(true)
      return;
    }

    document.getElementById(`dotted-${pageNumber - 1}`).style.display = "none";
    document.getElementById(`line-${pageNumber - 1}`).style.display = "flex";
    setPageNumber(tempPageNo + 1);
    setPrevInd(null);
    let tempRight=right

    tempRight[pageNumber-1]="right"
    setRight([...tempRight])
  };

  const handleClickedOption = (type, ind) => {
    if (prevInd !== null) {
      document.getElementById(`${type}-option-${prevInd}`).style.opacity =
        "unset";
    }
    document.getElementById(`${type}-option-${ind}`).style.opacity = 0.2;
    setPrevInd(ind);

    templateData &&
      templateData?.mcqs?.length !== 0 &&
      templateData.mcqs[pageNumber - 1].options.forEach((op, opInd) => {
        if (opInd == ind) {
          if (op === templateData.mcqs[pageNumber - 1].answer) {
            let tempMarks=marks
            tempMarks=marks+templateData.mcqs[pageNumber - 1].mark
            setMarks(tempMarks)
            setExplaination(templateData.mcqs[pageNumber - 1].explaination);
            setExplainationColor("green");
          } else {
            let tempMarks=marks
            tempMarks=marks+0
            setMarks(tempMarks)
            setExplaination(templateData.mcqs[pageNumber - 1].explaination);
            setExplainationColor("red");
          }
        }
      });
  };

  return (
    <>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />

      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="mcq-temp-editor" />}
        <div className="col-md-10  p-4">
{showMarks?<><h1 className="d-flex justify-content-center">Total Marks: {marks}</h1></>:
          <>
          {templateData && <h1 className="">{templateData.paper_name}</h1>}
          {templateData && templateData?.mcqs?.length !== 0 && (
            <div className="d-flex View_mcq_template_pagination_mainWrapper mt-3">
              {templateData?.mcqs?.map((_, ind) => (
                <>
                  {right[ind]!=="right"?<p
                    className={
                      "View_mcq_template_page_no mt-3 " +
                      (ind == 0 ? "ms-2" : "")
                    }
                    id={`page-no-${ind}`}
                  >
                    {ind + 1}
                  </p>:
                  <img className={"View_mcq_template_right mt-3 "+
                  (ind == 0 ? "ms-2" : "")
                } id={`right-${ind}`} src={rightPng} alt="right"/>}
                  <img
                    id={`dotted-${ind}`}
                    alt="dotted"
                    src={dotted}
                    className="h-50 ms-2 me-2 View_mcq_template_line"
                  />
                  <img
                    id={`line-${ind}`}
                    alt="line"
                    src={line}
                    className="h-50 ms-2 me-2 View_mcq_template_line"
                  />
                </>
              ))}
            </div>
          )}
          <h3 className="mt-5 mb-3">
            Qustion {pageNumber} of {templateData.mcqs.length}
          </h3>

          <div className="d-flex justify-content-center View_mcq_template_mcq">
            {templateData &&
              templateData?.mcqs?.length !== 0 &&
              templateData.mcqs.map((mcq, mcqInd) => (
                <>
                  <h5 className="ms-3 mt-2">
                    {mcqInd + 1 == pageNumber ? mcq?.question : ""}
                  </h5>
                  {mcqInd + 1 == pageNumber && (
                    <div class="container mt-5 px-4 mb-3">
                      <div class="row gap-3">
                        {mcq.options.map((op, ind) => (
                          <div class="col-4 border border-dark p-0">
                            {mcq?.options_type === "image" ? (
                              <img
                                className="w-100 h-100"
                                id={`img-option-${ind}`}
                                src={op}
                                alt="op-img"
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleClickedOption("img", ind);
                                }}
                              />
                            ) : (
                              <div
                                className="d-flex justify-content-center"
                                id={`text-option-${ind}`}
                                style={{
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  handleClickedOption("text", ind);
                                }}
                              >
                                {op}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ))}
          </div>
          {explaination && (
            <div
              className="d-flex justify-content-center mt-3"
              style={{ color: `${explainationColor}` }}
            >
              {explaination}
            </div>
          )}
          <div className="d-flex justify-content-center mt-5">
            <button
              className="btn btn-primary rounded"
              onClick={() => {
                handleSaveAndNext();
              }}
            >
              save and next
            </button>
          </div>
          </>}
        </div>
      </div>
    </>
  );
}

export default ViewMcqTemplate;
