import  { useState } from 'react';
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
    const file = e.target.files[0]
    tranformfile(file)
  };
const tranformfile =(file)=>{
  const reader = new FileReader()
  if(file){
    reader.readAsDataURL(file)
    reader.onload=()=>{
      setFile(reader.result);
    }
  }
  else{
    setFile("")
  }
}
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category_id', formData.category_id);
    data.append('image',file)
    try {
      // Gửi dữ liệu lên server
      const response = await axios.post("http://localhost:3000/api/v1/createProduct", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Product created:", response);
    } catch (error) {
      console.error("Error creating product:", error);
    }
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
        <img src={file} alt="" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
