import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authcontext.jsx";

const Login = () => {
  const [input, setinput] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const root = "http://localhost:8800/api/";
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${root}auth/login`, input, {
        withCredentials: true,
      });
      login(res.data);
      navigate("/");
      // console.log(res);
    } catch (err) {
      seterror(err.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        ></input>
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        ></input>
        <button onClick={onSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
