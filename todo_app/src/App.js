import './App.css';
import Title from "./components/Title"
import TodoForm from './components/TodoForm';
import Name from './components/Name';
function App() {
  // const[task, setTask] = useState(["taskArr"]);
  // function addTask(){
  //   setTask([...task, "taskArr", "steph"])
  // }
  return (
    <div className="app">
      <div className="header">
        <Title></Title>
      </div>
      <div className="form">
        <TodoForm></TodoForm>
      </div>
      <div className='filter'>
      </div>
      <div className='list'>
        <p>task 1</p>
        <p>task 2</p>
        <p>task 3</p>
      </div>
      <div className='bottomBun'>
        <Name></Name>
      </div>
      {/* <TodoList></TodoList> */}
    </div>
  );
}

export default App;