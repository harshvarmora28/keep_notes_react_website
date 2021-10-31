import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MDljMGNjMTAzYmEwYmM1Y2RmMWRlIn0sImlhdCI6MTYzMzk0MzA2N30.C1RNHawqSxaV3JKu5bih1ObCLdXKl96IubW13TALrfY",
      },
    });

    const json = await response.json();
    setNotes(json);
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API call for adding notes in backend
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MDljMGNjMTAzYmEwYmM1Y2RmMWRlIn0sImlhdCI6MTYzMzk0MzA2N30.C1RNHawqSxaV3JKu5bih1ObCLdXKl96IubW13TALrfY",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Logic to add note in client side
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note when our task is over

  
  const deleteNote = async (id) => {
    // API call to delete note in backend
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MDljMGNjMTAzYmEwYmM1Y2RmMWRlIn0sImlhdCI6MTYzMzk0MzA2N30.C1RNHawqSxaV3JKu5bih1ObCLdXKl96IubW13TALrfY",
      },
    });
    const json = response.json();


    // deleting a note in client
    // console.log("Deleting the note with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call for editing notes in backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MDljMGNjMTAzYmEwYmM1Y2RmMWRlIn0sImlhdCI6MTYzMzk0MzA2N30.C1RNHawqSxaV3JKu5bih1ObCLdXKl96IubW13TALrfY",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client side
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
