const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();

const getProfileServer = async (id) => {
  const sql = "SELECT * FROM Profile WHERE account_id = ?";

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
const getAllProfileServer = async (isActive) => {
  const sql = `SELECT ac.id, pr.firstname ,pr.lastname, pr.address, pr.phoneNumber, pr.CCCD 
    FROM Account ac 
    INNER JOIN Profile pr ON ac.id = pr.account_id 
    WHERE ac.isActive = ?`;
 
  try {
    const [results] = await pool.query(sql, [isActive]);

    if (results && results.length === 0) {
      return ResponseStatus.createResponse(404, null);
    }

    return ResponseStatus.createResponse(200, results);
  } catch (error) {
    return ResponseStatus.createResponse(500, error.message);
  }
};

const createProfileServer = async (
  account_id,
  firstname,
  lastname,
  phone,
  address,
  cccd
) => {
  if (!account_id || typeof account_id !== "number") {
    return ResponseStatus.createResponse(400, {
      message: "Invalid account_id provided.",
    });
  }
  if (!firstname || typeof firstname !== "string" || !firstname.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid firstname provided.",
    });
  }
  if (!lastname || typeof lastname !== "string" || !lastname.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid lastname provided.",
    });
  }
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid phone provided.",
    });
  }
  if (!address || typeof address !== "string" || !address.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid address provided.",
    });
  }
  if (!cccd || typeof cccd !== "string" || !cccd.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid CCCD provided.",
    });
  }
  const sql =
    "INSERT INTO Profile (account_id, firstname, lastname,  phoneNumber, address, CCCD) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    const [result] = await pool.query(sql, [
      account_id,
      firstname,
      lastname,
      phone,
      address,
      cccd,
    ]);

    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to create Profile.",
      });
    }

    return ResponseStatus.createResponse(200, {
      message: "Profile created successfully.",
    });
  } catch (error) {
    return ResponseStatus.createResponse(500, error.message);
  }
};

const updateProfileServer = async (
  account_id,
  firstname,
  lastname,
  phone,
  address,
  cccd
) => {
  if (!account_id || typeof account_id !== "number") {
    return ResponseStatus.createResponse(400, {
      message: "Invalid account_id provided.",
    });
  }
  if (!firstname || typeof firstname !== "string" || !firstname.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid firstname provided.",
    });
  }
  if (!lastname || typeof lastname !== "string" || !lastname.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid lastname provided.",
    });
  }
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid phone provided.",
    });
  }
  if (!address || typeof address !== "string" || !address.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid address provided.",
    });
  }
  if (!cccd || typeof cccd !== "string" || !cccd.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid CCCD provided.",
    });
  }
  const sql =
    "UPDATE Profile SET firstname = ?, lastname = ?, phoneNumber = ?, address = ?, CCCD = ? WHERE account_id = ?";

  try {
    const [result] = await pool.query(sql, [
      firstname,
      lastname,
      phone,
      address,
      cccd,
      account_id,
    ]);

    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to update Profile.",
      });
    }

    return ResponseStatus.createResponse(200, {
      message: "Profile updated successfully.",
    });
  } catch (error) {
    return ResponseStatus.createResponse(500, error.message);
  }
};

const deleteProfileServer = async (id) => {
  const sql = "DELETE FROM Profile WHERE account_id = ?";

  try {
    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to delete Profile.",
      });
    }

    return ResponseStatus.createResponse(200, {
      message: "Profile deleted successfully.",
    });
  } catch (error) {
    return ResponseStatus.createResponse(500, error.message);
  }
};

module.exports = {
  getProfileServer,
  getAllProfileServer,
  createProfileServer,
  updateProfileServer,
  deleteProfileServer,
};
