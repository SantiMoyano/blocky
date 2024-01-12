import "./App.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Projects from "./components/projects/Projects";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
      </Routes>
    </div>
  );
}

export default App;
