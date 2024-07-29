const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();
const { format, parseISO, isValid } = require("date-fns");
const getSessionServer = async (id) => {
  const sql = "SELECT * FROM Sessions WHERE id = ?";

  try {
    // Sử dụng pool.query từ mysql2/promise
    const [results] = await pool.query(sql, [id]);

    if (results && results.length === 0) {
      // Nếu không có kết quả, trả về 404
      return ResponseStatus.createResponse(404, null);
    }

    // Trả về kết quả tìm thấy với mã trạng thái 200
    return ResponseStatus.createResponse(200, results[0]);
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    return ResponseStatus.createResponse(500, error.message);
  }
};
const getMuiltiSessionServer = async () => {
  const sql =
    "SELECT id,DAYOFWEEK(start_time) AS day_of_week,start_time,end_time,typeSession FROM Sessions ORDER BY day_of_week ";
  try {
    // Sử dụng pool.query từ mysql2/promise
    const [results] = await pool.query(sql);

    if (results.length === 0) {
      // Nếu không có kết quả, trả về 404
      return ResponseStatus.createResponse(404, null);
    }

    // Trả về kết quả tìm thấy với mã trạng thái 200
    return ResponseStatus.createResponse(200, results);
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, error.message);
  }
};

const createSessionServer = async (start_time, end_time, typeSession) => {
  console.log(start_time, end_time, typeSession);
  const sql =
    "INSERT INTO Sessions (start_time,end_time,typeSession) VALUES (?,?,?)";

  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [start_time, end_time, typeSession]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to create Sessions.",
      }); // Có lỗi khi thêm bản ghi
    }

    // Trả về kết quả thành công với mã trạng thái 201 (Created)
    return ResponseStatus.createResponse(201, {
      id: result.insertId,
      startTimeParsed,
      endTimeParsed,
    });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, error.message);
  }
};

const convertToMySQLDatetime = (isoString) => {
  const date = parseISO(isoString);
  return format(date, "yyyy-MM-dd HH:mm:ss");
};
const UpdateSessionServer = async ({
  id,
  start_time,
  end_time,
  typeSession,
}) => {
  const startTimeParsed = parseISO(start_time);
  const endTimeParsed = parseISO(end_time);

  // Kiểm tra định dạng datetime
  if (!isValid(startTimeParsed) || !isValid(endTimeParsed)) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid datetime format for start_time or end_time.",
    });
  }

  // Chuyển đổi định dạng datetime từ ISO 8601 sang MySQL DATETIME
  const startTimeMySQL = convertToMySQLDatetime(start_time);
  const endTimeMySQL = convertToMySQLDatetime(end_time);

  const sql =
    "UPDATE Sessions SET start_time = ?, end_time = ? ,typeSession=? WHERE id = ?";

  try {
    const [result] = await pool.query(sql, [
      startTimeMySQL,
      endTimeMySQL,
      typeSession,
      id,
    ]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(404, {
        message: "Session not found.",
      });
    }

    // Trả về kết quả thành công với mã trạng thái 200 (OK)
    return ResponseStatus.createResponse(200, {
      id,
      start_time: startTimeMySQL,
      end_time: endTimeMySQL,
    });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, {
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteSessionServer = async (id) => {
  const selectSql = "SELECT * FROM Sessions WHERE id = ?";
  const deleteSql = "DELETE FROM Sessions WHERE id = ?";

  try {
    // Kiểm tra xem bản ghi có tồn tại hay không
    const [results] = await pool.query(selectSql, [id]);

    if (results.length === 0) {
      // Nếu không có bản ghi, trả về 404
      return ResponseStatus.createResponse(404, {
        message: "Session not found.",
      });
    }

    // Xóa bản ghi
    const [deleteResult] = await pool.query(deleteSql, [id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (deleteResult.affectedRows === 0) {
      // Nếu không có bản ghi bị xóa, trả về lỗi 500
      return ResponseStatus.createResponse(500, {
        message: "Failed to delete session.",
      });
    }

    // Trả về kết quả thành công với mã trạng thái 200 (OK)
    return ResponseStatus.createResponse(200, {
      message: "Session deleted successfully.",
    });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, {
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const createSessionDetailServer = async ({ session_id, arr }) => {
  const sql =
    "INSERT INTO DetailSessions (session_id, account_id) VALUES (?, ?)";

  const connection = await pool.getConnection(); // Lấy kết nối từ pool

  try {
    await connection.beginTransaction(); // Bắt đầu giao dịch

    for (const account_id of arr) {
      const [result] = await connection.query(sql, [session_id, account_id]);
      // Kiểm tra số lượng bản ghi bị ảnh hưởng
      if (result.affectedRows === 0) {
        throw new Error("Failed to create session details.");
      }
    }

    await connection.commit(); // Cam kết giao dịch

    return ResponseStatus.createResponse(201, {
      message: "Session details created successfully.",
    });
  } catch (error) {
    await connection.rollback(); // Hoàn tác giao dịch nếu có lỗi

    return ResponseStatus.createResponse(500, error.message);
  } finally {
    connection.release(); // Trả kết nối về pool
  }
};
const getAllDetailSession = async () => {
  const sql =
    "SELECT S.id, S.start_time, S.typeSession,D.session_id, COUNT(D.account_id) AS TOTAL " +
    "FROM DetailSessions D " +
    "INNER JOIN Sessions S ON D.session_id = S.id " +
    "GROUP BY S.id, S.start_time, S.typeSession,D.session_id";
  
  try {
    // Using pool.query from mysql2/promise
    const [results] = await pool.query(sql);

    if (results.length === 0) {
      // If no results, return 404
      return ResponseStatus.createResponse(404, null);
    }

    // Return results found with 200 status code
    return ResponseStatus.createResponse(200, results);
  } catch (error) {
    // Handle errors with 500 status code
    console.error("Database query error:", error); // Log the error for debugging
    return ResponseStatus.createResponse(500, error.message);
  }
};
const getAllNVtoSessionServer = async (id) => {
  // SQL query with RIGHT JOIN and corrected syntax
  const sql = `
    SELECT *
    FROM Account A
    RIGHT JOIN DetailSessions D ON A.id = D.account_id
    INNER JOIN Profile P ON A.id = P.account_id
    WHERE D.session_id = ?
  `;
  
  try {
    // Using pool.query from mysql2/promise
    const [results] = await pool.query(sql, [id]);

    if (results.length === 0) {
      // If no results, return 404
      return ResponseStatus.createResponse(404, null);
    }

    // Return results found with 200 status code
    return ResponseStatus.createResponse(200, results);
  } catch (error) {
    // Handle errors with 500 status code
    console.error("Database query error:", error); // Log the error for debugging
    return ResponseStatus.createResponse(500, error.message);
  }
};

module.exports = {
  getSessionServer,
  getMuiltiSessionServer,
  createSessionServer,
  UpdateSessionServer,
  deleteSessionServer,
  createSessionDetailServer,
  getAllDetailSession,
  getAllNVtoSessionServer
};
