const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const decodeToken = require("../../utils/decode");
const encode = require("../../utils/endcode");
const { comparePW, hashPW } = require("../../utils/hashPassword");
const pool = db.getPool();

const getAccountServer = async (id) => {
  const sql = "SELECT * FROM Account WHERE id = ?";

  try {
    const [results] = await pool.query(sql, [id]);

    if (results && results.length === 0) {
      return ResponseStatus.createResponse(404, null);
    }
    const { password, ...coveruser } = results[0];
    return ResponseStatus.createResponse(200, coveruser);
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

const createAccountServer = async ({
  username,
  password,
  role_id,
  firstname,
  lastname,
  phone,
  address,
  cccd,
}) => {
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

  const sqlCheck =
    "SELECT COUNT(*) FROM Account WHERE username =? AND password = ?";
  const sql =
    "INSERT INTO Account (username, password, role_id) VALUES (?, ?, ?)";
  const sql1 =
    "INSERT INTO Profile (account_id, firstname, lastname,  phoneNumber, address, CCCD) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    const hashedPassword = await hashPW(password);

    const [rsCheck] = await pool.query(sqlCheck, [username, hashedPassword]);

    if (rsCheck[0].count > 0) {
      return ResponseStatus.createResponse(400, {
        message: "Account already exists.",
      });
    }
    await pool.query("START TRANSACTION");

    const [result] = await pool.query(sql, [username, hashedPassword, role_id]);
    if (result.affectedRows === 0) {
      await pool.query("ROLLBACK");
      return ResponseStatus.createResponse(500, {
        message: "Failed to create Account.",
      });
    }

    const [result1] = await pool.query(sql1, [
      result.insertId,
      firstname,
      lastname,
      phone,
      address,
      cccd,
    ]);
    if (result1.affectedRows === 0) {
      await pool.query("ROLLBACK");
      return ResponseStatus.createResponse(500, {
        message: "Failed to create Profile.",
      });
    }

    // Commit transaction
    await pool.query("COMMIT");

    return ResponseStatus.createResponse(201, {
      message: "Account created successfully.",
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    return ResponseStatus.createResponse(500, {
      message: error.message,
    });
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
  const sql =
    "UPDATE Account SET username = ?, password = ?, role_id = ? WHERE id = ?";

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
  // Kiểm tra xem id có hợp lệ không
  const sql = "UPDATE Account SET isActive = 0 WHERE id = ?";

  try {
    const [result] = await pool.query(sql, [id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
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
const UpdateIsActiveServer = async (id) => {
  const sql = "UPDATE Account SET isActive = 1 WHERE id = ?";

  try {
    const [result] = await pool.query(sql, [id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(404, {
        message: "Account not found.",
      });
    }

    return ResponseStatus.createResponse(200, {
      message: "Account activated successfully.",
    });
  } catch (error) {
    return ResponseStatus.createResponse(500, error.message);
  }
};
const loginAccountServer = async (username, password) => {
  const sql = "SELECT * FROM Account WHERE username = ?";

  try {
    const [results] = await pool.query(sql, [username]);

    if (results.length === 0) {
      return ResponseStatus.createResponse(404, {
        message: "Account not found.",
      });
    }

    const user = results[0];

    // Kiểm tra mật khẩu
    const isPasswordValid = comparePW(password, user.password);
    if (!isPasswordValid) {
      return ResponseStatus.createResponse(401, {
        message: "Invalid password.",
      });
    }
    if (!user.isActive) {
      return ResponseStatus.createResponse(401, {
        message: "Tài khoản đã bị xóa.",
      });
    }
    // Tạo access token và refresh token
    const { accessToken, refreshToken } = encode(user);

    return ResponseStatus.createResponse(200, {
      accessToken,
      refreshToken,
      role: user.role_id,
    });
  } catch (error) {
    return ResponseStatus.createResponse(500, error.message);
  }
};
const refreshtokenServer = async (refreshToken) => {
  const { valid, decoded, error } = decodeToken(refreshToken);

  if (!valid) {
    return ResponseStatus.createResponse(401, {
      message: `Refresh token is invalid or expired: ${error}`,
    });
  }

  try {
    // Truy vấn tài khoản người dùng từ cơ sở dữ liệu
    const sql = "SELECT * FROM Account WHERE id = ?";
    const [results] = await pool.query(sql, [decoded.id]);

    if (results.length === 0) {
      return ResponseStatus.createResponse(404, {
        message: "Account not found.",
      });
    }
    const user = results[0];
    return ResponseStatus.createResponse(200, encode(user));
  } catch (error) {
    return ResponseStatus.createResponse(500, error.message);
  }
};

const getNvTotype = async (roleIds) => {
  let roleIdsArray;
  if (roleIds === undefined) {
    const sql1 = `SELECT A.id, P.firstname ,P.lastname ,R.name FROM Account A INNER JOIN Role R   ON A.role_id = R.id  INNER JOIN Profile P ON A.id = P.account_id   `;
    try {
      // Execute the query with the role IDs array
      const [results1] = await pool.query(sql1, roleIdsArray);

      // Check if results are empty
      if (results1.length === 0) {
        return ResponseStatus.createResponse(404, null);
      }

      // Return the successful response with results1
      return ResponseStatus.createResponse(200, results1);
    } catch (error) {
      console.error("Database query error:", error);
      // Return error response
      return ResponseStatus.createResponse(500, error.message);
    }
  }
  
  if (typeof roleIds === "string") {
    roleIdsArray = [parseInt(roleIds, 10)];
  } else {
    // Split role IDs and convert them to integers
    roleIdsArray = roleIds.map((id) => parseInt(id, 10));
  }

  // Validate the role IDs
  if (roleIdsArray.some(isNaN)) {
    return ResponseStatus.createResponse(400, "Invalid role IDs");
  }

  // Generate placeholders for the SQL query
  const placeholders = roleIdsArray.map(() => "?").join(",");

  // Construct the SQL query
  const sql = `SELECT A.id, P.firstname ,P.lastname ,R.name FROM Account A INNER JOIN Role R   ON A.role_id = R.id  INNER JOIN Profile P ON A.id = P.account_id  WHERE A.role_id IN (${placeholders})`;

  try {
    // Execute the query with the role IDs array
    const [results] = await pool.query(sql, roleIdsArray);

    // Check if results are empty
    if (results.length === 0) {
      return ResponseStatus.createResponse(404, null);
    }

    // Return the successful response with results
    return ResponseStatus.createResponse(200, results);
  } catch (error) {
    console.error("Database query error:", error);
    // Return error response
    return ResponseStatus.createResponse(500, error.message);
  }
};
module.exports = {
  getAccountServer,
  getMuiltiAccountServer,
  createAccountServer,
  updateAccountServer,
  deleteAccountServer,
  loginAccountServer,
  UpdateIsActiveServer,
  refreshtokenServer,
  getNvTotype,
};
