import "./App.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Projects from "./components/projects/Projects";
import DetailedProject from "./components/detailedProject/DetailedProject";
import DetailedEpic from "./components/epics/DetailedEpic";
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
        <Route path="/project/:projectId" element={<DetailedProject />} />
        <Route path="/epic/:epicId" element={<DetailedEpic />} />
      </Routes>
    </div>
  );
}

export default App;
