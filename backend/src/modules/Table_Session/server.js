const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();
const { parseISO, isValid } = require('date-fns');
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
  const sql = "SELECT * FROM Sessions";
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

const createSessionServer = async (start_time,end_time) => {
 
  const sql = "INSERT INTO Sessions (start_time,end_time) VALUES (?,?)";

  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [start_time,end_time]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to create Sessions.",
      }); // Có lỗi khi thêm bản ghi
    }

    // Trả về kết quả thành công với mã trạng thái 201 (Created)
    return ResponseStatus.createResponse(201, { id: result.insertId, name });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, error.message);
  }
};
const UpdateSessionServer = async ({ id, start_time,end_time }) => {
  const startTimeParsed = parseISO(start_time);
  const endTimeParsed = parseISO(end_time);

  if (!isValid(startTimeParsed) || !isValid(endTimeParsed)) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid datetime format for start_time or end_time.",
    });
  }

  const sql = "UPDATE Sessions SET start_time = ?, end_time = ? WHERE id = ?";

  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [start_time, end_time, id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(404, { message: "Session not found." });
    }

    // Trả về kết quả thành công với mã trạng thái 200 (OK)
    return ResponseStatus.createResponse(200, { id, start_time, end_time });
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
      return ResponseStatus.createResponse(404, { message: "Session not found." });
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

module.exports = {
  getSessionServer,
  getMuiltiSessionServer,
  createSessionServer,
  UpdateSessionServer,
  deleteSessionServer,
};
