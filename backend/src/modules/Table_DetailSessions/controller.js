 
const server = require("./server");

const getDetailsSession = async (req, res) => {

  const rs = await server.getDetailsSessionServer(req.params.id);
  return res.status(200).json(rs);
};

const getMuiltiDetailsSession =async (req, res) => {
    const rs = await server.getMuiltiDetailsSessionServer();
    return res.status(200).json(rs);
};

const createDetailsSession =async (req, res) => {
    const rs = await server.createDetailsSessionServer(req.body);
    return res.status(200).json(rs);
};
const updateDetailsSession =async (req, res) => {
    const rs = await server.UpdateDetailsSessionServer(req.body);
    return res.status(200).json(rs);
};
const deleteDetailsSession =async (req, res) => {
    const rs = await server.deleteDetailsSessionServer(req.params.id);
    return res.status(200).json(rs);
};
module.exports = {
  getDetailsSession,
  getMuiltiDetailsSession,
  createDetailsSession,
  updateDetailsSession,
  deleteDetailsSession
};
