import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [input, setinput] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const root = "http://localhost:8800/api/";

  const handleChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${root}auth/register`, input, {
        withCredentials: true,
      });
      navigate("/login");
      // console.log(res);
    } catch (err) {
      seterror(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        ></input>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        ></input>
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        ></input>
        <button onClick={onSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>
          Already have an account? <Link to="/login">Log In</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
