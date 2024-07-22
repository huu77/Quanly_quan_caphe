const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();
const getOrderServer = async (id) => {
  const sql = "SELECT * FROM Order WHERE id = ?";

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
const getOrderOneCustomerServer = async (id) => {
  const sql = "SELECT * FROM `Order` WHERE user_id = ? ORDER BY created_at ASC";

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
const getMuiltiOrderServer = async () => {
  const sql = "SELECT * FROM Order";
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

const createOrderServer = async ({user_id,table_id,status_id,total_amount}) => {
  if (!name || typeof name !== "string" || !name.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid name provided.",
    });
  }
  const sql = "INSERT INTO Order (name) VALUES (?)";

  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [name]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to create Order.",
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
const UpdateOrderServer = async ({ id, name }) => {
  if (!name || typeof name !== "string" || !name.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid name provided.",
    });
  }

  const sql = "UPDATE Order SET name = ? WHERE id = ?";

  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [name, id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(404, { message: "Order not found." }); // Không tìm thấy bản ghi để cập nhật
    }

    // Trả về kết quả thành công với mã trạng thái 200 (OK)
    return ResponseStatus.createResponse(200, { id, name });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, {
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteOrderServer = async (id) => {
  const selectSql = "SELECT * FROM Order WHERE id = ?";
  const deleteSql = "DELETE FROM Order WHERE id = ?";
  try {
    // Kiểm tra xem bản ghi có tồn tại hay không
    const [results] = await pool.query(selectSql, [id]);

    if (results.length === 0) {
      // Nếu không có bản ghi, trả về 404
      return ResponseStatus.createResponse(404, { message: "Order not found." });
    }

    // Xóa bản ghi
    const [deleteResult] = await pool.query(deleteSql, [id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (deleteResult.affectedRows === 0) {
      // Nếu không có bản ghi bị xóa, trả về lỗi 500
      return ResponseStatus.createResponse(500, {
        message: "Failed to delete Order.",
      });
    }

    // Trả về kết quả thành công với mã trạng thái 200 (OK)
    return ResponseStatus.createResponse(200, {
      message: "Order deleted successfully.",
    });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, error.message);
  }
};
module.exports = {
  getOrderServer,
  getOrderOneCustomerServer,
  getMuiltiOrderServer,
  createOrderServer,
  UpdateOrderServer,
  deleteOrderServer,
};
