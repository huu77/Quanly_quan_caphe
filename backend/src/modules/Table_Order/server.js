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

const createOrderServer = async ({ user_id, table_id, status_id, total_amount }) => {

  const checkUserSql = "SELECT COUNT(*) AS count FROM Customer WHERE id = ?";
  const checkTableSql = "SELECT COUNT(*) AS count FROM RestaurantTable WHERE id = ?";

  const sql = "INSERT INTO Order (user_id,table_id,status_id,total_amount) VALUES (?,?,?,?)";

  try {
    const [userResults] = await pool.query(checkUserSql, [user_id]);
    if (userResults[0].count === 0) {
      return ResponseStatus.createResponse(400, {
        message: "User ID does not exist.",
      });
    }

    // Kiểm tra sự tồn tại của table_id
    const [tableResults] = await pool.query(checkTableSql, [table_id]);
    if (tableResults[0].count === 0) {
      return ResponseStatus.createResponse(400, {
        message: "Table ID does not exist.",
      });
    }
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [user_id, table_id, status_id, total_amount]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, {
        message: "Failed to create Order.",
      }); // Có lỗi khi thêm bản ghi
    }

    // Trả về kết quả thành công với mã trạng thái 201 (Created)
    return ResponseStatus.createResponse(201, { id: result.insertId, user_id, table_id, status_id, total_amount });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, error.message);
  }
};
const UpdateOrderServer = async ({ id, user_id, table_id, status_id, total_amount }) => {
  const sql = "UPDATE Order SET user_id =?,table_id=?,status_id=?,total_amount=? WHERE id = ?";

  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [user_id, table_id, status_id, total_amount, id]);

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

const deleteOrderServer = async (id, isDelete) => {
  const selectSql = "SELECT * FROM `Order` WHERE id = ?";
  // Câu lệnh SQL để cập nhật trường isDelete
  const updateSql = "UPDATE `Order` SET isDelete = ? WHERE id = ?";

  try {
    // Kiểm tra xem bản ghi có tồn tại hay không
    const [results] = await pool.query(selectSql, [id]);

    if (results.length === 0) {
      // Nếu không có bản ghi, trả về 404
      return ResponseStatus.createResponse(404, { message: "Order not found." });
    }

    // Cập nhật trường isDelete
    const [updateResult] = await pool.query(updateSql, [isDelete, id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (updateResult.affectedRows === 0) {
      // Nếu không có bản ghi bị cập nhật, trả về lỗi 500
      return ResponseStatus.createResponse(500, {
        message: "Failed to update Order.",
      });
    }

    // Trả về kết quả thành công với mã trạng thái 200 (OK)
    return ResponseStatus.createResponse(200, {
      message: "Order updated successfully.",
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

const updateTableStatusAndOrderDetails = async (orderId, items, tableId, res) => {
  let totalAmount = 0;

  try {
    for (const [index, item] of items.entries()) {
      const [productRows] = await pool.query('SELECT name, price FROM Product WHERE id = ?', [item.product_id]);
      if (productRows.length === 0) {
        // return res.status(404).json();
        return ResponseStatus.createResponse(404, { error: 'Product not found' });
      }

      const productName = productRows[0].name;
      const price = productRows[0].price;
      totalAmount += price * item.quantity;

      await pool.query('INSERT INTO OrderDetail (item_name, quantity, price, order_id, product_id, status_id) VALUES (?, ?, ?, ?, ?, 1)',
        [productName, item.quantity, price, orderId, item.product_id]);

      // If it's the last item, update the total amount and table status
      if (index === items.length - 1) {
        await pool.query('UPDATE `Order` SET total_amount = total_amount + ? WHERE id = ?', [totalAmount, orderId]);
        await pool.query('UPDATE RestaurantTable SET status_table_id = 3 WHERE id = ?', [tableId]);

        return ResponseStatus.createResponse({ order_id: orderId, message: 'Order created/updated successfully' });
      }
    }
  } catch (err) {
    return ResponseStatus.createResponse(500, { error: err.message });
  }
};


const createOrderByCus = async (customer_id, table_id, items, res) => {
  try {
    // Check table status
    const [tableStatusRows] = await pool.query('SELECT status_table_id FROM RestaurantTable WHERE id = ?', [table_id]);
    const tableStatus = tableStatusRows[0].status_table_id;

    let orderId = null;

    if (tableStatus === 1 || tableStatus === 2) { // Table is 'Available'
      // Create a new order
      const [orderResult] = await pool.query('INSERT INTO `Order` (user_id, table_id, status_id, total_amount) VALUES (?, ?, 3, 0)', [customer_id, table_id]);
      orderId = orderResult.insertId;
      await updateTableStatusAndOrderDetails(orderId, items, table_id, res);
      return ResponseStatus.createResponse(201, { order_id: orderId, message: 'Order created successfully' });
    } else {
      // Table is 'Occupied', update existing order
      const [orderRows] = await pool.query('SELECT id FROM `Order` WHERE table_id = ? AND status_id = 3', [table_id]);
      orderId = orderRows[0].id;
      await updateTableStatusAndOrderDetails(orderId, items, table_id, res);
      return ResponseStatus.createResponse(200, { order_id: orderId, message: 'Order updated successfully' });

    }
  } catch (err) {
    return ResponseStatus.createResponse(500, {
      message: "errrrr",
      error: err.message
    });
  }
};

module.exports = {
  getOrderServer,
  getOrderOneCustomerServer,
  getMuiltiOrderServer,
  createOrderServer,
  UpdateOrderServer,
  deleteOrderServer,
  createOrderByCus
};
