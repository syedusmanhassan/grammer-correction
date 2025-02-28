import { useState } from "react";
import "./login.css"
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate =useNavigate();

  const hardCodedAccessToken = "accessToken123";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: username,
        password: password,
      });
      if(response.data.message === "login successfully"){
        localStorage.setItem("token", hardCodedAccessToken);
        navigate("/Dashboard");
      }
      setMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Login Unsuccessful");
    }
  };

  return (
    <div className="main-container">
        <form className="form-signin" onSubmit={handleSubmit}>
          <div className="imgDiv">
            <img className="mb-4 center" src="grammerCheck.png" alt=""  />
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2 mt-4" type="submit">
            Login
          </button>

          {message && <p className="text-center mt-3">{message}</p>}
        </form>
    </div>
  );

};

export default Login;