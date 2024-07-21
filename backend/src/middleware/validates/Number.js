const validator = require('validator');
const ResponseStatus = require('../../ReponseStatus');

const validateNumber = (req, res, next) => {
    const value = req.params.id; // Lấy giá trị từ params
  
    // Kiểm tra nếu value là một chuỗi số hợp lệ
    if (validator.isNumeric(value)) {
      next(); // Nếu hợp lệ, chuyển tiếp đến middleware tiếp theo
    } else {
      // Nếu không hợp lệ, trả về phản hồi lỗi và dừng xử lý
      return res.status(400).json(ResponseStatus.createResponse(400, { message: 'The value is not a valid number.' }));
    }
  };


module.exports = validateNumber