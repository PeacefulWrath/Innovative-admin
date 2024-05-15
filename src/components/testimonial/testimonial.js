
import React from "react";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchTestimonials, createTestimonials, updateTestimonials, deleteTestimonials} from "../../api-calls/apicalls";

function TestimonialManagement() {
    const [windowWidth, setWindowWidth] = useState();
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [dbImage, setDbImage] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [profession, setProfession] = useState("");
    const [update, setUpdate] = useState(false)
    const [showCreate, setShowCreate] = useState(false);
    const [testimonialId, setTestimonialId] = useState("")
    const[testimonials,setTestimonials]= useState([])

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleClose = () => {
        setShowCreate(false);

    };

    const handleCreate = async () => {
        const addData = new FormData()
        addData.append("name", name)
        addData.append("user_name", userName)
        addData.append("description", description)
        addData.append("profession", profession)
        addData.append("testimonial", image)

        const createdData = await createTestimonials(addData)
        if (createdData.success==="yes") {
            alert("testimonial created")
            handleClose()
            window.location.reload()
        }
    }

    const handleUpdate = async () => {
        const updateData = new FormData()
        updateData.append("testimonial_id",testimonialId)
        updateData.append("name", name)
        updateData.append("user_name", userName)
        updateData.append("description", description)
        updateData.append("profession", profession)
        updateData.append("testimonial", image)

        const updatedData = await updateTestimonials(updateData)
        if (updatedData.success==="yes") {
            alert("testimonial updated")
            handleClose()
            window.location.reload()
        }
    }

    const handleDelete = async (id) => {
        const deleteData = { testimonial_id: id }
        const deletedData = await deleteTestimonials(deleteData)
        if (deletedData.success==="yes") {
          
          alert("testimonial deleted successfully")
          window.location.reload()
        }
      }

    useEffect(() => {

        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", updateWindowWidth);
        const fetcher = async () => {
           
            let testimonials = await fetchTestimonials();
           
            setTestimonials([...testimonials]);

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
                {windowWidth > 768 && <Sidebar activeOption="testimonial-management" />}
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
                                setUpdate(false)
                                setShowCreate(true)
                            }}
                        >
                            <AddIcon />
                            <span className="ms-2">create testimonial</span>
                        </button>
                    </div>


                    <table className="table mt-1 p-4 w-70 text-center">
                        <thead>
                            <tr className="table-primary table-striped">
                                <th scope="col">SN.</th>
                                <th scope="col"> Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {(testimonials && testimonials?.length !== 0 )? (
                            testimonials.map((tm, index) => (
                                <tbody>
                                    <tr>
                                        <th scope="col">{index + 1}.</th>
                                        <th scope="col"> {tm?.name}</th>

                                        <th scope="col ">
                                            <CreateIcon
                                                className="text-primary border border-primary rounded me-2"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setUpdate(true);
                                                    setTestimonialId(tm?._id)
                                                    setName(tm?.name)
                                                    setUserName(tm?.user_name)
                                                    setDbImage(tm?.image)
                                                    setDescription(tm?.description)
                                                    setProfession(tm?.profession)
                                                    setShowCreate(true);
                                                }}
                                            />
                                            <DeleteIcon
                                                className="text-danger border border-danger cursor-pointer rounded"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    handleDelete(tm?._id)
                                                }}
                                            />
                                        </th>
                                    </tr>
                                </tbody>
                            ))
                        ) : (
                            <>
                                <p>loading...</p>
                            </>
                        )}
                    </table>


                </div>
            </div>


            <Modal show={showCreate} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {update ? "Update Testimonial" : "Add Testimonial"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="name"
                            >
                                 Name
                            </label>
                            <input
                                type="text"
                                id="name "
                                value={name}
                                className="form-control"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="user-name"
                            >
                                User Name
                            </label>
                            <input
                                type="text"
                                id="user-name "
                                value={userName}
                                className="form-control"
                                onChange={(e) => {
                                    setUserName(e.target.value)
                                }}
                            />

                        </div>

                       

                        {
                            dbImage && (
                                <div className="form-group mt-4">
                                    <label
                                        class="form-label"
                                        for="db-testimonial-image"
                                    >
                                        Attached Testimonial Image
                                    </label>
                                    <img

                                        alt="db-testimonial-image"
                                        className="form-control"
                                        src={dbImage}
                                    />

                                </div>
                            )
                        }

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="image"
                            >
                                {update ? "Change  Image" : " Image"}
                            </label>
                            <input
                                type="file"
                                id="image"
                                className="form-control"
                                onChange={(e) => {
                                    setImage(e.target.files[0])
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="description"
                            >
                               description
                            </label>
                            <input
                                type="number"
                                id="description"
                                value={description}
                                className="form-control"
                                onChange={(e) => {
                                  
                                    setDescription(e.target.value)
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="discounted_price"
                            >
                                Profession
                            </label>
                            <input
                                type="text"
                                id="profession"
                                value={profession}
                                className="form-control"
                                onChange={(e) => {
                                    
                                    setProfession(e.target.value)
                                }}
                            />

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

                            { update ? handleUpdate() : handleCreate() }
                        }}
                    >
                        {update ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>





        </div>
    )
}

export default TestimonialManagement