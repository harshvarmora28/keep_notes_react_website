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
          "_id": "616a7d2f166bd866f2e3bf2c",
          "user": "61609c0cc103ba0bc5cdf1de",
          "title": "internship",
          "description": "Please work on cssi internship today",
          "tag": "personal",
          "date": "2021-10-16T07:20:15.160Z",
          "__v": 0
        },
        {
          "_id": "616a7d2f166bd866f2e3bf2c",
          "user": "61609c0cc103ba0bc5cdf1de",
          "title": "Harsh Varmora",
          "description": "Please work on cssi internship today",
          "tag": "personal",
          "date": "2021-10-16T07:20:15.160Z",
          "__v": 0
        }
      ]
      
      const [notes, setNotes] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;