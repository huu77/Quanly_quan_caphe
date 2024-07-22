const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();

const getAccountServer = async (id) => {
    const sql = "SELECT * FROM Account WHERE id = ?";

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

const getMuiltiAccountServer = async () => {
    const sql = "SELECT * FROM Account";
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

const createAccountServer = async (username, password, role_id) => {
    if (!username || typeof username !== "string" || !username.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid username provided.",
        });
    }
    if (!password || typeof password !== "string" || !password.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid password provided.",
        });
    }
    if (!role_id || typeof role_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid role_id provided.",
        });
    }
    const sql = "INSERT INTO Account (username, password, role_id) VALUES (?, ?, ?)";

    try {
        const [result] = await pool.query(sql, [username, password, role_id]);

        if (result.affectedRows === 0) {
            return ResponseStatus.createResponse(500, {
                message: "Failed to create Account.",
            });
        }

        return ResponseStatus.createResponse(201, {
            message: "Account created successfully.",
        });
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const updateAccountServer = async (id, username, password, role_id) => {
    if (!username || typeof username !== "string" || !username.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid username provided.",
        });
    }
    if (!password || typeof password !== "string" || !password.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid password provided.",
        });
    }
    if (!role_id || typeof role_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid role_id provided.",
        });
    }
    const sql = "UPDATE Account SET username = ?, password = ?, role_id = ? WHERE id = ?";

    try {
        const [result] = await pool.query(sql, [username, password, role_id, id]);

        if (result.affectedRows === 0) {
            return ResponseStatus.createResponse(500, {
                message: "Failed to update Account.",
            });
        }

        return ResponseStatus.createResponse(200, {
            message: "Account updated successfully.",
        });
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const deleteAccountServer = async (id) => {
    const sql = "DELETE FROM Account WHERE id = ?";

    try {
        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows === 0) {
            return ResponseStatus.createResponse(404, {
                message: "Account not found.",
            });
        }

        return ResponseStatus.createResponse(200, {
            message: "Account deleted successfully.",
        });
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const loginAccountServer = async (username, password) => {  
    const sql = "SELECT * FROM Account WHERE username = ? AND password = ?";

    try {
        const [results] = await pool.query(sql, [username, password]);

        if (results.length === 0) {
            return ResponseStatus.createResponse(404, {message: "Account not found."});
        }

        return ResponseStatus.createResponse(200, results[0]);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
}

module.exports = {
    getAccountServer,
    getMuiltiAccountServer,
    createAccountServer,
    updateAccountServer,
    deleteAccountServer,
    loginAccountServer
};