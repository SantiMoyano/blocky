import "./App.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Projects from "./components/projects/Projects";
import DetailedProject from "./components/projects/DetailedProject";
import DetailedEpic from "./components/epics/DetailedEpic";
import DetailedTask from "./components/tasks/DetailedTask";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";

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
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/project/:projectId" element={<DetailedProject />} />
        <Route path="/epic/:epicId" element={<DetailedEpic />} />
        <Route path="/task/:taskId" element={<DetailedTask />} />
      </Routes>
    </div>
  );
}

export default App;
