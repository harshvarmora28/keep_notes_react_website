import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import "./Notes.css";

const Notes = () => {
  const context = useContext(noteContext);
  const history = useHistory();

  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history.push("/signin");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    // console.log("Upadting the notes...", note)
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{visibility: "hidden"}}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-2">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=" etitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor=" description" className="form-label">
                    Description
                  </label>
                  <textarea
                    type="text-area"
                    rows="3"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor=" tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=" etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                    minLength={2}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
            <button
                type="button"
                className="btn btn-primary"
                id="update__btn"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
              >
                Update
              </button>
              <button
                ref={refClose}
                type="button"
                id="close__btn"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <h3 id="yourNotes__title">Your Notes</h3>
        <div className="container" id="noNotes">
          {notes.length === 0 && "Notes you add appear here"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
