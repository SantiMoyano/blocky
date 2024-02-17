import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import DetailedEpic from "./pages/epic/DetailedEpic";
import DetailedProject from "./pages/DetailedProject";
import DetailedTask from "./pages/DetailedTask";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Projects from "./components/Projects";
import Register from "./pages/register/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(null);
  }

  function handleSuccessfullLogin() {
    setIsLoggedIn(true);
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleLogin={handleSuccessfullLogin}
              handleLogout={handleLogout}
              username={username}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login handleLogin={() => setIsLoggedIn(true)} />}
        ></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/project/:projectId" element={<DetailedProject />} />
        <Route path="/epic/:epicId" element={<DetailedEpic />} />
        <Route path="/task/:taskId" element={<DetailedTask />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
