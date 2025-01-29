import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemsTable = () => {
  const [items, setItems] = useState([]); // Store the extracted items here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://umy34nu3mj.execute-api.eu-north-1.amazonaws.com/prod/products');
      // Extract the "Items" array from the response
      setItems(response.data.products.Items);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to fetch items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto mt-6 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      {items.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Product ID</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.productId}>
                <td className="border border-gray-300 px-4 py-2">{item.productId}</td>
                <td className="border border-gray-300 px-4 py-2">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No items found.</div>
      )}
    </div>
  );
};

export default ItemsTable;
