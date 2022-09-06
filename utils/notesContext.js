import { useState, createContext } from "react";
import { v4, v1 } from "uuid";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const [activeNote, setActiveNote] = useState();
  const [activeNoteId, setActiveNoteId] = useState("");

  const onAddNote = async () => {
    const newNote = {
      id: v4(),
      title: v4().substring(0, 8 + 1 + 4), // uuid v4 partitioned as 8-4-... characters
      text: "Start writing...",
      cAt: Date.now(),
      uAt: Date.now(),
    };

    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newNote.title, text: newNote.text }),
      });

      const newItem = await res.json();

      // then we will update the 'items' adding the newly added item to it
      setNotes((prev) => [...prev, newItem]);
      setActiveNoteId(newNote.id);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateNote = async (updatedNote) => {
    try {
      const res = await fetch("/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: updatedNote.id,
          title: updatedNote.title,
          text: updatedNote.text,
        }),
      });

      const updatedItem = await res.json();

      const updatedNotesArr = notes.map((note) => {
        if (note.id === updatedNote.id) {
          return updatedItem;
        }

        return note;
      });

      setNotes(updatedNotesArr);
      // setActiveNoteId(updatedItem.id);
      // setActiveNoteId();
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteNote = async (id) => {
    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const filteredNotes = notes.filter((note) => note.id !== id);
      setNotes(filteredNotes);
      setActiveNoteId(filteredNotes.length > 0 ? filteredNotes[0].id : null);
    } catch (error) {
      console.error(error);
    }
  };

  const getActiveNote = () => {
    // const found1 = notes.filter((note) => note.id === activeNoteId);
    const found2 = notes.find((note) => note.id === activeNoteId);

    return found2;
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        activeNoteId,
        setActiveNoteId,
        getActiveNote,

        activeNote,
        setActiveNote,

        onAddNote,
        onUpdateNote,
        onDeleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesProvider };
