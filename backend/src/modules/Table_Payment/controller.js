const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getPayment = async (req, res) => {
    const result = await server.getPayment();
    return res.status(200).json(result);
}

const getPaymentById = async (req, res) => {

    const { id } = req.params;
    const result = await server.getPaymentById(id);
    return res.status(200).json(result);

}

const createPayment = async (req, res) => {
    const { order_id, customer_id, amount, payment_method, status_id, created_at } = req.body;
    const result = await server.createPayment(order_id, customer_id, amount, payment_method, status_id, created_at);
    return res.status(200).json(result);
}

const updatePayment = async (req, res) => {
    const { order_id, customer_id, amount, payment_method, status_id, created_at } = req.body;
    const result = await server.updatePayment(order_id, customer_id, amount, payment_method, status_id, created_at, req.params.id);
    return res.status(200).json(result);
}

const deletePayment = async (req, res) => {
    const { id } = req.params;
    const result = await server.deletePayment(id);
    return res.status(200).json(result);
}

module.exports = {
    getPayment,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
}