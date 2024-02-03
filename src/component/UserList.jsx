import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:1001/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    // Menampilkan konfirmasi sebelum menghapus
    const userConfirmed = window.confirm('Apakah Anda yakin ingin menghapus produk ini?');

    // Jika pengguna mengonfirmasi, maka lakukan penghapusan
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:1001/products/${userId}`);
        console.log(`Product with ID ${userId} deleted successfully.`);
        // Refresh daftar produk setelah menghapus
        getUsers();
      } catch (error) {
        console.error(`Error deleting product with ID ${userId}:`, error);
      }
    } else {
      console.log('Penghapusan produk dibatalkan oleh pengguna.');
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger"
                >
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

export default Userlist;