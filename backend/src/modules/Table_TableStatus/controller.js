const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getTableStatus = async (req, res) => {
    const result = await server.getTableStatus();
    return res.status(200).json(result);
}

const getTableStatusById = async (req, res) => {

    const {id }= req.params;
    const result = await server.getTableStatusById(id);
    return res.status(200).json(result);

}

const createTableStatus = async (req, res) => {
    const {name} = req.body;
    const result = await server.createTableStatus(name);
    return res.status(200).json(result);
}

const updateTableStatus = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await server.updateTableStatus(id, name);
    return res.status(200).json(result);

}

const deleteTableStatus = async (req, res) => {

    const {id} = req.params;
    const result  = await server.deleteTableStatus(id);
    return res.status(200).json(result);
}

module.exports = {
    getTableStatus,
    getTableStatusById,
    createTableStatus,
    updateTableStatus,
    deleteTableStatus
}