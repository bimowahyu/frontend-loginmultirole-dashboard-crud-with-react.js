import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:1001/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (productId) => {
    // Menampilkan konfirmasi sebelum menghapus
    const userConfirmed = window.confirm('Apakah Anda yakin ingin menghapus produk ini?');

    // Jika pengguna mengonfirmasi, maka lakukan penghapusan
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:1001/products/${productId}`);
        console.log(`Product with ID ${productId} deleted successfully.`);
        // Refresh daftar produk setelah menghapus
        getProducts();
      } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
      }
    } else {
      console.log('Penghapusan produk dibatalkan oleh pengguna.');
    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">List of Products</h2>
      <Link to="/products/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.user.name}</td>
              <td>
                <Link to={`/products/edit/${product.uuid}`} className="button is-small is-info">
                  Edit
                </Link>
                <button onClick={() => deleteProduct(product.uuid)} className="button is-small is-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
