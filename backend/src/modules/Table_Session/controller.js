 
const server = require("./server");

const getSession = async (req, res) => {

  const rs = await server.getSessionServer(req.params.id);
  return res.status(200).json(rs);
};

const getMuiltiSession =async (req, res) => {
    const rs = await server.getMuiltiSessionServer();
    return res.status(200).json(rs);
};

const createSession =async (req, res) => {
    const {start_time,end_time} =req.body
    const rs = await server.createSessionServer(start_time,end_time);
    return res.status(200).json(rs);
};
const updateSession =async (req, res) => {
    const rs = await server.UpdateSessionServer(req.body);
    return res.status(200).json(rs);
};
const deleteSession =async (req, res) => {
    const rs = await server.deleteSessionServer(req.params.id);
    return res.status(200).json(rs);
};
module.exports = {
  getSession,
  getMuiltiSession,
  createSession,
  updateSession,
  deleteSession
};
