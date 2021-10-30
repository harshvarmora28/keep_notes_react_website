import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);

  const updateNote = (note) => {
    ref.current.click();
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
              >
              </button>
            </div>
            <div className="modal-body">
              {/* <form>
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
                  />
                </div>
              </form> */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                // onClick={handleAddNote}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <h3>Your Notes</h3>
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
