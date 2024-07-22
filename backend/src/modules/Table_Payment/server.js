const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();

// CREATE TABLE Payment (
//     id INT AUTO_INCREMENT  PRIMARY KEY,
//     order_id INT NOT NULL,
//     customer_id INT NOT NULL,
//     amount INT NOT NULL,
//     payment_method VARCHAR(200) NOT NULL,
//     status_id INT NOT NULL,
//     created_at DATETIME NOT NULL,
//     FOREIGN KEY (order_id) REFERENCES `Order`(id),
//     FOREIGN KEY (customer_id) REFERENCES Customer(id),
//     FOREIGN KEY (status_id) REFERENCES Status(id)
// );

const getPayment = async () => {
    try {
        const [results] = await pool.execute("SELECT * FROM Payment");

        if (results && results.length === 0) {
            return ResponseStatus.createResponse(404, null);
        }
        return ResponseStatus.createResponse(200, results);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const getPaymentById = async (id) => {
    try {
        const [results] = await pool.execute("SELECT * FROM Payment WHERE id = ?", [id]);
        if (results && results.length === 0) {
            return ResponseStatus.createResponse(404, null);
        }
        return ResponseStatus.createResponse(200, results[0]);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
}

const createPayment = async (order_id, customer_id, amount, payment_method, status_id, created_at) => {
    if (!order_id || typeof order_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid order_id provided.",
        });
    }
    if (!customer_id || typeof customer_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid customer_id provided.",
        });
    }
    if (!amount || typeof amount !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid amount provided.",
        });
    }
    if (!payment_method || typeof payment_method !== "string" || !payment_method.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid payment_method provided.",
        });
    }
    if (!status_id || typeof status_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid status_id provided.",
        });
    }
    if (!created_at || typeof created_at !== "string" || !created_at.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid created_at provided.",
        });
    }
    try {
        const [result] = await pool.execute("INSERT INTO Payment (order_id, customer_id, amount, payment_method, status_id, created_at) VALUES (?, ?, ?, ?, ?, ?)", [order_id, customer_id, amount, payment_method, status_id, created_at]);
        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const updatePayment = async (order_id, customer_id, amount, payment_method, status_id, created_at, id) => {
    if (!order_id || typeof order_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid order_id provided.",
        });
    }
    if (!customer_id || typeof customer_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid customer_id provided.",
        });
    }
    if (!amount || typeof amount !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid amount provided.",
        });
    }
    if (!payment_method || typeof payment_method !== "string" || !payment_method.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid payment_method provided.",
        });
    }
    if (!status_id || typeof status_id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid status_id provided.",
        });
    }
    if (!created_at || typeof created_at !== "string" || !created_at.trim()) {
        return ResponseStatus.createResponse(400, {
            message: "Invalid created_at provided.",
        });
    }
    if (!id || typeof id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid id provided.",
        });
    }
    try {
        const [result] = await pool.execute("UPDATE Payment SET order_id = ?, customer_id = ?, amount = ?, payment_method = ?, status_id = ?, created_at = ? WHERE id = ?", [order_id, customer_id, amount, payment_method, status_id, created_at, id]);
        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
};

const deletePayment = async (id) => {
    if (!id || typeof id !== "number") {
        return ResponseStatus.createResponse(400, {
            message: "Invalid id provided.",
        });
    }
    try {
        const [result] = await pool.execute("DELETE FROM Payment WHERE id = ?", [id]);
        return ResponseStatus.createResponse(200, result);
    } catch (error) {
        return ResponseStatus.createResponse(500, error.message);
    }
}

module.exports = {
    getPayment,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
};