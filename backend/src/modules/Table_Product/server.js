const db = require("../../config/ConnectDatabase");
const ResponseStatus = require("../../ReponseStatus");
const pool = db.getPool();
const cloudinary = require("../../config/Cloudinary");
const getProductServer = async (id) => {
  const sql = "SELECT * FROM Product WHERE id = ?";

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
const getMuiltiProductServer = async () => {
  const sql = "SELECT * FROM Product";
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

const createProductServer = async (
  name,
  description,
  price,
  image,
  category_id
) => {
  try {
    const sql =
      "INSERT INTO Product (name, description, image, price, category_id) VALUES (?, ?, ?, ?, ?)";
    if (image) {
      const updateRes = await cloudinary.uploader.upload(image, {
        upload_preset: "upload_image", // Đảm bảo upload preset tồn tại
      });
      if (updateRes) {
        const [result] = await pool.query(sql, [
          name,
          description,
          updateRes.secure_url,
          price,
          category_id,
        ]);
        if (result.affectedRows === 0) {
          return ResponseStatus.createResponse(500, {
            message: "Failed to create product.",
          });
        }
        return ResponseStatus.createResponse(201, {
          name,
          description,
          image: updateRes.secure_url,
          price,
          category_id,
        });
      } else {
        ResponseStatus.createResponse(400, {
          message: "lỗi thiếu image",
        });
      }
    }
  } catch (error) {
    return ResponseStatus.createResponse(500, {
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const UpdateProductServer = async ({
  id,
  name,
  description,
  price,
  image,
  category_id,
}) => {
   

  const sql = "UPDATE Product SET name = ? WHERE id = ?";

  try {
    // Sử dụng pool.query từ mysql2/promise
    const [result] = await pool.query(sql, [name, id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (result.affectedRows === 0) {
      return ResponseStatus.createResponse(404, {
        message: "Product not found.",
      }); // Không tìm thấy bản ghi để cập nhật
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

const deleteProductServer = async (id) => {
  const selectSql = "SELECT * FROM Product WHERE id = ?";
  const deleteSql = "DELETE FROM Product WHERE id = ?";
  try {
    // Kiểm tra xem bản ghi có tồn tại hay không
    const [results] = await pool.query(selectSql, [id]);

    if (results.length === 0) {
      // Nếu không có bản ghi, trả về 404
      return ResponseStatus.createResponse(404, {
        message: "Product not found.",
      });
    }

    // Xóa bản ghi
    const [deleteResult] = await pool.query(deleteSql, [id]);

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    if (deleteResult.affectedRows === 0) {
      // Nếu không có bản ghi bị xóa, trả về lỗi 500
      return ResponseStatus.createResponse(500, {
        message: "Failed to delete Product.",
      });
    }

    // Trả về kết quả thành công với mã trạng thái 200 (OK)
    return ResponseStatus.createResponse(200, {
      message: "Product deleted successfully.",
    });
  } catch (error) {
    // Xử lý lỗi với mã trạng thái 500
    console.error("Database query error:", error); // Ghi lại lỗi để kiểm tra
    return ResponseStatus.createResponse(500, error.message);
  }
};
module.exports = {
  getProductServer,
  getMuiltiProductServer,
  createProductServer,
  UpdateProductServer,
  deleteProductServer,
};
