import React from 'react';
import "../styles/title.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import { useState, useEffect } from "react";
// import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {auth, logout} from "../firebase"
import Dashboard from "./Dashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import axios from axios

function Title() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [todos, setTodos] = useState([])
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("")
  const navigate = useNavigate();
  const fetchUserName = () => {
    try{setName(auth.currentUser.displayName);}
    catch (err) {
    console.error(err);
    console.error(error);
    }
  };


  const loadTodoAPI = () => {
    axios
      .get("http://localhost:8000/todos")
      .then((response) => {
        /*Object.keys(response.data).map((key) =>
          console.log(response.data[key])
        );*/
        setTodos(
          Object.keys(response.data).map((key) => ({
            id: key,
            data: response.data[key],
          }))
        );
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    //loadTodo(); // activate to connect with firestore
    loadTodoAPI(); //activate to cennect with our BAckend API
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="title">
      <header>Todo App</header>
      <div className="">
        <div className="">
          Logged in as
          <div>{name}</div>
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="title__container">
        <button onClick={() => setOpenAddModal(true)}>New Task +</button>
        <div className="title">
          {todos.map((todo)=>(
            <TodoList
            id={todo.id}
            key={todo.id}
            completed={todo.data.completed}
            title={todo.data.title}
            description={todo.data.description}
            />
          ))}
        </div>
      </div>

      {openAddModal && (
        <AddTodo onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
      <Dashboard></Dashboard>
    </div>
    
  );
}

export default Title;
