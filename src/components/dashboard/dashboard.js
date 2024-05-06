
import React from 'react';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';


function Dashboard() {
  const [windowWidth, setWindowWidth] = useState();
  const [noOfUser, setNoOfUser] = useState(0)
  const [noOfActiveUser, setNoOfActiveUser] = useState(0)
  const [noOfExam, setNoOfExam] = useState(0)
  const [totalInvoice, setTotalInvoice] = useState(0)
  const [notices, setNotices] = useState(["notice1", "notice2", "notice3"])

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


  return (
    <div>
      <Nav />
      <hr style={{ color: "black", margin: '0' }} />
      <div className="row">
        {windowWidth > 768 && <Sidebar activeOption="dashboard" />}
        <div className="col-md-10 p-4" style={{ background: "#F0F0F6" }}>
          <div className="d-flex row">
            <div className="col fw-bold">
              Dashboard
            </div>
          </div>
          <div className='mt-5 d-flex justify-content-between' style={{ marginLeft: '5%', marginRight: "5%" }}>

            <div className='d-inline-flex flex-column  p-2' style={{
              borderRadius: '16px',
              background: '#FFF',

              boxShadow: ' 0px 0px 10px 0px rgba(0, 0, 0, 0.10)'
            }}>
              <h3>No of user</h3>
              <hr />
              <p className='d-flex justify-content-center fw-bold'>{noOfUser}</p>
            </div>
            <div className='d-inline-flex flex-column p-2' style={{
              borderRadius: '16px',
              background: '#FFF',


              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.10)'
            }}>
              <h3>No of active user</h3>
              <hr />
              <p className='d-flex justify-content-center fw-bold'>{noOfActiveUser}</p>
            </div>
            <div className='d-inline-flex flex-column  p-2' style={{
              borderRadius: '16px',
              background: '#FFF',
              boxShadow: ' 0px 0px 10px 0px rgba(0, 0, 0, 0.10)'
            }}
            >
              <h3>No of exam</h3>
              <hr />
              <p className='d-flex justify-content-center fw-bold'>{noOfExam}</p>
            </div>
          </div>
          <div className='d-flex justify-content-between' style={{ marginTop: "15%", marginLeft: '5%', marginRight: "5%" }}>

            <div className='d-inline-flex flex-column  p-2 ' style={{
              borderRadius: '16px',
              background: '#FFF',

              boxShadow: ' 0px 0px 10px 0px rgba(0, 0, 0, 0.10)', width: "40%", height: '60%'
            }}>
              <h3 className='d-flex justify-content-center'>Total Invoice Send</h3>
              <hr />
              <p className='d-flex justify-content-center fw-bold'>{totalInvoice}</p>
            </div>
            <div className='d-inline-flex flex-column p-2 w-30' style={{
              borderRadius: '16px',
              background: '#FFF',

              boxShadow: ' 0px 0px 10px 0px rgba(0, 0, 0, 0.10)', width: "40%", height: "100%"
            }}>
              <h3 className='d-flex justify-content-center'>Notice Board</h3>
              <hr />
              {
                notices.map((notice) => (
                  <p className='row d-flex justify-content-center'>{notice}</p>
                ))
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard