import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [navigate]);

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
        setFormData({
          name: data.user.name,
          email: data.user.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        props.showAlert('Failed to fetch user data', 'danger');
      }
    } catch (error) {
      props.showAlert('Error fetching user data', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      props.showAlert('New passwords do not match', 'danger');
      return;
    }
    
    // Here you would typically make an API call to update the user profile
    // For now, we'll just show a success message
    props.showAlert('Profile updated successfully', 'success');
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <i className="fas fa-user-circle fa-5x text-primary mb-3"></i>
                  {editMode && (
                    <button 
                      className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle"
                      style={{ width: '40px', height: '40px' }}
                    >
                      <i className="fas fa-camera"></i>
                    </button>
                  )}
                </div>
                <h2 className="fw-bold">{user?.name}</h2>
                <p className="text-muted">{user?.email}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">
                      <i className="fas fa-user me-2"></i>Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      <i className="fas fa-envelope me-2"></i>Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      required
                    />
                  </div>
                </div>

                {editMode && (
                  <>
                    <hr className="my-4" />
                    <h5 className="fw-semibold mb-3"><i className="fas fa-lock me-2"></i>Change Password</h5>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="currentPassword" className="form-label">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          placeholder="Enter current password..."
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="newPassword" className="form-label">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="Enter new password..."
                          minLength={5}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm new password..."
                          minLength={5}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="d-flex justify-content-center gap-3 mt-4">
                  {editMode ? (
                    <>
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save me-2"></i>Save Changes
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => setEditMode(false)}
                      >
                        <i className="fas fa-times me-2"></i>Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => setEditMode(true)}
                    >
                      <i className="fas fa-edit me-2"></i>Edit Profile
                    </button>
                  )}
                </div>
              </form>

              <hr className="my-4" />

              <div className="row text-center">
                <div className="col-md-4">
                  <div className="p-3">
                    <i className="fas fa-calendar-alt fa-2x text-primary mb-2"></i>
                    <h5>Member Since</h5>
                    <p className="text-muted">January 2024</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3">
                    <i className="fas fa-sticky-note fa-2x text-primary mb-2"></i>
                    <h5>Total Notes</h5>
                    <p className="text-muted">0 Notes</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3">
                    <i className="fas fa-clock fa-2x text-primary mb-2"></i>
                    <h5>Last Active</h5>
                    <p className="text-muted">Just now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
