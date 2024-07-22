const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getTable= async (req, res) => {

  const rs = await server.getTableServer(req.params.id);
  return res.status(200).json(rs);
};

const getMuiltiTable=async (req, res) => {
    const rs = await server.getMuiltiTableServer();
    return res.status(200).json(rs);
};

const createTable=async (req, res) => {
    const {name,ORstring} =req.body
    const rs = await server.createTableServer(name,ORstring);
    return res.status(200).json(rs);
};
const updateTable=async (req, res) => {
    const rs = await server.UpdateTableServer(req.body);
    return res.status(200).json(rs);
};
const deleteTable=async (req, res) => {
    const rs = await server.deleteTableServer(req.params.id);
    return res.status(200).json(rs);
};
module.exports = {
  getTable,
  getMuiltiTable,
  createTable,
  updateTable,
  deleteTable
};
