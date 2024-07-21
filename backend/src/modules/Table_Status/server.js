const connection = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");

const getStatusServer = async(id) => {
    const sql = 'SELECT * FROM Status WHERE id = ?';

    try {
      // Sử dụng Promise để xử lý kết quả của truy vấn
      const [results] = await new Promise((resolve, reject) => {
        connection.query(sql, [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      if (results?.length === 0) {
        // Nếu không có kết quả, trả về 404
        return ResponseStatus.createResponse(404, null);
      }
  
      // Trả về kết quả tìm thấy với mã trạng thái 200
      return ResponseStatus.createResponse(200, results);
  
    } catch (error) {
      // Xử lý lỗi với mã trạng thái 500
      return ResponseStatus.createResponse(500, error.message);
    }
};
const getMuiltiStatusServer = async() => {};

module.exports = {
  getStatusServer,
  getMuiltiStatusServer
};
