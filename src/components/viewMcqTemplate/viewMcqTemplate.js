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
import { updateMcqTemplatesAttempts } from "../../api-calls/apicalls";

function ViewMcqTemplate() {
  const location = useLocation();
  const ADMIN_EMAIL="admin@gmail.com" //temporary
  const { templateData } = location.state;
  const [windowWidth, setWindowWidth] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [explaination, setExplaination] = useState("");
  const [explainationColor, setExplainationColor] = useState("");
  const [ans, setAns] = useState([])
  const [showAns, setShowAns] = useState(false)
  const [sign, setSign] = useState([])
  const [answered, setAnswered] = useState(false)
  const[gaIndex,setGaIndex]=useState(1)
  
const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
};

const handleSaveAndNext = async() => {
    
    if (pageNumber === templateData?.mcqs?.length) {
      setShowAns(true)
      return;
    }
   
      let ga=gaIndex
      let tat=""
      templateData?.attempted.forEach((td,ind)=>{
        if (td?.user_email === ADMIN_EMAIL) {
           tat=td
      }})

      // console.log("gaaa",gaIndex)
      if (tat?.given_answers[gaIndex]!=="unattempted") {
       if (templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])] === templateData?.mcqs[ga]?.answer) {
       
      
        const type=templateData?.mcqs[ga]?.options_type=="image"?"img":"text"

        // console.log("hhh",ga)

        document.getElementById(`${type}-option-${parseInt(tat?.given_answers[ga])}`).style.border = "6px solid #D4FFD6";

        templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
          document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
            event.stopPropagation();
          });
        })

      }else if (templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])] !== templateData?.mcqs[ga]?.answer) {

        const type=templateData?.mcqs[ga]?.options_type=="image"?"img":"text"

        document.getElementById(`${type}-option-${parseInt(tat?.given_answers[ga])}`).style.border = "6px solid #FFD4D4";

        templateData.mcqs[pageNumber - 1].options.forEach((op, opInd) => {
          if (op === templateData.mcqs[pageNumber - 1].answer) {
            document.getElementById(`${type}-option-${opInd}`).style.border = "6px solid #D4FFD6";
          }
        })

        templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
          document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
            event.stopPropagation();
          });
        })
      }
       let tempGetIndex=gaIndex;
       setGaIndex(tempGetIndex++)
       setExplaination("")
       setPageNumber(pageNumber + 1);
       document.getElementById("save_next").style.disable=true
       document.getElementById("next").style.disable=false
       return;
      }


    // console.log("ans",ans)
    let tempSign = sign
    let tempAns = ans
    let tempPageNo = pageNumber;

    if (answered == false) {
    
      tempAns[tempPageNo - 1]="unattempted"
      setAns([...tempAns])
    } else if (answered == true) {
      setAnswered(false)
    }

    let dbAns=[]
    tempAns.forEach((t)=>{
      if(t!=="unattempted"){
        dbAns.push(t.toString())
      }else{
        dbAns.push("unattempted")
      }
    })

    // console.log("dbbb",dbAns)
    let updateData={update_attempt:"yes",mcqDocId:templateData?._id,user_email:ADMIN_EMAIL,last_visited_question:pageNumber,given_answers:dbAns}

    await updateMcqTemplatesAttempts(updateData)


    // if (tempPageNo === templateData?.mcqs?.length) {
    //   setShowAns(true)
    //   return;
    // }


    document.getElementById(`dotted-${pageNumber - 1}`).style.display = "none";
    document.getElementById(`line-${pageNumber - 1}`).style.display = "flex";

  

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

