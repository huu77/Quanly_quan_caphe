const validator = require('validator');

const validateNumber = (value) => {
  // Kiểm tra nếu value là một chuỗi số hợp lệ
  if (validator.isNumeric(value)) {
    return {
      isValid: true,
      message: 'The value is a valid number.'
    };
  } else {
    return {
      isValid: false,
      message: 'The value is not a valid number.'
    };
  }
};