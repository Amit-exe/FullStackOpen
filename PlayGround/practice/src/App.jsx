// import Note from "./components/Note";
// import Content from "../../../part2/courseinfo/src/Components/Content";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import noteService from "./services/notes";
// import Notification from "./components/Notification";
// const App = () => {
//   const [notes, setNotes] = useState(null);
//   const [newNote, setNewNote] = useState("");
//   const [showAll, setShowAll] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("Some error");
//   const toggleImportanceOf = (id) => {
//     const note = notes.find((n) => n.id == id);
//     const changedNote = { ...note, important: !note.important };

//     noteService
//       .update(id, changedNote)
//       .then((res) => {
//         console.log(res);
//         setNotes(notes.map((note) => (note.id === id ? res : note)));
//       })
//       .catch((error) => {
//         // alert(`the note '${note.content}' was already deleted from server`);
//         setErrorMessage(
//           `Note '${note.content}' was already removed from server`
//         );
//         setTimeout(() => {
//           setErrorMessage(null);
//         }, 5000);
//         setNotes(notes.filter((n) => n.id !== id));
//       });
//     console.log("importance of " + id + " needs to be toggled");
//   };

//   const noteToShow = showAll ? notes : notes.filter((note) => note.important);
//   console.log("hi");

//   useEffect(() => {
//     console.log("effect");
//     noteService.getAll().then((res) => {
//       console.log("promise fullfilled");

//       setNotes(res);
//     });
//   }, []);

//   console.log(noteToShow);
//   const addNote = function (e) {
//     e.preventDefault();
//     console.log("button clicked", e.target);
//     const noteObj = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: String(notes.length + 1),
//     };

//     noteService.create(noteObj).then((response) => {
//       console.log(response);
//       setNotes(notes.concat(response));
//       setNewNote("");
//     });
//   };

//   const handleNewNote = function (e) {
//     console.log(e.target);
//     setNewNote(e.target.value);
//   };

//   if (!notes) {
//     return null;
//   }
//   return (
//     <div>
//       <h1>Notes</h1>

//       <Notification message={errorMessage} />
//       <div>
//         <button
//           onClick={(e) => {
//             setShowAll(!showAll);
//           }}
//         >
//           {showAll ? "Show imp" : "Show all"}
//         </button>
//         +
//       </div>
//       <ul>
//         {noteToShow.map((note) => (
//           <Note
//             key={note.id}
//             note={note}
//             toggleImportance={() => toggleImportanceOf(note.id)}
//           />
//         ))}
//       </ul>
//       <form onSubmit={addNote}>
//         <input type="text" value={newNote} onChange={handleNewNote} />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   );
// };

// export default App;

// import { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [value, setValue] = useState("");
//   const [rates, setRates] = useState({});
//   const [currency, setCurrency] = useState(null);

//   useEffect(() => {
//     console.log("effect run, currency is now", currency);

//     // skip if currency is not defined
//     if (currency) {
//       console.log("fetching exchange rates...");
//       axios
//         .get(`https://open.er-api.com/v6/latest/${currency}`)
//         .then((response) => {
//           setRates(response.data.rates);
//         });
//     }
//   }, [currency]);

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   const onSearch = (event) => {
//     event.preventDefault();
//     setCurrency(value);
//   };

//   return (
//     <div>
//       <form onSubmit={onSearch}>
//         currency: <input value={value} onChange={handleChange} />
//         <button type="submit">exchange rate</button>
//       </form>
//       <pre>{JSON.stringify(rates, null, 2)}</pre>
//     </div>
//   );
// };

// export default App;

import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    let val = event.target.value;
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${val}`)
      .then((res) => {
        console.log(res.data);
      });
    setValue(val);
  };

  return (
    <div>
      Search Country: <input value={value} onChange={handleChange} />
    </div>
  );
};

export default App;
