import axios from "axios";
const token=localStorage.getItem("token")


export const fetchTemplates = async () => {
    let templatesData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/template`
        );
        templatesData = response.data;
        // console.log(templatesData)
    } catch (error) {
        console.log("err", error);
    } finally {
        return templatesData;
    }
}

export const createTemplates = async (addData) => {
    let tempTemplates = [];
    try {
        console.log("template data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/template`,
                    data: addData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempTemplates = res.data;
            });
    } catch (error) {
        console.log("can not create templates");
    } finally {
        return tempTemplates;
    }
};

export const updateTemplates = async (updateData) => {
    let tempTemplates = [];
    try {
        console.log("template data", updateData);

        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/template`,
                    data: updateData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempTemplates = res.data;
            });
    } catch (error) {
        console.log("can not create templates");
    } finally {
        return tempTemplates;
    }
};

export const deleteTemplates = async (deleteData) => {
    let tempTemplates = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/template`,
                    data: deleteData

                })
            .then((res) => {
                tempTemplates = res.data;
            });
    } catch (error) {
        console.log("can not create templates");
    } finally {
        return tempTemplates;
    }
};

export const fetchMcqTemplates = async () => {
    let templatesData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/mcq-template`
        );
        templatesData = response.data;
        // console.log(templatesData)
    } catch (error) {
        console.log("err", error);
    } finally {
        return templatesData;
    }
}

export const createMcqTemplates = async (addData) => {
    let tempTemplates = [];
    try {
        console.log("template data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/mcq-template`,
                    data: addData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempTemplates = res.data;
            });
    } catch (error) {
        console.log("can not create templates");
    } finally {
        return tempTemplates;
    }
};

export const updateMcqTemplates = async (updateData) => {
    let tempTemplates = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/mcq-template`,
                    data: updateData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempTemplates = res.data;
            });
    } catch (error) {
        console.log("can not create templates");
    } finally {
        return tempTemplates;
    }
};

export const updateMcqTemplatesAttempts = async (updateData) => {
    let tempTemplates = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/mcq-template`,
                    data: updateData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempTemplates = res.data;
            });
    } catch (error) {
        console.log("can not create templates");
    } finally {
        return tempTemplates;
    }
};

export const deleteMcqTemplates = async (deleteData) => {
    let tempMcqTemplates = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/mcq-template`,
                    data: deleteData

                })
            .then((res) => {
                tempMcqTemplates = res.data;
            });
    } catch (error) {
        console.log("can not delete mcq templates");
    } finally {
        return tempMcqTemplates;
    }
};

export const createInvoices = async (addData) => {
    let tempInvoices = [];
    try {
        console.log("invoice data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/invoice`,
                    data: addData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempInvoices = res.data;
            });
    } catch (error) {
        console.log("can not create templates");
    } finally {
        return tempInvoices;
    }
};

export const fetchInvoices = async () => {
    let invoicesData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/invoice`
        );
        invoicesData = response.data;
        // console.log(templatesData)
    } catch (error) {
        console.log("err", error);
    } finally {
        return invoicesData;
    }
}

export const updateInvoices = async (updateData) => {
    let invoicesData = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/invoice`,
                    data: updateData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                invoicesData = res.data;
            });
    } catch (error) {
        console.log("can not update invoices");
    } finally {
        return invoicesData;
    }
};

export const deleteInvoices = async (deleteData) => {
    let tempInvoice = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/invoice`,
                    data: deleteData

                })
            .then((res) => {
                tempInvoice = res.data;
            });
    } catch (error) {
        console.log("can not delete invoice");
    } finally {
        return tempInvoice;
    }
};

export const fetchUsers = async () => {
    let usersData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/user`
        );
        usersData = response.data.allUserData;
    } catch (error) {
        console.log("err", error);
    } finally {
        return usersData;
    }
}

export const createUsers = async (userData) => {
    let tempUsers = [];
    try {
        // console.log("userData", userData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/user/signup`,
                    data: userData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempUsers = res.data;
            });
    } catch (error) {
        console.log("can not save users");
    } finally {
        return tempUsers;
    }
};

