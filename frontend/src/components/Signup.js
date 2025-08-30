import { React, useState } from "react";
import { useNavigate } from "react-router";

const Signup = (props) => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cPassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }
    const response = await fetch(`https://inotebook-website-backend.onrender.com/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // save the auth-token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
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
              <i className="fas fa-user-plus fa-3x text-primary mb-3"></i>
              <h2>Create Account</h2>
              <p className="text-muted">Join iNotebook to start organizing your notes</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <i className="fas fa-user me-2"></i>Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={onChange}
                  aria-describedby="nameHelp"
                  placeholder="Enter your full name..."
                  required
                />
                <div id="nameHelp" className="form-text">
                  Enter your complete name as you'd like it to appear.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <i className="fas fa-envelope me-2"></i>Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
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
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  <i className="fas fa-lock me-2"></i>Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={onChange}
                  minLength={5}
                  required
                  autoComplete="new-password"
                  placeholder="Create a strong password..."
                />
                <div className="form-text">
                  Password must be at least 5 characters long.
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="cpassword" className="form-label">
                  <i className="fas fa-lock me-2"></i>Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  onChange={onChange}
                  minLength={5}
                  required
                  autoComplete="new-password"
                  placeholder="Confirm your password..."
                />
                <div className="form-text">
                  Please confirm your password to ensure accuracy.
                </div>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  <i className="fas fa-user-plus me-2"></i>Create Account
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="mb-0">
                Already have an account? 
                <a href="/login" className="text-primary text-decoration-none ms-1">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
