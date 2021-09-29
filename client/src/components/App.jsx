import "./App.css";
import React, { createContext, useReducer } from "react";
import Users from "./users/Users";
import Form from "./form/Form";
import reducer from "../reducers/index";

export const baseUrl = "http://localhost:8001/users";
export const Context = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isUpdate: false,
    id: undefined,
    submit: false,
  });
  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="main-cntr">
        <Users />
        <Form />
      </div>
    </Context.Provider>
  );
}

export default App;
