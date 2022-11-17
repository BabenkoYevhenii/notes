import ReactMarkdown from "react-markdown";

import {useDispatch, useSelector} from "react-redux";
import {notesFetched, setViewMod, notesUpdate} from "../notesSlice";
import {useEffect} from "react";
// @ts-ignore
const Main = ({activeNote, onUpdateNote}) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const viewMod = useSelector((state) => state.notes.viewMod)
    // @ts-ignore
    const notes = useSelector((state) => state.notes)
    // @ts-ignore
    useEffect(() => {
        // @ts-ignore
    const data= notes.notes.filter((item) => item.id == activeNote.id)
    }, [activeNote])


    // @ts-ignore
    const onEditField = (field, value) => {
        onUpdateNote({
            ...activeNote,
            [field]: value,
            lastModified: Date.now(),
        });
    };

    if (!activeNote) return <div className="no-active-note">No Active Note</div>;
    console.log(activeNote);
    return (
        <div className="app-main">
            {viewMod ? (   <div className="app-main-note-edit">
                <input
                    type="text"
                    id="title"
                    placeholder="Note Title"
                    value={activeNote.title}
                    onChange={(e) => onEditField("title", e.target.value)}
                    autoFocus
                />
                <textarea
                    id="body"
                    placeholder="Write your note here..."
                    value={activeNote.body}
                    onChange={(e) => onEditField("body", e.target.value)}
                />
                {activeNote.creating === 'add' ? (<button onClick={() => {
                    onEditField("creating", 'update')
                    dispatch(notesFetched(activeNote));
                    dispatch(setViewMod(false));
                }} role="button">Add</button>) : (<></>)}
                {activeNote.creating === 'update' ? (<button onClick={() => {
                    dispatch(notesUpdate(activeNote));
                    dispatch(setViewMod(false));
                }} role="button">Update</button>) : (<></>)}


                <button onClick={() => {
                    dispatch(setViewMod(false));
                }} role="button" style={{transform: 'translate(140%,-100%)'}}>Cancel</button>
            </div>) : ( <div className="app-main-note-preview">
                <h1 className="preview-title">{activeNote.title}</h1>
                <ReactMarkdown className="markdown-preview">
                    {activeNote.body}
                </ReactMarkdown>
                <small className="note-meta">
                    Last Modified{" "}
                    {new Date(activeNote.lastModified).toLocaleDateString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </small>
            </div>)}


        </div>
    );
};

export default Main;
