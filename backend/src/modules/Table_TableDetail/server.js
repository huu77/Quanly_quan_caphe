const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();

// CREATE TABLE TableDetail (
//     id INT AUTO_INCREMENT  PRIMARY KEY,
//     table_id INT NOT NULL,
//     table_status_id INT NOT NULL,
//     start_time DATETIME NOT NULL,
//     end_time DATETIME NOT NULL,
//     customer_id INT NOT NULL,
//     note VARCHAR(200),
//     created_at DATETIME NOT NULL,
//     updated_at DATETIME NOT NULL,
//     FOREIGN KEY (table_id) REFERENCES RestaurantTable(id),
//     FOREIGN KEY (table_status_id) REFERENCES TableStatus(id),
//     FOREIGN KEY (customer_id) REFERENCES Customer(id)
// );

const getTableDetail = async () => {
    try {
        const [results] = await pool.execute("SELECT * FROM TableDetail");

        if (results && results.length === 0) {
            return ResponseStatus.createResponse(404, null);
        }
        return ResponseStatus.createResponse(200, results);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const getTableDetailById = async (id) => {
    try {
        const [results] = await pool.execute("SELECT * FROM TableDetail WHERE id = ?", [id]);
        if (results && results.length === 0) {
            return ResponseStatus.createResponse(404, null);
        }
        return ResponseStatus.createResponse(200, results[0]);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const createTableDetail = async (table_id, table_status_id, start_time, end_time, customer_id, note) => {
    if (!table_id || typeof table_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid table_id provided.",
        });
    }
    if (!table_status_id || typeof table_status_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid table_status_id provided.",
        });
    }
    if (!(start_time instanceof Date) || isNaN(start_time.getTime())) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid start_time provided.",
        });
    }
    
    if (!(end_time instanceof Date) || isNaN(end_time.getTime())) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid end_time provided.",
        });
    }
    
    if (!customer_id || typeof customer_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid customer_id provided.",
        });
    }
    if (!note || typeof note !== "string" || !note.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid note provided.",
        });
    }
    const created_at = new Date().now();

    try {
        const [result] = await pool.execute("INSERT INTO TableDetail (table_id, table_status_id, end_time, customer_id, note, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [table_id, table_status_id, start_time, end_time, customer_id, note, created_at, created_at]);
        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const updateTableDetail = async (id, table_id, table_status_id, start_time, end_time, customer_id, note) => {
    if (!id || typeof id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid id provided.",
        });
    }
    if (!table_id || typeof table_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid table_id provided.",
        });
    }
    if (!table_status_id || typeof table_status_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid table_status_id provided.",
        });
    }
    if (!(start_time instanceof Date) || isNaN(start_time.getTime())) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid start_time provided.",
        });
    }
    if (!(end_time instanceof Date) || isNaN(end_time.getTime())) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid end_time provided.",
        });
    }
    if (!customer_id || typeof customer_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid customer_id provided.",
        });
    }
    if (!note || typeof note !== "string" || !note.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid note provided.",
        });
    }
    const updated_at = new Date().now();
    try {
        const [result] = await pool.execute("UPDATE TableDetail SET table_id = ?, table_status_id = ?, start_time = ?, end_time = ?, customer_id = ?, note = ?, updated_at = ? WHERE id = ?", [table_id, table_status_id, start_time, end_time, customer_id, note, updated_at, id]);
        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const deleteTableDetail = async (id) => {
    if (!id || typeof id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid id provided.",
        });
    }
    try {
        const [result] = await pool.execute("DELETE FROM TableDetail WHERE id = ?", [id]);
        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};  

module.exports = {
    getTableDetail,
    getTableDetailById,
    createTableDetail,
    updateTableDetail,
    deleteTableDetail,
};