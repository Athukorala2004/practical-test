import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  const API_URL = "http://localhost:5000/api/items";

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(API_URL, {
        name: form.name,
        price: Number(form.price),
        category: form.category,
      });

      setForm({
        name: "",
        price: "",
        category: "",
      });

      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container">
      <h1>Mini Item Manager</h1>

      <form className="item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <button type="submit">Add Item</button>
      </form>

      <div className="item-list">
        <h2>Items</h2>

        {items.length === 0 ? (
          <p>No items found</p>
        ) : (
          items.map((item) => (
            <div className="item-card" key={item._id}>
              <div>
                <h3>{item.name}</h3>
                <p>Price: Rs. {item.price}</p>
                <p>Category: {item.category}</p>
              </div>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;