import "./App.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
