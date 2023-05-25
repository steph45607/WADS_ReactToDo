import "./App.css";
import Title from "./components/Title";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Logout from "./components/Logout";
import Forms from "./components/form"
import Buttons from "./components/buttons"

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Title />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/forms" element={<Forms />} />
          <Route exact path="/buttons" element={<Buttons />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
