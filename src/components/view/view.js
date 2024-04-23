import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import banner from "../../assets/banner.png"
import "./view.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';


function View() {
    const [allPdfs,setAllPdfs]=useState([])
    const [windowWidth, setWindowWidth] = useState();
    const location = useLocation();
    const { templateData } = location.state;

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.min.js");
        console.log(templateData)
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", updateWindowWidth);
        const fetcher=async()=>{
            let tempPdfsData = [];
            try {
              const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/pdf`
              );
              tempPdfsData = response.data;
              console.log("pdf only",tempPdfsData)
            } catch (error) {
              console.log("err", error);
            } finally {
             setAllPdfs([...tempPdfsData])
            }
        }
        fetcher()


        return () => {
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
     
            <div
                style={{
                    width: '100%',
                    backgroundImage: `url(${banner})`
                }}>
                <div className='d-flex justify-content-center View_exam_name_main'>
                    <div className='View_exam_name_text'>
                        {templateData?.template_name}
                    </div>
                </div>

                <div className='d-flex justify-content-center View_exam_desc_main'>
                    <div className='d-flex justify-content-center View_exam_desc_text'>
                        {templateData?.template_desc}
                    </div>
                </div>
            </div>


            <div>
                <h1>pdfs</h1>
                {
                    templateData.pdfs.pdfs.map((pdf) => (
                        <div className='mt-3 d-flex'>
                            {pdf?.file_name}
                            <Link className='ms-2' to="/pdfDetails" >
                                details
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
        </div>



        </>
    )
}

export default View