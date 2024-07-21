const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getStatus = async (req, res) => {

  const rs = await server.getStatusServer(req.params.id);
  return res.status(200).json(rs);
};

const getMuiltiStatus =async (req, res) => {
    const rs = await server.getMuiltiStatusServer();
    return res.status(200).json(rs);
};

const createStatus =async (req, res) => {
    const {name} =req.body
    const rs = await server.createStatusServer(name);
    return res.status(200).json(rs);
};
const updateStatus =async (req, res) => {
    const rs = await server.UpdateStatusServer(req.body);
    return res.status(200).json(rs);
};
const deleteStatus =async (req, res) => {
    const rs = await server.deleteStatusServer(req.params.id);
    return res.status(200).json(rs);
};
module.exports = {
  getStatus,
  getMuiltiStatus,
  createStatus,
  updateStatus,
  deleteStatus
};