export const updateUsers = async (userData) => {
    let tempUsers = [];
    try {
        // console.log("userData", userData);

        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/user/`,
                    data: userData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempUsers = res.data;
            });
    } catch (error) {
        console.log("can not update users");
    } finally {
        return tempUsers;
    }
};

export const deleteUsers = async (deleteData) => {
    let tempUser = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/user`,
                    data: deleteData

                })
            .then((res) => {
                tempUser = res.data;
            });
    } catch (error) {
        console.log("can not delete user");
    } finally {
        return tempUser;
    }
};

export const createPurchaseOrders = async (addData) => {
    let tempPurchaseOrders = [];
    try {
        console.log("po data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/purchase-order`,
                    data: addData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempPurchaseOrders = res.data;
            });
    } catch (error) {
        console.log("can not create purchase order");
    } finally {
        return tempPurchaseOrders;
    }
};

export const fetchPurchaseOrders = async () => {
    let tempPurchaseOrders = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/purchase-order`
        );
        tempPurchaseOrders = response.data;
    } catch (error) {
        console.log("err", error);
    } finally {
        return tempPurchaseOrders;
    }
}

export const updatePurchaseOrders = async (updateData) => {
    let poData = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/purchase-order`,
                    data: updateData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                poData = res.data;
            });
    } catch (error) {
        console.log("can not update purchase orders");
    } finally {
        return poData;
    }
};

export const deletePurchaseOrders = async (deleteData) => {
    let tempPurchaseOrders = [];
    try {
        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/purchase-order`,
                    data: deleteData

                })
            .then((res) => {
                tempPurchaseOrders = res.data;
            });
    } catch (error) {
        console.log("can not delete purchase orders");
    } finally {
        return tempPurchaseOrders;
    }
};

export const createQuizTemplates = async (addData) => {
    let tempTemplates = [];
    try {
        // console.log("template data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/quiz-template`,
                    data: addData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempTemplates = res.data;
            });
    } catch (error) {
        console.log("can not create templates");
    } finally {
        return tempTemplates;
    }
};

export const updateQuizTemplates = async (updateData) => {
    let tempQuizTemplates = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/quiz-template`,
                    data: updateData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempQuizTemplates = res.data;
            });
    } catch (error) {
        console.log("can not create templates");
    } finally {
        return tempQuizTemplates;
    }
};

export const deleteQuizTemplates = async (deleteData) => {
    let tempQuizTemplates = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/quiz-template`,
                    data: deleteData

                })
            .then((res) => {
                tempQuizTemplates = res.data;
            });
    } catch (error) {
        console.log("can not delete quiz templates");
    } finally {
        return tempQuizTemplates;
    }
};

export const fetchQuizTemplates = async () => {
    let templatesData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/quiz-template`
        );
        templatesData = response.data;
        // console.log(templatesData)
    } catch (error) {
        console.log("err", error);
    } finally {
        return templatesData;
    }
}

export const createFaqs = async (faqData) => {
    let tempFaq = [];
    try {
        // console.log("userData", userData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/faq`,
                    data: faqData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempFaq = res.data;
            });
    } catch (error) {
        console.log("can not save faqs");
    } finally {
        return tempFaq;
    }
};

export const fetchFaqs = async () => {
    let faqsData = [];
    // console.log("fetch faq")
    try {
        const response = await axios({
            method:"get",
            url:`${process.env.REACT_APP_BASE_URL}/api/faq`,
            headers:{
            authorization: `Bearer ${token}`
            }
    });
        faqsData = response.data.allFaqData;
    } catch (error) {
        console.log("err", error);
        faqsData =error?.response?.data
    } finally {
        return faqsData;
    }
}

export const updateFaqs = async (faqData) => {
    let tempFaq = [];
    try {
        // console.log("userData", userData);

        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/faq/`,
                    data: faqData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempFaq = res.data;
            });
    } catch (error) {
        console.log("can not update faq");
    } finally {
        return tempFaq;
    }
};

export const deleteFaqs = async (deleteData) => {
    let tempFaq = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/faq`,
                    data: deleteData

                })
            .then((res) => {
                tempFaq = res.data;
            });
    } catch (error) {
        console.log("can not delete faq");
    } finally {
        return tempFaq;
    }
};

export const createGallery = async (addData) => {
    let tempGallery = [];
    try {
        // console.log("template data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/gallery`,
                    data: addData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempGallery = res.data;
            });
    } catch (error) {
        console.log("can not create gallery");
    } finally {
        return tempGallery;
    }
};

