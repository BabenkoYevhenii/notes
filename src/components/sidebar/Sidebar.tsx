// @ts-ignore
import {notesDeleted, setViewMod} from "../notesSlice";
import {useDispatch, useSelector} from "react-redux";

const Sidebar = ({
                     // @ts-ignore
                     onAddNote,
                     // @ts-ignore
                     onDeleteNote,
                     // @ts-ignore

                     activeNote,
                     // @ts-ignore
                     setActiveNote,
                 }) => {
    // @ts-ignore
    const notes = useSelector((state) => state.notes)
    console.log(notes);
    // @ts-ignore
    const sortedNotes = Array.isArray(notes.notes) ? notes.notes.slice().sort((a, b) => b.lastModified - a.lastModified) : [];
    console.log(sortedNotes);
    const dispatch = useDispatch();
    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>Notes</h1>
                <button onClick={onAddNote}>Create</button>
            </div>
            <div className="app-sidebar-notes">

                {// @ts-ignore
                    sortedNotes.map(({id, title, body, lastModified}, i) => (
                        <div
                            className={`app-sidebar-note ${id === activeNote && "active"}`}
                            onClick={() => setActiveNote(id)}
                        >
                            <div className="sidebar-note-title">
                                <strong>{title}</strong>
                                <button onClick={(e) => {
                                    // eslint-disable-next-line no-restricted-globals
                                    const result = confirm('you want to delete?');
                                    if (result) {
                                        onDeleteNote(id)
                                        dispatch(notesDeleted(id));
                                    } else {

                                    }


                                }}>Delete
                                </button>
                                <button onClick={(e) => {
                                    dispatch(setViewMod(true));
                                }}>Change
                                </button>
                            </div>

                            <p>{body && body.substr(0, 100) + "..."}</p>
                            <small className="note-meta">
                                Last Modified{" "}
                                {new Date(lastModified).toLocaleDateString("en-GB", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </small>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Sidebar;
