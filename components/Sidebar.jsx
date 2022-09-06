import { useContext } from "react";
import { NotesContext } from "../utils/notesContext";

const Sidebar = () => {
  const { notes, activeNoteId, setActiveNoteId, onAddNote } =
    useContext(NotesContext);

  return (
    <>
      <button
        className="btn btn-primary ml-4"
        // className="hover:bg-blue-300 w-1/3 content-center"
        onClick={onAddNote}
      >
        +
      </button>
      {notes &&
        notes.map((note, idx) => {
          return (
            <div
              className={`cursor-pointer rounded-md hover:bg-green-300 p-4 my-4 mr-2 ${
                activeNoteId === note.id && "bg-gray-300"
              }`}
              key={idx}
              onClick={() => {
                setActiveNoteId(note.id);
              }}
            >
              <h1>{note.fields.title}</h1>
              <small className="text-xs text-primary">
                C:{" "}
                {new Date(note.fields.Created).toLocaleDateString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
                <br />
                U:{" "}
                {new Date(note.fields["Last Modified"]).toLocaleDateString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }
                )}
              </small>
            </div>
          );
        })}
    </>
  );
};

export default Sidebar;