const handleNext=async()=>{
    if (pageNumber === templateData?.mcqs?.length) {
      setShowAns(true)
      return;
    }
    

    let ga=gaIndex
    let tat=""
    templateData?.attempted.forEach((td,ind)=>{
      if (td?.user_email === ADMIN_EMAIL) {
         tat=td
    }})

    // console.log("gaaa",gaIndex)

    if (tat?.given_answers[ga]!=="unattempted") {
     if (templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])] === templateData?.mcqs[ga]?.answer) {
     
    
      const type=templateData?.mcqs[ga]?.options_type=="image"?"img":"text"

      // console.log("hhh",ga)

      document.getElementById(`${type}-option-${parseInt(tat?.given_answers[ga])}`).style.border = "6px solid #D4FFD6";

      templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
        document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
          event.stopPropagation();
        });
      })

    }else if (templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])] !== templateData?.mcqs[ga]?.answer) {

      const type=templateData?.mcqs[ga]?.options_type=="image"?"img":"text"

      document.getElementById(`${type}-option-${parseInt(tat?.given_answers[ga])}`).style.border = "6px solid #FFD4D4";

      templateData.mcqs[pageNumber - 1].options.forEach((op, opInd) => {
        if (op === templateData.mcqs[pageNumber - 1].answer) {
          document.getElementById(`${type}-option-${opInd}`).style.border = "6px solid #D4FFD6";
        }
      })

      templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
        document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
          event.stopPropagation();
        });
      })
    }

     let tempGetIndex=gaIndex;
     setGaIndex(tempGetIndex++)
     setExplaination("")

     setPageNumber(pageNumber + 1);

     document.getElementById("save_next").style.disable=true
     document.getElementById("next").style.disable=false

    
    }

   
  }

