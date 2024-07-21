const { validateNumber } = require("../../middleware/validates");
const ResponseStatus = require("../../ReponseStatus");
const server = require("./server");

const getStatus = async (req, res) => {

  const rs = await server.getStatusServer(req.params.id);
  return res.json(rs);
};

const getMuiltiStatus =async (req, res) => {
    const rs = await server.getMuiltiStatusServer();
    return res.json(rs);
};

const createStatus =async (req, res) => {
    const {name} =req.body
    const rs = await server.createStatusServer(name);
    return res.json(rs);
};
const updateStatus =async (req, res) => {
    const rs = await server.UpdateStatusServer(req.body);
    return res.json(rs);
};
module.exports = {
  getStatus,
  getMuiltiStatus,
  createStatus,
  updateStatus
};
