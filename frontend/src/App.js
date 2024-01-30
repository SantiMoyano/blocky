import "./App.css";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Projects from "./components/Projects";
import DetailedProject from "./pages/DetailedProject";
import DetailedEpic from "./pages/DetailedEpic";
import DetailedTask from "./pages/DetailedTask";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./layout/Header";

function App() {
  return (
    <div className="App">
      <Header />
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
