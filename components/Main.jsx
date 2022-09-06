import { useContext, useState, useEffect } from "react";
import { NotesContext } from "../utils/notesContext";

const Main = () => {
  const { notes, activeNoteId, onUpdateNote, onDeleteNote } =
    useContext(NotesContext);

  const [anote, setANote] = useState();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  const [isEdit, setEdit] = useState(true); // useState(false);

  useEffect(() => {
    const note = notes.find((note) => note.id === activeNoteId);
    if (note) {
      setANote(note);
      setNoteTitle(note.fields.title);
      setNoteText(note.fields.text);
    }
    // setEdit(false);
  }, [activeNoteId, notes]);
  //   }, [activeNoteId]);

  if (!activeNoteId || !anote)
    return <div className="text-center font-semibold">No active note</div>;

  return (
    <>
      <div className="flex m-4 gap-x-8">
        <button
          className="hover:bg-green-500 hover:text-white"
          onClick={() => {
            setEdit(!isEdit);
          }}
        >
          {`${isEdit ? "Editing" : "Reading"}`}
        </button>
        <button
          className="hover:bg-red-500 hover:text-white"
          onClick={() => {
            onDeleteNote(activeNoteId);
          }}
        >
          Delete
        </button>
      </div>
      {isEdit && (
        <div className="flex flex-col w-2/3 gap-y-4">
          <input
            className="border p-2"
            type="text"
            id="title"
            placeholder="Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            autoFocus
            onBlur={(e) => {
              e.preventDefault();
              // executeSave();
            }}
          />
          <textarea
            className="border p-2"
            id="text"
            placeholder="Write your note here..."
            value={noteText}
            rows={10}
            onChange={(e) => setNoteText(e.target.value)}
            onBlur={(e) => {
              e.preventDefault();
              // executeSave();
            }}
          />
          <button
            className="border border-blue-500 px-2 py-1.5 hover:bg-blue-400"
            onClick={() => {
              onUpdateNote({
                id: activeNoteId,
                title: noteTitle,
                text: noteText,
              });
              // onUpdateNote({
              //   ...anote,
              //   fields: { title: noteTitle, text: noteText },
              // });
            }}
          >
            Update
          </button>
        </div>
      )}
      <br />
      <hr />
      <br />
      <div className="flex flex-col gap-8">
        <h1>{anote?.fields?.title}</h1>
        <div className="break-words">{anote?.fields?.text}</div>
      </div>
    </>
  );
};

export default Main;
