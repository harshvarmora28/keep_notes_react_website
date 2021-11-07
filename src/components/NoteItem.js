import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import "./NoteItem.css";

const NoteItem = (props) => {
  const context = useContext(noteContext);

  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-4">
      <div className="card border-0 my-3" style={{borderRadius: "14px", backgroundColor: "transparent"}}>
        <div className="card-body" id="noteItem" style={{borderRadius: "12px"}}>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <i className="fas fa-trash-alt" onClick={() => {deleteNote(note._id)}}></i>
          <i className="fas fa-pen mx-3" onClick={() => {updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
