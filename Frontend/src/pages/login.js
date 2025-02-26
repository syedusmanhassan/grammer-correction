import { useState } from "react";
import "./login.css"
import axios from "axios";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: username,
        password: password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Login Unsuccessful");
    }
  };

  return (
    <div class="conatainer">
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

          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Login
          </button>

          {message && <p className="text-center mt-3">{message}</p>}
        </form>
    </div>
  );

};

export default Login;