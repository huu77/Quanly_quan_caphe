const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getCategory = async (req, res) => {

  const rs = await server.getCategoryServer(req.params.id);
  return res.status(200).json(rs);
};

const getMuiltiCategory =async (req, res) => {
    const rs = await server.getMuiltiCategoryServer();
    return res.status(200).json(rs);
};

const createCategory =async (req, res) => {
    const {name} =req.body
    const rs = await server.createCategoryServer(name);
    return res.status(200).json(rs);
};
const updateCategory =async (req, res) => {
    const rs = await server.UpdateCategoryServer(req.body);
    return res.status(200).json(rs);
};
const deleteCategory =async (req, res) => {
    const rs = await server.deleteCategoryServer(req.params.id);
    return res.status(200).json(rs);
};
module.exports = {
  getCategory,
  getMuiltiCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
