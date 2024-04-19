;
import React from 'react';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Nav from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';





function UserManagement() {
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
    },[])


  return (
    <>
    <Nav />
    <hr style={{color:"black",    margin:'0'}}/>
    <div className="row">
      {windowWidth > 768 && <Sidebar activeOption="user-management" />}
      <div className="col-md-10 p-4">
        <div className="d-flex row">
          <div className="col fw-bold">
            Users(1)
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
          <tbody>
            
                <tr >
                  <th scope="col">1.</th>
                  <th scope="col"> name</th>
                  
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
        </table>
      </div>
    </div>
  </>
  )
}

export default UserManagement