

const server = require("./server");
 
const getProduct = async (req, res) => {

  const rs = await server.getProductServer(req.params.id);
  return res.status(200).json(rs);
};

const getMuiltiProduct =async (req, res) => {
    const rs = await server.getMuiltiProductServer();
    return res.status(200).json(rs);
};

const createProduct =async (req, res) => {
  const { name, description, price,image, category_id } = req.body;
  const rs = await server.createProductServer(name, description, price,image, category_id);
    return res.status(200).json(rs);
};
const updateProduct =async (req, res) => {
    const rs = await server.UpdateProductServer(req.body);
    return res.status(200).json(rs);
};
const deleteProduct =async (req, res) => {
    const rs = await server.deleteProductServer(req.params.id);
    return res.status(200).json(rs);
};
module.exports = {
  getProduct,
  getMuiltiProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
