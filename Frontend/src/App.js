
// import './App.css';
import Dashboard from "./pages/Dashboard";
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

// import "./pages/login.css"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/Dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
      </Routes>
    </Router>
    //  <Dashboard />
  );
}

export default App;
