const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();
const getStatusServer = async(id) => {
  const sql = 'SELECT * FROM Status WHERE id = ?';

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
const getMuiltiStatusServer = async () => {
  const sql = 'SELECT * FROM Status';
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
    console.error('Database query error:', error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, error.message);
  }
};

const createStatusServer = async (name) => {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return ResponseStatus.createResponse(400, { message: 'Invalid name provided.' });
  }
  const sql = 'INSERT INTO Status (name) VALUES (?)';
  
  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [name]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(500, { message: 'Failed to create status.' }); // Có lỗi khi thêm bản ghi
    }

    // Trả về kết quả thành công với mã trạng thái 201 (Created)
    return ResponseStatus.createResponse(201, { id: result.insertId, name });

  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error('Database query error:', error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, error.message);
  }
};
const UpdateStatusServer = async ({id,name}) => {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return ResponseStatus.createResponse(400, { message: 'Invalid name provided.' });
  }

  const sql = 'UPDATE Status SET name = ? WHERE id = ?';
  
  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [name, id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(404, { message: 'Status not found.' }); // Không tìm thấy bản ghi để cập nhật
    }

    // Trả về kết quả thành công với mã trạng thái 200 (OK)
    return ResponseStatus.createResponse(200, { id, name });

  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error('Database query error:', error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, { message: 'Internal Server Error', error: error.message });
  }
};
module.exports = {
  getStatusServer,
  getMuiltiStatusServer,
  createStatusServer,
  UpdateStatusServer
};
