import React, { useState } from 'react';
import axios from 'axios';

function App() {
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
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo FormData
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
  
    // Thêm tệp vào FormData
    if (file) {
      data.append("file", file);
    }
  
console.log(data)
    // try {
    //   // Gửi dữ liệu lên server
    //   const response = await axios.post("http://localhost:3333/api/v1/createProduct", data, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log("Product created:", response.data);
    // } catch (error) {
    //   console.error("Error creating product:", error);
    // }
  };
 
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          placeholder="Category ID"
          required
        />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