const handleClickedOption = (type, ind) => {
    // console.log("click",ind)
    templateData &&
      templateData?.mcqs?.length !== 0 &&
      templateData.mcqs[pageNumber - 1].options.forEach((op, opInd) => {
        if (opInd === ind) {
          if (op === templateData.mcqs[pageNumber - 1].answer) {
            // console.log("{correct}",opInd+"---"+ind)
            setExplainationColor("#03A500");

            setAnswered(true)

            let tempAns = ans
            tempAns[pageNumber - 1]=ind
            setAns([...tempAns])

            setExplaination(templateData.mcqs[pageNumber - 1].explaination);

            document.getElementById(`${type}-option-${ind}`).style.border = "6px solid #D4FFD6";

            templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
              document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
                event.stopPropagation();
              });
            })


          } else {
            // console.log("{incorrect}",opInd+"---"+ind)

            setExplainationColor("#03A500");

            setAnswered(true)

            let tempAns = ans
            tempAns[pageNumber - 1]=ind
            setAns([...tempAns])

            setExplaination(templateData.mcqs[pageNumber - 1].explaination);

            document.getElementById(`${type}-option-${ind}`).style.border = "6px solid #FFD4D4";

            templateData.mcqs[pageNumber - 1].options.forEach((op, opInd) => {
              if (op === templateData.mcqs[pageNumber - 1].answer) {
                document.getElementById(`${type}-option-${opInd}`).style.border = "6px solid #D4FFD6";
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

useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);

      !showAns &&
      templateData && 
      Array.isArray(templateData?.attempted)&&
      templateData?.attempted?.length !== 0 &&
      templateData?.attempted.forEach((tat,_)=>{
        if (tat?.user_email === ADMIN_EMAIL) {

          //change lines as previous response which has been answered
          for (let i = 0; i < tat?.last_visited_question; i++) {
            if (i === templateData?.mcqs.length - 1) {
              document.getElementById(`dotted-${i}`).style.display = "none";
              document.getElementById(`line-${i}`).style.display = "none";
            } else {
              document.getElementById(`dotted-${i}`).style.display = "none";
              document.getElementById(`line-${i}`).style.display = "flex";
            }
          }

          // console.log("hhh",gaIndex)


          //change  first question if it has been answered
          for (let ga = 0; ga <=0; ga++) {
           if (tat?.given_answers[ga]!=="unattempted"&&templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])] === templateData?.mcqs[ga]?.answer) {
             
              const type=templateData?.mcqs[ga]?.options_type=="image"?"img":"text"

              document.getElementById(`${type}-option-${parseInt(tat?.given_answers[ga])}`).style.border = "6px solid #D4FFD6";

              templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
                document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
                  event.stopPropagation();
                });
              })

              document.getElementById("save_next").disabled=true
              document.getElementById("next").disabled=false
             
            }else if (tat?.given_answers[ga]!=="unattempted"&&templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])] !== templateData?.mcqs[ga]?.answer) {

              const type=templateData?.mcqs[ga]?.options_type=="image"?"img":"text"

              // console.log("yyy",tat?.given_answers[ga])

              document.getElementById(`${type}-option-${parseInt(tat?.given_answers[ga])}`).style.border = "6px solid #FFD4D4";

              templateData.mcqs[pageNumber - 1].options.forEach((op, opInd) => {
                if (op === templateData.mcqs[pageNumber - 1].answer) {
                  document.getElementById(`${type}-option-${opInd}`).style.border = "6px solid #D4FFD6";
                }
              })
  
              templateData.mcqs[pageNumber - 1].options.forEach((_, opInd) => {
                document.getElementById(`${type}-option-${opInd}`).addEventListener("click", function (event) {
                  event.stopPropagation();
                });
              })
             
              document.getElementById("save_next").disabled=true
              document.getElementById("next").disabled=false
            }else{
              setGaIndex(0)
            }
          }

          //change signs as previous response which has been answered
          for (let ga = 0; ga <tat?.given_answers?.length; ga++) {
            // console.log("ccc",templateData?.mcqs[ga]?.answer)
            // console.log("ccc2",templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])])

            if (tat?.given_answers[ga] == "unattempted") {
              let tempSign = sign
              tempSign[ga] = "unsigned"
              setSign([...tempSign])
            }else if (templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])] === templateData?.mcqs[ga]?.answer) {
             
            
             

              let tempSign = sign
              tempSign[ga] = "right"
              setSign([...tempSign])
            }else if (templateData?.mcqs[ga]?.options[parseInt(tat?.given_answers[ga])] !== templateData?.mcqs[ga]?.answer) {

            
              let tempSign = sign
              tempSign[ga] = "wrong"
              setSign([...tempSign])
            }
       
          }

          //change lines which has not been response
          for (let ind = parseInt(tat?.last_visited_question); ind < templateData?.mcqs?.length; ind++) {
            if (ind === templateData?.mcqs.length - 1) {
              document.getElementById(`dotted-${ind}`).style.display = "none";
              document.getElementById(`line-${ind}`).style.display = "none";
            } else {
              document.getElementById(`dotted-${ind}`).style.display = "flex";
              document.getElementById(`line-${ind}`).style.display = "none";

             
            }
          }

          //change signs  which has not been answered
          for (let ind = parseInt(tat?.last_visited_question); ind < templateData?.mcqs?.length; ind++) {
              let tempSign = sign
              tempSign[ind] = "unsigned"
              setSign([...tempSign])
            
          }
        
        }
      })




     

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
}, []);

  return (
    <>
      <Nav />
      <hr style={{ color: "black", margin: "0" }} />
      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="mcq-temp-editor" />}
        <div className="col-md-10  p-4">
          {showAns ?
            <>
              {/* <button className="btn" onClick={()=>{window.location.reload()}}>Back Only For Admin</button> */}
              {templateData.mcqs.map((mcq, index) => (
                <div className="d-flex justify-content-start View_mcq_template_mcq mt-3">
                  <h5 className="ms-3 mt-3" style={{ whiteSpace: "nowrap" }}>{mcq?.question}</h5>
                  {ans[index] === "unattempted" ? <p className="View_mcq_template_not_attemted">Not Attempted</p> :
                    (
                      <div class="View_mcq_template_options_super_main row gap-3 ms-3 mb-3 " >
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
                        <img className={"View_mcq_template_right mt-2 mb-2 " +
                          (ind === 0 ? "ms-3" : "")
                        } id={`right-${ind}`} src={rightPng} alt="right" />}
                      {sign[ind] === "wrong" &&
                        <img className={"View_mcq_template_right mt-2 mb-2 " +
                          (ind === 0 ? "ms-3" : "")
                        } id={`wrong-${ind}`} src={wrongPng} alt="wrong" />}
                      {sign[ind] === "unsigned" &&
                        <p
                          className={
                            "View_mcq_template_page_no mt-2 mb-2 " +
                            (ind === 0 ? "ms-3" : "")
                          }
                          id={`page-no-${ind}`}
                        >
                          {ind + 1}
                        </p>}
                      <img
                        id={`dotted-${ind}`}
                        alt="dotted"
                        src={dotted}
                        className="h-50 ms-2 me-2 mt-4"
                      />
                      <img
                        id={`line-${ind}`}
                        alt="line"
                        src={line}
                        className="h-50 ms-2 me-2 mt-4"
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
                  id="save_next"
                  className="btn btn-primary rounded"
                  onClick={() => {
                    handleSaveAndNext();
                  }}
                >
                  save and next
                </button>
                <button
                id="next"
                  className="btn btn-primary rounded ms-5"
                 
                  onClick={() => {
                    handleNext();
                  }}
                >
                  only next
                </button>
              </div>
            </>}
        </div>
      </div>
    </>
  );
}

export default ViewMcqTemplate;
