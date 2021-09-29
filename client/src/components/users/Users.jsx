import "./Users.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../App";

import axios from "axios";
import { baseUrl } from "../App";
import { onEdit } from "../../actions/index";

function Users(props) {
  const [users, setUsers] = useState([]);
  const { state, dispatch } = useContext(Context);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(baseUrl);
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [state.isUpdate, state.submit]);

  const handleEdit = (e) => {
    const { id } = e.target;
    dispatch(onEdit(id));
  };

  const handleDelete = async (e) => {
    const { id } = e.target;
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      if (response) {
        console.log(response);
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-cntr">
      <div className="users-wrapper">
        <table className="table table-hover align-middle">
          <thead className="align-middle">
            <tr>
              <th style={{ width: "20px" }}></th>
              <th style={{ width: "150px" }}>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th style={{ width: "120px" }}>
                Date of Birth{" "}
                <span style={{ fontSize: "14px" }}>(yy-mm-dd)</span>
              </th>
              <th>Age</th>
              <th style={{ width: "30px" }}></th>
              <th style={{ width: "30px" }}></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.dateOfBirth || "-"}</td>
                  <td>{user.age || "-"}</td>
                  <td>
                    <button onClick={handleEdit}>
                      <i className="bi bi-pencil-square" id={user._id}></i>
                    </button>
                  </td>
                  <td>
                    <button onClick={handleDelete}>
                      <i className="bi bi-trash" id={user._id}></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
