const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();
const getTableServer = async (id) => {
  const sql = "SELECT * FROM RestaurantTable WHERE id = ?";

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
const getMuiltiTableServer = async () => {
  const sql = "SELECT rs.id,rs.ORstring, rs.name as nameTable ,ts.name ,rs.status_table_id FROM RestaurantTable rs INNER JOIN TableStatus ts on rs.status_table_id = ts.id  ";
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

const createTableServer = async (name, ORstring) => {
  if (!name || typeof name !== "string" || !name.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid name provided.",
    });
  }

  const sql = "INSERT INTO RestaurantTable (name, ORstring) VALUES (?, ?)"; // Thêm cả trường ORstring vào câu lệnh SQL

  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [name, ORstring]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to create Table.",
      }); // Có lỗi khi thêm bản ghi
    }

    // Trả về kết quả thành công với mã trạng thái 201 (Created)
    return ResponseStatus.createResponse(201, {
      id: result.insertId,
      name,
      ORstring,
    });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, error.message);
  }
};

const UpdateTableServer = async ({ id, name, ORstring,status_table_id }) => {
  if (!name || typeof name !== "string" || !name.trim()) {
    return ResponseStatus.createResponse(400, {
      message: "Invalid name provided.",
    });
  }

  const sql = "UPDATE RestaurantTable SET name = ?, ORstring = ? ,status_table_id =? WHERE id = ?";

  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [name, ORstring,status_table_id, id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(404, {
        message: "Table not found.",
      }); // Không tìm thấy bản ghi để cập nhật
    }

    // Trả về kết quả thành công với mã trạng thái 200 (OK)
    return ResponseStatus.createResponse(200, { id, name, ORstring });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, {
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteTableServer = async (id) => {
  const selectSql = "SELECT * FROM RestaurantTable WHERE id = ?";
  const deleteSql = "DELETE FROM RestaurantTable WHERE id = ?";
  try {
    // Kiểm tra xem bản ghi có tồn tại hay không
    const [results] = await pool.query(selectSql, [id]);

    if (results.length === 0) {
      // Nếu không có bản ghi, trả về 404
      return ResponseStatus.createResponse(404, {
        message: "Table not found.",
      });
    }

    // Xóa bản ghi
    const [deleteResult] = await pool.query(deleteSql, [id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (deleteResult.affectedRows === 0) {
      // Nếu không có bản ghi bị xóa, trả về lỗi 500
      return ResponseStatus.createResponse(500, {
        message: "Failed to delete Table.",
      });
    }

    // Trả về kết quả thành công với mã trạng thái 200 (OK)
    return ResponseStatus.createResponse(200, {
      message: "Table deleted successfully.",
    });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, error.message);
  }
};

const getProductByTableIdServer = async (id) => {
  try {
    // Query to check the status of the specific table
    const [tableRows] = await pool.query('SELECT status_table_id FROM RestaurantTable WHERE id = ?', [id]);

    if (tableRows.length === 0) {
      // If the table ID does not exist
      return ResponseStatus.createResponse(404, { message: 'Table not found' });
    }

    const tableStatus = tableRows[0].status_table_id;

    if (tableStatus !== 3) {
      // If the table status is not 'Occupied' (status_table_id = 3)
      return ResponseStatus.createResponse(200, []);
    }

    // Query to get products associated with the table with status_table_id = 3
    const [orderDetails] = await pool.query(
      `SELECT DISTINCT *
       FROM OrderDetail
       JOIN Product ON OrderDetail.product_id = Product.id
       JOIN \`Order\` ON OrderDetail.order_id = \`Order\`.id
       WHERE \`Order\`.table_id = ?`,
      [id]
    );

    // Return the list of products
    return ResponseStatus.createResponse(200, orderDetails);

  } catch (err) {
    console.error('Error fetching products:', err);
    return ResponseStatus.createResponse(500, {
      message: 'Internal Server Error',
      error: err.message
    });
  }
};



module.exports = {
  getTableServer,
  getMuiltiTableServer,
  createTableServer,
  UpdateTableServer,
  deleteTableServer,
  getProductByTableIdServer
};
