import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router';

const Dashboard = (props) => {
  const context = useContext(noteContext);
  const { notes, getNote } = context;
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalNotes: 0,
    recentNotes: 0,
    tags: [],
    mostUsedTag: ''
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
    } else {
      navigate('/login');
    }
  }, [getNote, navigate]);

  useEffect(() => {
    if (notes.length > 0) {
      const tags = notes.map(note => note.tag).filter(tag => tag);
      const tagCounts = {};
      tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
      
      const mostUsedTag = Object.keys(tagCounts).reduce((a, b) => 
        tagCounts[a] > tagCounts[b] ? a : b, '');
      
      setStats({
        totalNotes: notes.length,
        recentNotes: notes.filter(note => {
          const noteDate = new Date(note.date);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return noteDate > weekAgo;
        }).length,
        tags: Object.keys(tagCounts),
        mostUsedTag: mostUsedTag
      });
    }
  }, [notes]);

  const getRecentNotes = () => {
    return notes
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 fw-bold text-center mb-3">Dashboard</h1>
          <p className="lead text-center text-muted">Welcome back! Here's an overview of your notes and activity</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-5">
        <div className="col-md-3 mb-3">
          <div className="card text-center h-100 shadow-sm border-0">
            <div className="card-body">
              <i className="fas fa-sticky-note fa-3x text-primary mb-3"></i>
              <h3 className="card-title fw-bold">{stats.totalNotes}</h3>
              <p className="card-text text-muted">Total Notes</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center h-100 shadow-sm border-0">
            <div className="card-body">
              <i className="fas fa-clock fa-3x text-success mb-3"></i>
              <h3 className="card-title fw-bold">{stats.recentNotes}</h3>
              <p className="card-text text-muted">Recent Notes</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center h-100 shadow-sm border-0">
            <div className="card-body">
              <i className="fas fa-tags fa-3x text-warning mb-3"></i>
              <h3 className="card-title fw-bold">{stats.tags.length}</h3>
              <p className="card-text text-muted">Unique Tags</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center h-100 shadow-sm border-0">
            <div className="card-body">
              <i className="fas fa-star fa-3x text-info mb-3"></i>
              <h3 className="card-title fw-bold">{stats.mostUsedTag || 'None'}</h3>
              <p className="card-text text-muted">Most Used Tag</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Notes */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0"><i className="fas fa-history me-2"></i>Recent Notes</h5>
            </div>
            <div className="card-body">
              {getRecentNotes().length > 0 ? (
                <div className="row">
                  {getRecentNotes().map((note) => (
                    <div key={note._id} className="col-md-6 mb-3">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                          <h6 className="card-title fw-bold">{note.title}</h6>
                          <p className="card-text small">{note.description.substring(0, 100)}...</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="badge bg-primary rounded-pill">
                              <i className="fas fa-tag me-1"></i>
                              {note.tag}
                            </span>
                            <small className="text-muted">
                              {new Date(note.date).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-sticky-note fa-3x text-muted mb-3"></i>
                  <h5>No notes yet</h5>
                  <p className="text-muted">Create your first note to get started!</p>
                  <a href="/" className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i>Create Note
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions & Tags */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0"><i className="fas fa-bolt me-2"></i>Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <a href="/" className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>Create New Note
                </a>
                <a href="/profile" className="btn btn-outline-primary">
                  <i className="fas fa-user me-2"></i>View Profile
                </a>
                <a href="/about" className="btn btn-outline-primary">
                  <i className="fas fa-info-circle me-2"></i>About iNotebook
                </a>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0"><i className="fas fa-tags me-2"></i>Your Tags</h5>
            </div>
            <div className="card-body">
              {stats.tags.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {stats.tags.map((tag, index) => (
                    <span key={index} className="badge bg-primary rounded-pill">
                      <i className="fas fa-tag me-1"></i>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No tags yet. Create notes with tags to organize your content.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
