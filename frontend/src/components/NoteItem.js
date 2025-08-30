import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {

  const contex = useContext(noteContext);
  const {deleteNote} = contex;

  const handleDelete = ()=> {
    deleteNote(props.note._id);
    props.showAlert("Deleted successfully", "success")
  }

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title flex-grow-1 me-3">{props.note.title}</h5>
          <div className="d-flex gap-2">
            <i 
              className="fa-regular fa-pen-to-square" 
              onClick={()=>{props.updateNote(props.note)}}
              title="Edit note"
            ></i>
            <i 
              className="fa-regular fa-trash-can" 
              onClick={handleDelete}
              title="Delete note"
            ></i>
          </div>
        </div>
        <p className="card-text flex-grow-1 mb-3">{props.note.description}</p>
        <div className="mt-auto">
          <span className="badge bg-primary rounded-pill">
            <i className="fas fa-tag me-1"></i>
            {props.note.tag}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
