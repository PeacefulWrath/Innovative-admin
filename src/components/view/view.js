import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import banner from "../../assets/banner.png"
import "./view.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { fetchAllPdfs,fetchAllZips } from '../../api-calls/apicalls';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';

function View() {
    const [allPdfs,setAllPdfs]=useState([])
    const [allZips,setAllZips]=useState([])
    const [windowWidth, setWindowWidth] = useState();
    const location = useLocation();
    const { templateData } = location.state;

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleDownloadZip=(templateZipId,clickedZip)=>{
        const tempFilteredPdfsFromAllZips=allZips.filter((all)=> {return all._id===templateZipId})
        tempFilteredPdfsFromAllZips[0].zips.forEach((zip)=>{
         if(zip.file_name===clickedZip.file_name){
            saveAs(zip?.url,`${zip?.file_name}`)
         }
        })
    }

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.min.js");
        console.log("tdd",templateData)
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", updateWindowWidth);
        const pdfsFetcher=async()=>{
            let tempPdfsData = await fetchAllPdfs();
            
            if(tempPdfsData){
             setAllPdfs([...tempPdfsData])
            }
        }
        const zipsFetcher=async()=>{
            let tempZipsData = await fetchAllZips();
            
            if(tempZipsData){
             setAllZips([...tempZipsData])
            }
        }
        zipsFetcher()
        pdfsFetcher()


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
                <h1>Pdfs</h1>
                {templateData && templateData.template_pdfs.pdfs?
                    templateData.template_pdfs.pdfs.map((pdf) => (
                        <div className='mt-3 d-flex'>
                            {pdf?.file_name}
                             <p className='ms-3'>watermark: { pdf?.watermark===true?"on":"off"}</p>
                             <p className='ms-3'>top left logo: { pdf?.top_left_logo===true?"on":"off"}</p>
                             <p className='ms-3'>bottom right page no: { pdf?.bottom_right_page_no===true?"on":"off"}</p>
                             <p className='ms-3'>pdf downloadable: { pdf?.pdf_downloadable===true?"on":"off"}</p>
                            <Link className='ms-3' to="/pdfDetails"  state={{allPdfs:allPdfs, templatePdfId:templateData.template_pdfs._id, clickedPdf:pdf  }} >
                                details
                            </Link>
                        </div>
                    )):<></>
                }
            </div>

            <div className='mt-4'>
                <h1>Zips</h1>
                {templateData && templateData.template_zips.zips ?
                    templateData.template_zips.zips.map((zip) => (
                        <div className='mt-3 d-flex'>
                            {zip?.file_name}
                             <p className='ms-3'>zip downloadable: { zip?.zip_downloadable===true?"on":"off"}</p>
                             <DownloadIcon className='ms-3' onClick={()=>{handleDownloadZip(templateData.template_zips._id,zip)}} />
                        </div>
                    )):<></>
                }
            </div>

            <div className='mt-4'>
                <h1>Links</h1>
                {templateData && templateData.template_links.links ?
                    templateData.template_links.links.map((link) => (
                        <div className='mt-3 d-flex'>
                           {link?.link_preview_name}
                            <a className='ms-3' style={{cursor:"pointer "}} href={`${link?.link_url}`}> {link?.link_url}</a>
                        </div>
                    )):<></>
                }
            </div>
        </div>
        </div>



        </>
    )
}

export default View