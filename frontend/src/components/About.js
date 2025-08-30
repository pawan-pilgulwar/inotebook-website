import React from 'react'

const About = () => {
  return (
    <div className="container">
      <div className="section-header">
        <h1>About iNotebook</h1>
        <p>Your secure, cloud-based note-taking solution</p>
      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="add-note-form">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="text-center">
                  <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                  <h4>Secure & Private</h4>
                  <p className="text-muted">Your notes are encrypted and stored securely in the cloud. Only you have access to your personal data.</p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="text-center">
                  <i className="fas fa-sync-alt fa-3x text-primary mb-3"></i>
                  <h4>Sync Across Devices</h4>
                  <p className="text-muted">Access your notes from anywhere, anytime. Your data syncs automatically across all your devices.</p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="text-center">
                  <i className="fas fa-tags fa-3x text-primary mb-3"></i>
                  <h4>Smart Organization</h4>
                  <p className="text-muted">Organize your notes with tags and categories. Find what you need quickly and efficiently.</p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="text-center">
                  <i className="fas fa-mobile-alt fa-3x text-primary mb-3"></i>
                  <h4>Responsive Design</h4>
                  <p className="text-muted">Beautiful, responsive interface that works perfectly on desktop, tablet, and mobile devices.</p>
                </div>
              </div>
            </div>
            
            <hr className="my-4" />
            
            <div className="row">
              <div className="col-md-6">
                <h4><i className="fas fa-rocket me-2"></i>Features</h4>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Create and edit notes instantly</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Organize with tags and categories</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Secure user authentication</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Real-time updates</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Cross-platform compatibility</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Modern, intuitive interface</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h4><i className="fas fa-cogs me-2"></i>Technology Stack</h4>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fab fa-react text-primary me-2"></i>React.js Frontend</li>
                  <li className="mb-2"><i className="fab fa-node-js text-success me-2"></i>Node.js Backend</li>
                  <li className="mb-2"><i className="fas fa-database text-warning me-2"></i>MongoDB Database</li>
                  <li className="mb-2"><i className="fas fa-key text-info me-2"></i>JWT Authentication</li>
                  <li className="mb-2"><i className="fab fa-bootstrap text-primary me-2"></i>Bootstrap 5</li>
                  <li className="mb-2"><i className="fab fa-font-awesome text-info me-2"></i>FontAwesome Icons</li>
                </ul>
              </div>
            </div>
            
            <hr className="my-4" />
            
            <div className="text-center">
              <h4>Get Started Today</h4>
              <p className="text-muted mb-4">Join thousands of users who trust iNotebook for their note-taking needs.</p>
              <div className="d-flex justify-content-center gap-3">
                <a href="/signup" className="btn btn-primary">
                  <i className="fas fa-user-plus me-2"></i>Create Account
                </a>
                <a href="/login" className="btn btn-outline-primary">
                  <i className="fas fa-sign-in-alt me-2"></i>Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
