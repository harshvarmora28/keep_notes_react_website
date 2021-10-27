import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const s1 = {
        "name": "Harsh",
        "div": "1"
    }

    const [state, setState] = useState(s1)
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "bittu",
                "div": "2"
            })
        }, 1000);
    }

    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;