import {useEffect, useState} from "react";
import uuid from "react-uuid";
import "./App.css";
import Main from "./components/main/Main";
import Sidebar from "./components/sidebar/Sidebar";
import {useDispatch} from "react-redux";
import {notesFetched,  setViewMod} from "./components/notesSlice";

function App() {
    const [notes, setNotes] = useState(
        localStorage.notes ? JSON.parse(localStorage.notes) : []
    );
    const [activeNote, setActiveNote] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const onAddNote = () => {
        const newNote = {
            id: uuid(),
            title: "Untitled Note",
            body: "",
            lastModified: Date.now(),
            creating: "add",
        };

        dispatch(setViewMod(true));

        setNotes([newNote, ...notes]);
        // @ts-ignore
        setActiveNote(newNote.id);
    };
// @ts-ignore
    const onDeleteNote = (noteId) => {
        // @ts-ignore
        setNotes(notes.filter(({id}) => id !== noteId));
    };
// @ts-ignore
    const onUpdateNote = (updatedNote) => {
        // @ts-ignore
        const updatedNotesArr = notes.map((note) => {
            if (note.id === updatedNote.id) {
                return updatedNote;
            }
            return note;
        });
        setNotes(updatedNotesArr);
    };
    const getActiveNote = () => {
        // @ts-ignore
        return notes.find(({id}) => id === activeNote);
    };
    return (
        <div className="App">
            <Sidebar

                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
            />
            <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
        </div>
    );
}

export default App;
