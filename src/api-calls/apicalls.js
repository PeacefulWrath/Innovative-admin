import axios from "axios";

export const fetchTemplates=async()=>{
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

export const fetchMcqTemplates=async()=>{
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

export const fetchInvoices=async()=>{
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
