import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemsTable.css'; // Import CSS file for styling

const ItemsTable = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/products');
      setItems(response.data.products.Items);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to fetch items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (productId) => {
    try {
      console.log(`Attempting to delete product with ID: ${productId}`);
      const newItem = { productId };
      console.log(`Attempting to delete product with ID: ${newItem.productId}`);
      
      const response = await axios.delete('/api/product', {
        headers: { 'Content-Type': 'application/json' },
        data: newItem,
      });

      if (response.status === 200) {
        fetchItems();
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const updateItem = async (productId) => {
    const updateKey = prompt('Enter the field to update (e.g., price, name, stock):');
    const updatedValue = prompt(`Enter new value for ${updateKey}:`);
    if (!updateKey || !updatedValue) return;

    try {
      await axios.patch('/api/product', {
        productId,
        updateKey,
        product: updatedValue,
      });
      fetchItems();
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const addItem = async () => {
    const newItem = {
      productId: prompt('Enter Product ID:'),
      price: parseFloat(prompt('Enter Price:')),
      name: prompt('Enter Name:'),
      description: prompt('Enter Description:'),
      category: prompt('Enter Category:'),
      stock: parseInt(prompt('Enter Stock:'), 10),
    };

    if (!newItem.productId || isNaN(newItem.price) || isNaN(newItem.stock)) {
      alert('Invalid input. Make sure to fill out all fields correctly.');
      return;
    }

    try {
      await axios.post('/api/product', newItem, {
        headers: { 'Content-Type': 'application/json' },
      });
      fetchItems();
    } catch (err) {
      console.error('Error adding item:', err);
      alert('Failed to add item. Please try again.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="table-container">
      <h1 className="title">Products</h1>
      {items.length > 0 ? (
        <table className="items-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Price</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.productId}>
                <td>{item.productId}</td>
                <td>{item.price}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>
                  <button onClick={() => updateItem(item.productId)}>Update</button>
                  <button onClick={() => deleteItem(item.productId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-items">No items found.</div>
      )}
      <button className="add-button" onClick={addItem}>
        Add New Entry
      </button>
    </div>
  );
};

export default ItemsTable;
