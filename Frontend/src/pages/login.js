import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css"



const Login = () => {
    const [userName , setUserName] = useState("");
    const [password, setPassword] = useState("")


    return(
      <body class="d-flex align-items-center py-4 bg-body-tertiary">
        <main className="form-signin w-100 m-auto">
        
        <form className="form-signin">
        <img className="mb-4 center" src="grammerCheck.png" alt="" width="100" height="100" style={{marginLeft: 65}}/>
     
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
            //   value={formData.username}
            //   onChange={handleChange}
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
            //   value={formData.password}
            //   onChange={handleChange}
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
        </form>
      </main>
      </body>
    );

};

export default Login;