export const fetchGalleries = async () => {
    let galleriesData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/gallery`
        );
        galleriesData = response.data.allGalleryData;
    } catch (error) {
        console.log("err", error);
    } finally {
        return galleriesData;
    }
}

export const updateGallery = async (updateData) => {
    let tempGalleries = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/gallery`,
                    data: updateData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempGalleries = res.data;
            });
    } catch (error) {
        console.log("can not update galleries");
    } finally {
        return tempGalleries;
    }
};

export const deleteGallery = async (deleteData) => {
    let tempGallery = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/gallery`,
                    data: deleteData

                })
            .then((res) => {
                tempGallery = res.data;
            });
    } catch (error) {
        console.log("can not delete gallery");
    } finally {
        return tempGallery;
    }
};

export const createCategories = async (addData) => {
    let tempCategory = [];
    try {
        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/category`,
                    data: addData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempCategory = res.data;
            });
    } catch (error) {
        console.log("can not create category");
    } finally {
        return tempCategory;
    }
};

export const fetchCategories = async () => {
    let categoriesData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/category`
        );
        categoriesData = response.data.allCategoryData;
    } catch (error) {
        console.log("err", error);
    } finally {
        return categoriesData;
    }
}

export const updateCategories = async (updateData) => {
    let tempCats = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/category`,
                    data: updateData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempCats = res.data;
            });
    } catch (error) {
        console.log("can not update categories");
    } finally {
        return tempCats;
    }
};

export const deleteCategories = async (deleteData) => {
    let tempCat = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/category`,
                    data: deleteData

                })
            .then((res) => {
                tempCat = res.data;
            });
    } catch (error) {
        console.log("can not delete category");
    } finally {
        return tempCat;
    }
};

export const createProducts = async (addData) => {
    let tempProducts = [];
    try {
        // console.log("template data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/product`,
                    data: addData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempProducts = res.data;
            });
    } catch (error) {
        console.log("can not create product");
    } finally {
        return tempProducts;
    }
};

export const fetchProducts = async () => {
    let productsData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/product`
        );
        productsData = response.data.fetchedData;
    } catch (error) {
        console.log("err", error);
    } finally {
        return productsData;
    }
}

export const updateProducts = async (updateData) => {
    let tempProds = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/product`,
                    data: updateData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempProds = res.data;
            });
    } catch (error) {
        console.log("can not update products");
    } finally {
        return tempProds;
    }
};

export const deleteProducts = async (deleteData) => {
    let tempProd = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/product`,
                    data: deleteData

                })
            .then((res) => {
                tempProd = res.data;
            });
    } catch (error) {
        console.log("can not delete product");
    } finally {
        return tempProd;
    }
};

export const createTrainingModules = async (addData) => {
    let tempModules = [];
    try {
        // console.log("template data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/training-module`,
                    data: addData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempModules = res.data;
            });
    } catch (error) {
        console.log("can not create training modules");
    } finally {
        return tempModules;
    }
};

export const fetchTrainingModules = async () => {
    let moduleData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/training-module`
        );
        moduleData = response.data.fetchedData;
    } catch (error) {
        console.log("err", error);
    } finally {
        return moduleData;
    }
}

export const updateTrainingModules = async (updateData) => {
    let tempModules = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/training-module`,
                    data: updateData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempModules = res.data;
            });
    } catch (error) {
        console.log("can not update training modules");
    } finally {
        return tempModules;
    }
};

export const deleteTrainingModules = async (deleteData) => {
    let tempModules = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/training-module`,
                    data: deleteData

                })
            .then((res) => {
                tempModules = res.data;
            });
    } catch (error) {
        console.log("can not delete training modules");
    } finally {
        return tempModules;
    }
};

export const createCus = async (faqData) => {
    let tempCus = [];
    try {
        // console.log("userData", userData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/choose-us`,
                    data: faqData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempCus = res.data;
            });
    } catch (error) {
        console.log("can not save cus");
    } finally {
        return tempCus;
    }
};

