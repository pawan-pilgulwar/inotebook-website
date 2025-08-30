import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const contex = useContext(noteContext);
  const { addNote } = contex;

  const [note, setnotes] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnotes({ title: "", description: "", tag: "" });
    props.showAlert("New note added successfully", "success");
  };

  const onChange = (e) => {
    setnotes({ ...note, [e.target.id]: e.target.value });
  };

  return (
    <div className="add-note-form">
      <h2><i className="fas fa-plus-circle me-2"></i>Add a New Note</h2>
      <form onSubmit={handleClick}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">
              <i className="fas fa-heading me-2"></i>Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="titleHelp"
              value={note.title}
              onChange={onChange}
              minLength={5}
              required
              placeholder="Enter note title..."
            />
            <div id="titleHelp" className="form-text">
              Give your note a descriptive title (minimum 5 characters)
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="tag" className="form-label">
              <i className="fas fa-tag me-2"></i>Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={note.tag}
              onChange={onChange}
              minLength={5}
              required
              placeholder="Enter tag (e.g., work, personal, ideas)..."
            />
            <div className="form-text">
              Add a tag to categorize your note (minimum 5 characters)
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <i className="fas fa-align-left me-2"></i>Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
            rows="4"
            placeholder="Write your note content here..."
          ></textarea>
          <div className="form-text">
            Describe your note in detail (minimum 5 characters)
          </div>
        </div>
        <div className="text-center">
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary btn-lg"
            onClick={handleClick}
          >
            <i className="fas fa-save me-2"></i>Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
