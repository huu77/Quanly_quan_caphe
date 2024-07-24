import React, { useState } from "react";

const Tab2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFile(reader.result);
      };
    } else {
      setFile("");
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category_id: value,
    }));
  };
console.log(formData,file)
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center items-center gap-2">
        <div className="avatar">
          <div className="w-24 rounded-xl">
            <img
              src={
                file ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="Product"
            />
          </div>
        </div>
        <label htmlFor="imgsp" className="font-bold cursor-pointer">
          Chọn Hình Ảnh Sản Phẩm
        </label>
        <input
          type="file"
          name="file"
          id="imgsp"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>
      <div className="w-full grid grid-cols-3 gap-5">
        <label className="input input-bordered flex items-center gap-2 w-full">
          Tên sản phẩm
          <input
            type="text"
            className="grow"
            placeholder=""
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          Giá
          <input
            type="text"
            className="grow"
            placeholder=""
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          Mô tả
          <input
            type="text"
            className="grow"
            placeholder=""
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <select
          className="select select-bordered w-full"
          name="category_id"
          value={formData.category_id}
          onChange={handleCategoryChange}
          required
        >
          <option value="" disabled>
            Chọn danh mục sản phẩm
          </option>
          <option value="1">Han Solo</option>
          <option value="2">Greedo</option>
        </select>
      </div>
      <div>
        <button className="btn btn-outline">Tạo thêm sản phẩm</button>
      </div>
    </div>
  );
};

export default Tab2;
