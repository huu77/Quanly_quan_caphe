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

module.exports = {
  getStatus,
  getMuiltiStatus,
};