export const fetchCus = async () => {
    let cusData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/choose-us`
        );
        cusData = response.data.allCusData;
    } catch (error) {
        console.log("err", error);
    } finally {
        return cusData;
    }
}

export const updateCus = async (faqData) => {
    let tempCus = [];
    try {
        // console.log("userData", userData);

        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/choose-us`,
                    data: faqData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempCus = res.data;
            });
    } catch (error) {
        console.log("can not update cus");
    } finally {
        return tempCus;
    }
};

export const deleteCus = async (deleteData) => {
    let tempCus = [];
    try {
        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/choose-us`,
                    data: deleteData

                })
            .then((res) => {
                tempCus = res.data;
            });
    } catch (error) {
        console.log("can not delete cus");
    } finally {
        return tempCus;
    }
};

export const createTestimonials = async (addData) => {
    let tempMons = [];
    try {
        // console.log("template data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/testimonial`,
                    data: addData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempMons = res.data;
            });
    } catch (error) {
        console.log("can not create testimonials");
    } finally {
        return tempMons;
    }
};

export const fetchTestimonials = async () => {
    let testimonialData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/testimonial`
        );
        testimonialData = response.data.fetchedData;
    } catch (error) {
        console.log("err", error);
    } finally {
        return testimonialData;
    }
}

export const updateTestimonials = async (updateData) => {
    let tempMons = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/testimonial`,
                    data: updateData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempMons = res.data;
            });
    } catch (error) {
        console.log("can not update testimonials");
    } finally {
        return tempMons;
    }
};

export const deleteTestimonials = async (deleteData) => {
    let tempMons = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/testimonial`,
                    data: deleteData

                })
            .then((res) => {
                tempMons = res.data;
            });
    } catch (error) {
        console.log("can not delete testimonial");
    } finally {
        return tempMons;
    }
};

export const createServices = async (addData) => {
    let tempServices = [];
    try {
        // console.log("template data", addData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/service`,
                    data: addData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempServices = res.data;
            });
    } catch (error) {
        console.log("can not create service");
    } finally {
        return tempServices;
    }
};

export const fetchServices = async () => {
    let serviceData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/service`
        );
        serviceData = response.data.fetchedData;
    } catch (error) {
        console.log("err", error);
    } finally {
        return serviceData;
    }
}

export const updateServices = async (updateData) => {
    let serviceData = [];
    try {


        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/service`,
                    data: updateData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                serviceData = res.data;
            });
    } catch (error) {
        console.log("can not update services");
    } finally {
        return serviceData;
    }
};

export const deleteServices = async (deleteData) => {
    let serviceData = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/service`,
                    data: deleteData

                })
            .then((res) => {
                serviceData = res.data;
            });
    } catch (error) {
        console.log("can not delete services");
    } finally {
        return serviceData;
    }
};

export const createPartners = async (partnerData) => {
    let tempPartner = [];
    try {
        // console.log("userData", userData);

        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/partner`,
                    data: partnerData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempPartner = res.data;
            });
    } catch (error) {
        console.log("can not save partner");
    } finally {
        return tempPartner;
    }
};

export const fetchPartners = async () => {
    let partnersData = [];
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/partner`
        );
        partnersData = response.data.allPartnerData;
    } catch (error) {
        console.log("err", error);
    } finally {
        return partnersData;
    }
}

export const updatePartners = async (faqData) => {
    let tempPartner = [];
    try {
        // console.log("userData", userData);

        await axios
            (
                {
                    method: "put",
                    url: `${process.env.REACT_APP_BASE_URL}/api/partner/`,
                    data: faqData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
            .then((res) => {
                tempPartner = res.data;
            });
    } catch (error) {
        console.log("can not update partner");
    } finally {
        return tempPartner;
    }
};

export const deletePartners = async (deleteData) => {
    let tempPartner = [];
    try {


        await axios
            (
                {
                    method: "delete",
                    url: `${process.env.REACT_APP_BASE_URL}/api/partner`,
                    data: deleteData

                })
            .then((res) => {
                tempPartner = res.data;
            });
    } catch (error) {
        console.log("can not delete partner");
    } finally {
        return tempPartner;
    }
};

export const logIn = async (userData) => {
    let tempUsers = [];
    try {
        console.log("userData", userData);
        await axios
            (
                {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/api/user/signin`,
                    data: userData,
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
            .then((res) => {
                tempUsers = res.data;
            });
    } catch (error) {
        tempUsers=error?.response?.data
    } finally {
        return tempUsers;
    }
};