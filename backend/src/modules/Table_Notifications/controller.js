const { validateNumber } = require("../../middleware/validates");
const server = require("./server");

const getNotifications = async (req, res) => {
    const id = req.params.id;
    const result = await server.getNotificationsServer(id);
    return res.status(200).json(result);
}

const getMuiltiNotifications = async (req, res) => {
    const result = await server.getMuiltiNotificationsServer();
    return res.status(200).json(result);
}

const createNotifications = async (req, res) => {
    const { receiver_id, content, status_id, created_at, updated_at } = req.body;
    const result = await server.createNotificationsServer(receiver_id, content, status_id, created_at, updated_at);
    return res.status(200).json(result);
}

const updateNotifications = async (req, res) => {
    const { id } = req.params;
    const { receiver_id, content, status_id, updated_at } = req.body;
    const result = await server.updateNotificationsServer(id, receiver_id, content, status_id, updated_at);
    return res.status(200).json(result);
}

const deleteNotifications = async (req, res) => {
    const { id } = req.params;
    const result = await server.deleteNotificationsServer(id);
    return res.status(200).json(result);
}

module.exports = {
    getNotifications,
    getMuiltiNotifications,
    createNotifications,
    updateNotifications,
    deleteNotifications
}