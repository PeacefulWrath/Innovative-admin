import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import banner from "../../assets/banner.png"
import "./view.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';

function View() {
    const [windowWidth, setWindowWidth] = useState();
    const location = useLocation();
    const { templateData } = location.state;

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleDownloadZip=(clickedZip)=>{
      templateData?.template_zips?.forEach((zip)=>{
        if(zip._id===clickedZip._id){
            saveAs(zip?.url,`${zip?.file_name}`)
         }
      })
    }

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.min.js");
        // console.log("tdd",templateData)
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", updateWindowWidth);
        

     

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


            <div className='mt-4'>
                <h3>Pdfs</h3>
                {templateData && templateData?.template_pdfs?.length!==0 ?
                    templateData.template_pdfs.map((pdf) => (
                        <div className='mt-3 d-flex'>
                            {pdf?.file_name}
                             <p className='ms-3'>watermark: { pdf?.watermark===true?"on":"off"}</p>
                             <p className='ms-3'>top left logo: { pdf?.top_left_logo===true?"on":"off"}</p>
                             <p className='ms-3'>bottom right page no: { pdf?.bottom_right_page_no===true?"on":"off"}</p>
                             <p className='ms-3'>pdf downloadable: { pdf?.pdf_downloadable===true?"on":"off"}</p>
                            <Link className='ms-3' to="/pdfDetails"  state={{template:templateData, clickedPdf:pdf  }} >
                                details
                            </Link>
                        </div>
                    )):<>no data</>
                }
            </div>

            <div className='mt-4'>
                <h3>Zips</h3>
                {templateData && templateData?.template_zips?.length!==0 ?
                    templateData.template_zips.map((zip) => (
                        <div className='mt-3 d-flex'>
                            {zip?.file_name}
                             <p className='ms-3'>zip downloadable: { zip?.zip_downloadable===true?"on":"off"}</p>
                             <DownloadIcon className='ms-3' style={{cursor:"pointer"}}onClick={()=>{handleDownloadZip(zip)}} />
                        </div>
                    )):<><p>no data</p> </>
                }
            </div>

            <div className='mt-4'>
                <h3>Links</h3>
                {templateData && templateData?.template_links?.length!==0 ?
                    templateData.template_links.map((link) => (
                        <div className='mt-3 d-flex'>
                           {link?.link_preview_name}
                            <a className='ms-3' style={{cursor:"pointer "}} href={`${link?.link_url}`}> {link?.link_url}</a>
                        </div>
                    )):<><p>no data</p></>
                }
            </div>
        </div>
        </div>



        </>
    )
}

export default View