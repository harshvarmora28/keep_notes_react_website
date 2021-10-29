import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);

  const { deleteNote } = context;
  const { note } = props;

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <i className="fas fa-trash-alt" onClick={() => {deleteNote(note._id)}}></i>
          <i className="fas fa-pen mx-3"></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
