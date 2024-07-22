const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();

// CREATE TABLE Notifications (
//     id INT AUTO_INCREMENT  PRIMARY KEY,
//     receiver_id INT NOT NULL,
//     content VARCHAR(200) NOT NULL,
//     status_id INT NOT NULL,
//     created_at DATETIME NOT NULL,
//     updated_at DATETIME NOT NULL,
//     FOREIGN KEY (receiver_id) REFERENCES Profile(id),
//     FOREIGN KEY (status_id) REFERENCES Status(id)
// );

const getNotificationsServer = async (id) => {
    const sql = "SELECT * FROM Notifications WHERE id = ?";

    try {
        const [results] = await pool.query(sql, [id]);

        if (results && results.length === 0) {
            return ResponseStatus.createResponse(404, null);
        }

        return ResponseStatus.createResponse(200, results[0]);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const getMuiltiNotificationsServer = async () => {
    const sql = "SELECT * FROM Notifications";
    try {
        const [results] = await pool.query(sql);

        if (results.length === 0) {
            return ResponseStatus.createResponse(404, null);
        }

        return ResponseStatus.createResponse(200, results);
    } catch (error) {
        console.error("Database query error:", error);
        return ResponseStatus.createResponse(500, error.message);
    }
};

const createNotificationsServer = async (receiver_id, content, status_id, created_at, updated_at) => {
    if (!receiver_id || typeof receiver_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid receiver_id provided.",
        });
    }
    if (!content || typeof content !== "string" || !content.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid content provided.",
        });
    }
    if (!status_id || typeof status_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid status_id provided.",
        });
    }
  
    if (!updated_at || typeof updated_at !== "string" || !updated_at.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid updated_at provided.",
        });
    }
    const sql = "INSERT INTO Notifications (receiver_id, content, status_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";

    try {
        const [result] = await pool.query(sql, [receiver_id, content, status_id, created_at, updated_at]);

        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const updateNotificationsServer = async (id, receiver_id, content, status_id, updated_at) => {
    if (!id || typeof id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid id provided.",
        });
    }
    if (!receiver_id || typeof receiver_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid receiver_id provided.",
        });
    }
    if (!content || typeof content !== "string" || !content.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid content provided.",
        });
    }
    if (!status_id || typeof status_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid status_id provided.",
        });
    }
    if (!updated_at || typeof updated_at !== "string" || !updated_at.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid updated_at provided.",
        });
    }
    const sql = "UPDATE Notifications SET receiver_id = ?, content = ?, status_id = ?, updated_at = ? WHERE id = ?";

    try {
        const [result] = await pool.query(sql, [receiver_id, content, status_id, updated_at, id]);

        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const deleteNotificationsServer = async (id) => {
    if (!id || typeof id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid id provided.",
        });
    }
    const sql = "DELETE FROM Notifications WHERE id = ?";

    try {
        const [result] = await pool.query(sql, [id]);

        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

module.exports = {
    getNotificationsServer,
    getMuiltiNotificationsServer,
    createNotificationsServer,
    updateNotificationsServer,
    deleteNotificationsServer
};