import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Không tìm thấy trang</h1>
        <p className="text-gray-600">Xin lỗi, nhưng trang bạn đang tìm kiếm không tồn tại.</p>
        <Link to={'/'}>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">
          Quay lại trang chủ
        </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
