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
    const note = {
      _id: "616a7d2f166866f2e3bf2c",
      user: "61609c0cc103ba0bc5cdf1de",
      title: title,
      description: description,
      tag: tag,
      date: "2021-10-16T07:20:15.160Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete a Note when our task is over
  const deleteNote = (id) => {
    console.log("Deleting the note with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call for editing notes in backend
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MDljMGNjMTAzYmEwYmM1Y2RmMWRlIn0sImlhdCI6MTYzMzk0MzA2N30.C1RNHawqSxaV3JKu5bih1ObCLdXKl96IubW13TALrfY",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Logic to edit in client side
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
