import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useHistory();
  let host = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json.authToken);

    if (json.success) {
      // Save the auth token and Redirect if success equals true
      localStorage.setItem("token", json.authToken);
      history.push("/");
    } else {
      alert("invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <h3 id="signin__title">Sign in</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" id="submit__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
