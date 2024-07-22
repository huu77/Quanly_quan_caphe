const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getTableDetail = async (req, res) => {
    const response = await server.getTableDetail();
    res.status(200).json(response);
};

const getTableDetailById = async (req, res) => {
    const response = await server.getTableDetailById(req.params.id);
    res.status(200).json(response);
}

const createTableDetail = async (req, res) => {
    const response = await server.createTableDetail(req.body.table_id, req.body.table_status_id, req.body.start_time, req.body.end_time, req.body.customer_id, req.body.note);
    res.status(200).json(response);
}

const updateTableDetail = async (req, res) => {
    const response = await server.updateTableDetail(req.body.table_id, req.body.table_status_id, req.body.start_time, req.body.end_time, req.body.customer_id, req.body.note, req.params.id);
    res.status(200).json(response);
}

const deleteTableDetail = async (req, res) => {
    const response = await server.deleteTableDetail(req.params.id);
    res.status(200).json(response);
}

module.exports = {
    getTableDetail,
    getTableDetailById,
    createTableDetail,
    updateTableDetail,
    deleteTableDetail,
};
