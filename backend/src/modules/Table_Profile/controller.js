const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getProfile = async (req, res) => {
    const id = req.params.id;
    const result = await server.getProfileServer(id);
    return res.status(200).json(result);
};
const getAllProfile = async (req, res) => {
 
    const result = await server.getAllProfileServer(req.params.isActive);
    return res.status(200).json(result);
};

const createProfile = async (req, res) => {
    const { account_id, firstname, lastname, phone, address, cccd } = req.body;
    const result = await server.createProfileServer(account_id, firstname, lastname, phone, address, cccd);
    return res.status(200).json(result);
};

const updateProfile = async (req, res) => {
    const {account_id, firstname, lastname, phone, address, cccd } = req.body;
    const result = await server.updateProfileServer(account_id, firstname, lastname, phone, address, cccd);
    return res.status(200).json(result);
}

const deleteProfile = async (req, res) => { 
    const { id } = req.params;
    const result = await server.deleteProfileServer(id);
    return res.status(200).json(result);
};

module.exports = {
    getProfile,
    getAllProfile,
    createProfile,
    updateProfile,
    deleteProfile,
};