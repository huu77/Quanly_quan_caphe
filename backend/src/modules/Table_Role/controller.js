const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getRole = async (req, res) => {

  const rs = await server.getRoleServer(req.params.id);
  return res.status(200).json(rs);
};

const getMuiltiRole =async (req, res) => {
    const rs = await server.getMuiltiRoleServer();
    return res.status(200).json(rs);
};

const createRole =async (req, res) => {
    const {name} =req.body
    const rs = await server.createRoleServer(name);
    return res.status(200).json(rs);
};
const updateRole =async (req, res) => {
    const rs = await server.UpdateRoleServer(req.body);
    return res.status(200).json(rs);
};
const deleteRole =async (req, res) => {
    const rs = await server.deleteRoleServer(req.params.id);
    return res.status(200).json(rs);
};
module.exports = {
  getRole,
  getMuiltiRole,
  createRole,
  updateRole,
  deleteRole
};
