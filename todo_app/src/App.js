import './App.css';
import Title from "./components/Title"
import TodoForm from './components/TodoForm';
import Name from './components/Name';

function App() {
  return (
    <div className="app">
      <div className="header">
        <Title></Title>
      </div>
      <div>
        <TodoForm></TodoForm>
      </div>
      <div className='bottomBun'>
        <Name></Name>
      </div>
    </div>
  );
}

export default App;