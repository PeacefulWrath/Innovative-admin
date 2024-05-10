import axios from "axios";

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