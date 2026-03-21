import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

import personService from "./utils/Networking";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [search, setSearch] = useState("");

  const filteredPerson = persons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("tried to submit", newName);
    const newPerson = { name: newName, number: phoneNo };
    const isexist = persons.some(
      (p) => p.name.trim().toLowerCase() === newName.toLowerCase(),
    );
    console.log(isexist);

    if (isexist) {
      alert(`already exist ${newName}`);
      return;
    }

    personService.saveData(newPerson).then((res) => {
      console.log(res);
      setPersons((prev) => [...prev, res.data]);
    });

    setNewName("");
    setPhoneNo("");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    personService.getAll().then((res) => {
      console.log(res.data);
      setPersons(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    
    console.log(id);
    console.log('heheh');
    
    
    personService.deletePerson(id).then((res) => {  
      console.log(res);
      const newP = persons.filter((p) => p._id !== id);
      setPersons(newP);
    });
  };
  return (
    <div className="main-page">
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        phoneNo={phoneNo}
        newName={newName}
        setNewName={setNewName}
        setPhoneNo={setPhoneNo}
      />

      <h2>Numbers</h2>

      <Person filteredPerson2={filteredPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
