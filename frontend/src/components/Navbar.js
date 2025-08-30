import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-book-open me-2"></i>
            iNotebook
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem('token') && (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==="/"?"active" : ""}`} aria-current="page" to="/">
                      <i className="fas fa-home me-1"></i>Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==="/dashboard"?"active" : ""}`} to="/dashboard">
                      <i className="fas fa-tachometer-alt me-1"></i>Dashboard
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active" : ""}`} to="/about">
                  <i className="fas fa-info-circle me-1"></i>About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? (
              <div className="d-flex" role="search">
                <Link className="btn btn-primary mx-1" to='/login' role="button">
                  <i className="fas fa-sign-in-alt me-1"></i>Login
                </Link>
                <Link className="btn btn-outline-primary mx-1" to='/signup' role="button">
                  <i className="fas fa-user-plus me-1"></i>Signup
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <div className="dropdown">
                  <button className="btn btn-outline-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fas fa-user-circle me-1"></i>
                    {user?.name || 'User'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="fas fa-user me-2"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/dashboard">
                        <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
