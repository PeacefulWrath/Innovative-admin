import React,{useState} from 'react';
// import useState from 'react';
import './navbar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../sidebar/sidebar';
import logo from "../../assets/logo.png"
import { Modal, Button } from "react-bootstrap";


const Nav = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const[showAccountDetails,setShowAccountDetails]=useState(false)

  // const activeMenu=()=>{
  //   setOpenMenu(true)
  // }

  // const closeMenu=()=>{
  //   setOpenMenu(false)
  // }

  const handleClose = () => {
    setShowAccountDetails(false);
  };

  return (
    <div>
      <nav id='navLargeScreenBar' className="navbar navbar-expand-lg bg-black headernavbar" >
        <div className="container-fluid">
          <a className="navbar-brand" href="/dashboard"><img alt="logo" src={logo} width={75} height={75}/></a>
          <AccountCircleIcon  className='account_icon' style={{zoom:1.4}} onClick={setShowAccountDetails}/>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
          </div> */}
        </div>
      </nav>

      <nav id='navMobileBar' className="navbar navbar-expand-lg headernavbar bg-primary" >
        <div className="container-fluid">
          <MenuIcon onClick={()=>setOpenMenu(true)}/>
          <a className="navbar-brand" href="/dashboard"><img alt="logo" src={logo} width={65} height={65} /></a>
          <AccountCircleIcon/>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
          </div> */}
        </div>
      </nav>

      <Modal show={showAccountDetails} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
             Account Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-2">
          {/* <div className="mb-2">
              <label className="pb-1">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div> */}
            
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
               
            }}
          >
             update
          </Button>
        </Modal.Footer>
      </Modal>

      {openMenu==true && (
         <div className='menuContainer'>
         <div className="menuContainerLeft">
           <div className="row">
             <Sidebar/>
           </div>
         </div>
         <div className="menuContainerRight" onClick={()=>setOpenMenu(false)}>

         </div>
     </div>
      )}

    </div>
  )
}

export default Nav