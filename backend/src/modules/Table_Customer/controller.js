const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getCustomer = async (req, res) => {
    const id = req.params.id;
    const result = await server.getCustomerServer(id);
    return res.status(200).json(result);
}

const getMuiltiCustomer = async (req, res) => {
    const result = await server.getMuiltiCustomerServer();
    return res.status(200).json(result);
}
const getAllCustomer = async (req, res) => {
    const result = await server.getAllCustomerServer();
    return res.status(200).json(result);
}
const createCustomer = async (req, res) => {
    const { name, phoneNumber } = req.body;
    const result = await server.createCustomerServer(name, phoneNumber);
    return res.status(200).json(result.data);
}

const updateCustomer = async (req, res) => {
    const {name, phoneNumber } = req.body;
    const result = await server.updateCustomerServer(name, phoneNumber);
    return res.status(200).json(result.data);
}

const deleteCustomer = async (req, res) => { 
    const { id } = req.params;
    const result = await server.deleteCustomerServer(id);
    return res.status(200).json(result.data);
};

const checkCustomerExists = async (req, res) => {
    const {phoneNumber} = req.params;
    const result = await server.checkCustomerExists(phoneNumber);
    return res.status(200).json(result);
}
module.exports = {
    getCustomer,
    getMuiltiCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomer, 
    checkCustomerExists
};