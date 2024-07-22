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
    const {password, ...coveruser} = results[0]
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
  const sql =
    "INSERT INTO Account (username, password, role_id) VALUES (?, ?, ?)";

  try {
    const hashedPassword = await hashPW(password)
    const [result] = await pool.query(sql, [username,hashedPassword , role_id]);

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
    const isPasswordValid = comparePW(password, user.password)
    if (!isPasswordValid) {
      return ResponseStatus.createResponse(401, {
        message: "Invalid password.",
      });
    }

    // Tạo access token và refresh token
    const { accessToken, refreshToken } = encode(user);

    return ResponseStatus.createResponse(200, { accessToken, refreshToken });
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
module.exports = {
  getAccountServer,
  getMuiltiAccountServer,
  createAccountServer,
  updateAccountServer,
  deleteAccountServer,
  loginAccountServer,
  UpdateIsActiveServer,
  refreshtokenServer
};
