const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();

// CREATE TABLE Customer (
//     id INT AUTO_INCREMENT  PRIMARY KEY,
//     name VARCHAR(10) NOT NULL,
//     phoneNumber VARCHAR(12) NOT NULL
// );

const getCustomerServer = async (id) => {
  const sql = "SELECT * FROM Customer WHERE id = ?";

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

const getMuiltiCustomerServer = async () => {
  const sql = "SELECT * FROM Customer";
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
const getAllCustomerServer = async () => {
  const sql = `SELECT 
  C.id,
  C.name,
  C.phoneNumber,
  COUNT(O.id) AS order_count,
  SUM(O.total_amount) AS total_spent
FROM 
  Customer C
LEFT JOIN 
  Order O 
ON 
  C.id = O.user_id
GROUP BY 
  C.id, 
  C.name, 
  C.phoneNumber
ORDER BY 
  total_spent  DESC;
     `;
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
const createCustomerServer = async (name, phoneNumber) => {
  if (!name || typeof name !== "string" || !name.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid name provided.",
    });
  }
  if (!phoneNumber || typeof phoneNumber !== "string" || !phoneNumber.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid phoneNumber provided.",
    });
  }
  const sql = "INSERT INTO Customer (name, phoneNumber) VALUES (?, ?)";

  try {
    const [result] = await pool.query(sql, [name, phoneNumber]);

    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to create Customer.",
      });
    }

    return ResponseStatus.createResponse(200, {
      message: "Successfully created Customer.",
    });
  } catch (error) {
    console.error("Database query error:", error);
    return ResponseStatus.createResponse(500, error.message);
  }
};
const updateCustomerServer = async (id, name, phoneNumber) => {
  if (!id || typeof id !== "number") {
    return ResponseStatus.createResponse(400, {
      message: "Invalid id provided.",
    });
  }
  if (!name || typeof name !== "string" || !name.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid name provided.",
    });
  }
  if (!phoneNumber || typeof phoneNumber !== "string" || !phoneNumber.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid phoneNumber provided.",
    });
  }
  const sql = "UPDATE Customer SET name = ?, phoneNumber = ? WHERE id = ?";

  try {
    const [result] = await pool.query(sql, [name, phoneNumber, id]);

    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to update Customer.",
      });
    }

    return ResponseStatus.createResponse(200, {
      message: "Successfully updated Customer.",
    });
  } catch (error) {
    console.error("Database query error:", error);
    return ResponseStatus.createResponse(500, error.message);
  }
};

const deleteCustomerServer = async (id) => {
  if (!id || typeof id !== "number") {
    return ResponseStatus.createResponse(400, {
      message: "Invalid id provided.",
    });
  }
  const sql = "DELETE FROM Customer WHERE id = ?";

  try {
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to delete Customer.",
      });
    }

    return ResponseStatus.createResponse(200, {
      message: "Successfully deleted Customer.",
    });
  } catch (error) {
    console.error("Database query error:", error);
    return ResponseStatus.createResponse(500, error.message);
  }
};

module.exports = {
  getCustomerServer,
  getMuiltiCustomerServer,
  createCustomerServer,
  updateCustomerServer,
  deleteCustomerServer,
  getAllCustomerServer
};
