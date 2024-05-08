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
import wrongPng from "../../assets/Wrong.png";

function ViewMcqTemplate() {
  const location = useLocation();
  const { templateData } = location.state;
  const [windowWidth, setWindowWidth] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [explaination, setExplaination] = useState("");
  const [explainationColor, setExplainationColor] = useState("");
  const [ans, setAns] = useState([])
  const [showAns, setShowAns] = useState(false)
  const [sign, setSign] = useState([])
  const [answered, setAnswered] = useState(false)

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);
    !showAns &&
      templateData &&
      templateData?.mcqs?.length !== 0 &&
      templateData?.mcqs.forEach((temp, ind) => {
        if (ind === templateData?.mcqs.length - 1) {
          document.getElementById(`dotted-${ind}`).style.display = "none";
          document.getElementById(`line-${ind}`).style.display = "none";
        } else {
          document.getElementById(`dotted-${ind}`).style.display = "flex";
          document.getElementById(`line-${ind}`).style.display = "none";
        }
        let tempSign=sign
        tempSign[ind]="unsigned"
        setSign([...tempSign])
      });

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const handleSaveAndNext = () => {
    let tempPageNo = pageNumber;
    if (answered == false) {
      let tempAns = ans
      tempAns.push("unattempted")
      setAns([...tempAns])
    } else if (answered == true) {
      setAnswered(false)
    }

    if (tempPageNo === templateData?.mcqs?.length) {
      setShowAns(true)
      return;
    }


    document.getElementById(`dotted-${pageNumber - 1}`).style.display = "none";
    document.getElementById(`line-${pageNumber - 1}`).style.display = "flex";

    let tempSign = sign


    templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
      if (ans[pageNumber - 1] === "unattempted") {
        tempSign[pageNumber - 1] = "unsigned"
        setSign([...tempSign])
      } else if (templateData.mcqs[pageNumber - 1].answer === templateData.mcqs[pageNumber - 1].options[ans[pageNumber - 1]]) {
        tempSign[pageNumber - 1] = "right"
        setSign([...tempSign])

      } else if (templateData.mcqs[pageNumber - 1].answer !== templateData.mcqs[pageNumber - 1].options[ans[pageNumber - 1]]) {
        tempSign[pageNumber - 1] = "wrong"
        setSign([...tempSign])

      }
    })

    setExplaination("")
    setPageNumber(tempPageNo + 1);
  };

  const handleClickedOption = (type, ind) => {
    templateData &&
      templateData?.mcqs?.length !== 0 &&
      templateData.mcqs[pageNumber - 1].options.forEach((op, opInd) => {
        if (opInd === ind) {
          if (op === templateData.mcqs[pageNumber - 1].answer) {
            setExplainationColor("#03A500");

            setAnswered(true)

            let tempAns = ans
            tempAns.push(ind)
            setAns([...tempAns])

            setExplaination(templateData.mcqs[pageNumber - 1].explaination);

            document.getElementById(`${type}-option-${ind}`).style.border = "2px solid #D4FFD6";

            templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
              document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
                event.stopPropagation();
              });
            })


          } else {
            setExplainationColor("#03A500");

            setAnswered(true)

            let tempAns = ans
            tempAns.push(ind)
            setAns([...tempAns])

            setExplaination(templateData.mcqs[pageNumber - 1].explaination);

            document.getElementById(`${type}-option-${ind}`).style.border = "2px solid #FFD4D4";

            templateData.mcqs[pageNumber - 1].options.forEach((op, opInd) => {
              if (op === templateData.mcqs[pageNumber - 1].answer) {
                document.getElementById(`${type}-option-${opInd}`).style.border = "2px solid #D4FFD6";
              }
            })

            templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
              document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
                event.stopPropagation();
              });
            })

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
          {showAns ?
            <>
              {templateData.mcqs.map((mcq, index) => (
                <div className="d-flex justify-content-start View_mcq_template_mcq mt-3">
                  <h5 className="ms-3 mt-3">{mcq?.question}</h5>
                  {ans[index] === "unattempted" ? <p className="mt-5">not attempted</p> :
                    (
                      <div class="row gap-3 mt-5 ms-3 mb-3" >
                        {mcq.options.map((op, ind) => (

                          <div class="View_mcq_template_options_main border border-secondary p-0">
                            {mcq?.options_type === "image" ? (
                              <>
                                <img
                                  className="View_mcq_template_options_img"
                                  id={`img-option-${ind}`}
                                  src={op}
                                  alt="op-img"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                />
                                {mcq.answer === op ? <p className="View_mcq_template_correct_answer">correct answer</p> : ""}
                                {ans[index] === ind && mcq.answer != op ? <p className="View_mcq_template_incorrect_answer">incorrect answer</p> : ""}
                              </>

                            ) : (
                              <>
                                <div
                                  className="View_mcq_template_options_text"
                                  id={`text-option-${ind}`}
                                  style={{
                                    cursor: "pointer"
                                  }}
                                >
                                  {op}
                                </div>
                                {mcq.answer === op ? <p className="View_mcq_template_correct_answer">correct answer</p> : ""}
                                {ans[index] === ind && mcq.answer != op ? <p className="View_mcq_template_incorrect_answer">incorrect answer</p> : ""}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </> :
            <>
              {templateData && <h1 className="">{templateData.paper_name}</h1>}
              {templateData && templateData?.mcqs?.length !== 0 && (
                <div className="d-flex View_mcq_template_pagination_mainWrapper mt-3">
                  {templateData?.mcqs?.map((_, ind) => (
                    <>
                      {sign[ind] === "right" &&
                        <img className={"View_mcq_template_right mt-3 " +
                          (ind === 0 ? "ms-2" : "")
                        } id={`right-${ind}`} src={rightPng} alt="right" />}


                      {sign[ind] === "wrong" &&
                        <img className={"View_mcq_template_right mt-3 " +
                          (ind === 0 ? "ms-2" : "")
                        } id={`wrong-${ind}`} src={wrongPng} alt="wrong" />}


                      {sign[ind] === "unsigned" &&
                        <p
                          className={
                            "View_mcq_template_page_no mt-3 " +
                            (ind === 0 ? "ms-2" : "")
                          }
                          id={`page-no-${ind}`}
                        >
                          {ind + 1}
                        </p>}




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

              <div className="d-flex justify-content-start View_mcq_template_mcq">
                {templateData &&
                  templateData?.mcqs?.length !== 0 &&
                  templateData.mcqs.map((mcq, mcqInd) => (
                    <>
                      {mcqInd + 1 === pageNumber && (
                        <div class="d-inline-flex flex-column mt-3 px-4 mb-3">
                          <h5 className="ms-3 mt-1" style={{ whiteSpace: "nowrap" }}>
                            {mcqInd + 1 === pageNumber ? mcq?.question : ""}
                          </h5>
                          <div class="row gap-3 mt-5 ms-3 mb-3" >
                            {mcq.options.map((op, ind) => (
                              <div class=" View_mcq_template_options_main border border-secondary p-0">
                                {mcq?.options_type === "image" ? (

                                  <img
                                    className="View_mcq_template_options_img"
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
                                    className="View_mcq_template_options_text"
                                    id={`text-option-${ind}`}
                                    style={{
                                      cursor: "pointer"
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
