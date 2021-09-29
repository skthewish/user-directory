import "./Form.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../App";

import { baseUrl } from "../App";
import { onUpdate, onSubmit } from "../../actions/index";

function Form() {
  const { state, dispatch } = useContext(Context);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    dateOfBirth: "",
    age: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/user/${state.id}`);
        if (data) {
          setUser({
            name: data.name,
            username: data.username,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            age: data.age,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [state.id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!state.isUpdate) {
        const response = await axios.post(baseUrl, user);
        if (response) {
          dispatch(onSubmit());
          console.log(response);
        }
      } else {
        const response = await axios.patch(`${baseUrl}/${state.id}`, user);
        if (response) {
          dispatch(onUpdate());
          console.log(response);
        }
      }
    } catch (error) {
      error.response.data.message === "User already exists."
        ? setIsValidEmail(false)
        : setIsValidEmail(true);

      error.response.data.message === "Username already taken."
        ? setIsValidUsername(false)
        : setIsValidUsername(true);
      console.log(error.response.data.message);
    }

    setUser({
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      age: "",
    });
  };

  return (
    <div className="form-cntr">
      <div className="form-wrapper">
        <form onSubmit={submit}>
          <div className="form-group mb-2">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              value={user.name}
              className="form-control"
              id="name"
              placeholder="FirstName LastName"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              value={user.email}
              className="form-control"
              id="email"
              placeholder="example@gmail.com"
              onChange={handleChange}
              required
            />
            <span className="error-msg">
              {!isValidEmail ? "User already exists" : ""}
            </span>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              name="username"
              value={user.username}
              className="form-control"
              id="username"
              placeholder="username"
              onChange={handleChange}
              required
            />
            <span className="error-msg">
              {!isValidUsername ? "Username already taken" : ""}
            </span>
          </div>
          <div className="form-group mb-2">
            <label htmlFor="date">Date of Birth :</label>
            <input
              type="date"
              name="dateOfBirth"
              value={user.dateOfBirth}
              className="form-control"
              id="date"
              placeholder=""
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-2 w-50">
            <label htmlFor="age">Age :</label>
            <input
              type="Number"
              name="age"
              value={user.age}
              className="form-control"
              id="age"
              placeholder="age"
              onChange={handleChange}
            />
          </div>

          {state.isUpdate ? (
            <button type="submit" className="btn btn-primary w-100 h-100 mt-2">
              Update
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-100 h-100 mt-2">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
