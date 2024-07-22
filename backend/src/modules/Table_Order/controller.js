
const server = require("./server");

const getOrder = async (req, res) => {

  const rs = await server.getOrderServer(req.params.id);
  return res.status(200).json(rs);
};
const getOrderOfCustomer = async (req, res) => {

  const rs = await server.getOrderOneCustomerServer(req.params.id);
  return res.status(200).json(rs);
};
const getMuiltiOrder =async (req, res) => {
    const rs = await server.getMuiltiOrderServer();
    return res.status(200).json(rs);
};

const createOrder =async (req, res) => {
    const rs = await server.createOrderServer(req.body);
    return res.status(200).json(rs);
};
const updateOrder =async (req, res) => {
    const rs = await server.UpdateOrderServer(req.body);
    return res.status(200).json(rs);
};
const deleteOrder =async (req, res) => {
    const rs = await server.deleteOrderServer(req.params.id);
    return res.status(200).json(rs);
};
module.exports = {
  getOrder,
  getOrderOfCustomer,
  getMuiltiOrder,
  createOrder,
  updateOrder,
  deleteOrder
};
