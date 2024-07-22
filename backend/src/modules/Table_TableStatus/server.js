const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();

// CREATE TABLE TableStatus (
//     id INT AUTO_INCREMENT  PRIMARY KEY,
//     name VARCHAR(30) NOT NULL
// );

const getTableStatus = async (req, res) => {
    try {
        const [results] = await pool.execute("SELECT * FROM TableStatus");

        if (results && results.length === 0) {
            return ResponseStatus.createResponse(404, null);
        }
        return ResponseStatus.createResponse(200, results);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const getTableStatusById = async (id) => {
    try {
        const [results] = await pool.execute("SELECT * FROM TableStatus WHERE id = ?", [id]);
        if (results && results.length === 0) {
            return ResponseStatus.createResponse(404, null);
        }
        return ResponseStatus.createResponse(200, results[0]);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const createTableStatus = async (name) => {
    if (!name || typeof name !== "string" || !name.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid name provided.",
        });
    }
    try {
        const [result]  = await pool.execute("INSERT INTO TableStatus (name) VALUES (?)", [name]);
        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const updateTableStatus = async (id, name) => {
    // if (!id || typeof id !== "number") {
    //     return ResponseStatus.createResponse(400, {
    //         message: "Invalid id provided.",
    //     });
    // }
    if (!name || typeof name !== "string" || !name.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid name provided.",
        });
    }
    try {
        const [result] = await pool.execute("UPDATE TableStatus SET name = ? WHERE id = ?", [name, id]);
        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const deleteTableStatus = async (id) => {
    // if (!id || typeof id !== "number") {
    //     return ResponseStatus.createResponse(400, {
    //         message: "Invalid id provided.",
    //     });
    // }
    try {
        const [result]= await pool.execute("DELETE FROM TableStatus WHERE id = ?", [id]);
        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
}

module.exports = {
    getTableStatus,
    createTableStatus,
    updateTableStatus,
    deleteTableStatus,
    getTableStatusById
};

