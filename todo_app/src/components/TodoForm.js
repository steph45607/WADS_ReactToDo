import React from 'react';
import { useState } from 'react';
import "../App.css";
import Filter from './Filter';
import CheckBtn from './CheckBtn';
import {db} from "../firebase"
import {collection, addDoc, Timestamp} from "firebase/firestore"
import { async } from '@firebase/util';

// functional component of the todo form
function TodoForm() {
  // states
  const [newTask, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  // const [checked, setChecked] = useState(false);

  // functional component of Todo
  function Todo(props) {
    
// function to delete the task
    function deleteTask(){
        const newArray = tasks.filter(task => task.id !== props.taskKey);
        setTasks(newArray);
    }
    // whats printed to the browser
  return (
    <div className="patty">
        {/* <CheckBtn handleCheck={handleCheck}></CheckBtn> */}
        <input type="checkbox"></input>
        <h4>{props.value}</h4>
        <button className='pattyBtn' onClick={() => deleteTask()}>Delete</button>
    </div>
  )
  }
  // functio to add task
  function addTask(){

    if(!newTask){
      alert("Task can not be empty. Please enter a task!")
      return;
    }

    console.log(newTask);
    const task = {
      id: Math.floor(Math.random()*1000),
      value: newTask,
      status: false
    };

    setTasks(oldList => [...oldList, task]);

    setTask("");
    console.log(tasks);
  }
  // when submit to the database
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      await addDoc(collection(db, "tasks"), {
        newTask: newTask
      })
      // onClose()
    }
    catch(err){
      alert(err)
    }
  };
// Whats printed to the browser
  return (<>
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Type here' value={newTask} onChange={e => setTask(e.target.value)}></input>
        <button type="submit" onClick={()=>addTask()}>Submit</button>
      </form>
    </div>
    <div>
      <Filter></Filter>
    </div>
    <div>
      {/* repeat and place so the container can be added here */}
    {tasks.map(task =>{
            return (
              <Todo taskKey={task.id} value ={task.value} status={task.status}></Todo>
            )
          })}
    </div> 
    </>
  )
}


export default TodoForm;
