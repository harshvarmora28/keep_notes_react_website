import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "616a7d2f166bd866f2e3bf2c",
          "user": "61609c0cc103ba0bc5cdf1de",
          "title": "CSSI internship",
          "description": "Please work on cssi internship today",
          "tag": "personal",
          "date": "2021-10-16T07:20:15.160Z",
          "__v": 0
        },
        {
          "_id": "616a7df166bd866f2e3bf2",
          "user": "61609c0cc103ba0bc5cdf1de",
          "title": "internship",
          "description": "desc1",
          "tag": "personal",
          "date": "2021-10-16T07:20:15.160Z",
          "__v": 0
        },
        {
          "_id": "616a7d2f166bd86f2ebf2c",
          "user": "61609c0cc103ba0bc5cdf1de",
          "title": "Harsh Varmora",
          "description": "desc2",
          "tag": "personal",
          "date": "2021-10-16T07:20:15.160Z",
          "__v": 0
        },
        {
          "_id": "66a7d2f166bd66f2e3bf2c",
          "user": "61609c0cc103ba0bc5cdf1de",
          "title": "internship",
          "description": "desc1",
          "tag": "personal",
          "date": "2021-10-16T07:20:15.160Z",
          "__v": 0
        },
        {
          "_id": "616a7d2f16bd866f2ebf2c",
          "user": "61609c0cc103ba0bc5cdf1de",
          "title": "Harsh Varmora",
          "description": "desc2",
          "tag": "personal",
          "date": "2021-10-16T07:20:15.160Z",
          "__v": 0
        },
        {
          "_id": "616ad2f16bd866f2e3bf2c",
          "user": "61609c0cc103ba0bc5cdf1de",
          "title": "internship",
          "description": "desc1",
          "tag": "personal",
          "date": "2021-10-16T07:20:15.160Z",
          "__v": 0
        },
        {
          "_id": "616a7d2f166866f2e3bf2c",
          "user": "61609c0cc103ba0bc5cdf1de",
          "title": "Harsh Varmora",
          "description": "desc2",
          "tag": "personal",
          "date": "2021-10-16T07:20:15.160Z",
          "__v": 0
        }
      ]
      
      const [notes, setNotes] = useState(notesInitial);


      // Add a Note
      const addNote = (title, description, tag) => {
        console.log("Adding a new note")

        const note = {
          "_id": "616a7d2f166866f2e3bf2c",
          "user": "61609c0cc103ba0bc5cdf1de",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-10-16T07:20:15.160Z",
          "__v": 0
        };
          setNotes(notes.concat(note))
      }

      // Delete a Note when our task is over
      const deleteNote = () => {
        
      }

      // Edit a Note
      const editNote = () => {

      }


    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;