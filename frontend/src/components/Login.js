import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
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
    if (json.success) {
      // save the auth-token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="add-note-form">
            <div className="text-center mb-4">
              <i className="fas fa-user-circle fa-3x text-primary mb-3"></i>
              <h2>Welcome Back</h2>
              <p className="text-muted">Sign in to access your notes</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="fas fa-envelope me-2"></i>Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={credentials.email}
                  onChange={onChange}
                  aria-describedby="emailHelp"
                  autoComplete="email"
                  placeholder="Enter your email..."
                  required
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  <i className="fas fa-lock me-2"></i>Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={credentials.password}
                  onChange={onChange}
                  autoComplete="current-password"
                  placeholder="Enter your password..."
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  <i className="fas fa-sign-in-alt me-2"></i>Sign In
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="mb-0">
                Don't have an account? 
                <a href="/signup" className="text-primary text-decoration-none ms-1">
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
