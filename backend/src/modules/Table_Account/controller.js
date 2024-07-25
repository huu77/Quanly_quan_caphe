const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getAccount = async (req, res) => {
    const id = req.params.id;
    const result = await server.getAccountServer(id);
    return res.status(200).json(result);
};

const getMuiltiAccount = async (req, res) => {
    const result = await server.getMuiltiAccountServer();
    return res.status(200).json(result);
};

const createAccount = async (req, res) => {
    const { username, password, role_id,firstname, lastname, phone, address, cccd } = req.body;
    const result = await server.createAccountServer(req.body);
    return res.status(200).json(result);
};

const updateAccount = async (req, res) => {
    const { id } = req.params;
    const { username, password, role_id } = req.body;
    const result = await server.updateAccountServer(id, username, password, role_id);
    return res.status(200).json(result);
};

const deleteAccount = async (req, res) => {
    const { id } = req.params;
    const result = await server.deleteAccountServer(id);
    return res.status(200).json(result);
};
const UpdateIsActive = async (req, res) => {
    const { id } = req.params;
    const result = await server.UpdateIsActiveServer(id);
    return res.status(200).json(result);
};
const login = async (req, res) => {
    const { username, password } = req.body;
    const result = await server.loginAccountServer(username, password);
    return res.status(200).json(result);
};

const refreshtoken =  async (req, res) => {
    const { refreshToken } = req.body;
    const result = await server.refreshtokenServer(refreshToken);
    return res.status(200).json(result);
};

module.exports = {
    getAccount,
    getMuiltiAccount,
    createAccount,
    updateAccount,
    deleteAccount,
    login,
    UpdateIsActive,
    refreshtoken
};