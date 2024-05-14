
import React from "react";
import { useEffect, useState,useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Nav from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Button } from "react-bootstrap";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductManagement() {
    const [windowWidth, setWindowWidth] = useState();
    const [productName, setProductName] = useState("");
    const [productCategories, setProductCategories] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productImage, setProductImage] = useState("");
    const [realPrice, setRealPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [star, setStar] = useState("");
    const [update, setUpdate] = useState(false)
    const [showCreate, setShowCreate] = useState(false);
    const [showProductDropdown, setShowProductDropdown] = useState(false);

    const productInputRef = useRef(null);
  
    const handleInputClick = () => {
        setShowProductDropdown(!showProductDropdown);
    };
  
    const handleOutsideClick = (e) => {
      if (productInputRef.current && !productInputRef.current.contains(e.target)) {
        setShowProductDropdown(false);
      }
    };
  
    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleClose = () => {
        setShowCreate(false);

    };

    const handleCreate = async () => {

    }

    const handleUpdate = async () => {

    }

    useEffect(() => {

        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", updateWindowWidth);
        const fetcher = async () => {

        };

        fetcher();
        document.addEventListener('mousedown', handleOutsideClick);
        
        return () => {
            window.removeEventListener("resize", updateWindowWidth);
            document.removeEventListener('mousedown', handleOutsideClick);        };
    }, []);

    return (
        <div>
            <Nav />
            <hr style={{ color: "black", margin: "0" }} />

            <div className="row">
                {windowWidth > 768 && <Sidebar activeOption="product-management" />}
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
                            <span className="ms-2">create products</span>
                        </button>
                    </div>


                    <table className="table mt-1 p-4 w-70 text-center">
                        <thead>
                            <tr className="table-primary table-striped">
                                <th scope="col">SN.</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        {



                        }
                    </table>


                </div>
            </div>


            <Modal show={showCreate} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {update ? "Update Product" : "Add Product"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="product-name"
                            >
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="product-name "
                                value={productName}
                                className="form-control"
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
                        <label
                                class="form-label"
                                for="product-category"
                            >
                                Product Category
                            </label>
                            <input
                                type="text"
                                id="product-category"
                                value={productCategory}
                                className="form-control"
                                onChange={(e) => {
                                    setProductCategory(e.target.value)
                                }}
                            />
                        </div>

                        <div className="form-group mt-4">
                        <label
                                class="form-label"
                                for="product"
                            >
                                select product
                            </label>
                            <div className="dropdown" ref={productInputRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Select Product"
                                    onClick={handleInputClick}
                                    readOnly
                                />
                                {showProductDropdown && (
                                    <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="product-image"
                            >
                                Product Image
                            </label>
                            <input
                                type="file"
                                id="product-image"
                                value={productImage}
                                className="form-control"
                                onChange={(e) => {
                                    setProductImage(e.target.files[0])
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="real_price"
                            >
                                Real Price
                            </label>
                            <input
                                type="number"
                                id="real_price"
                                value={realPrice}
                                className="form-control"
                                onChange={(e) => {
                                    setRealPrice(e.target.value)
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
                            <label
                                class="form-label"
                                for="discounted_price"
                            >
                                Discounted Price
                            </label>
                            <input
                                type="number"
                                id="discounted_price"
                                value={discountedPrice}
                                className="form-control"
                                onChange={(e) => {
                                    setDiscountedPrice(e.target.value)
                                }}
                            />

                        </div>

                        <div className="form-group mt-4">
                        <label
                                class="form-label"
                                for="product-star"
                            >
                                Product Star
                            </label>
                            <input
                                type="text"
                                id="product-star"
                                value={star}
                                className="form-control"
                                onChange={(e) => {
                                    setStar(e.target.value)
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

export default ProductManagement