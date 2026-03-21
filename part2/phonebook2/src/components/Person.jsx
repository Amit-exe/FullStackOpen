import React from "react";

function Person({ filteredPerson2, handleDelete }) {
  return (
    <div>
      {filteredPerson2.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={()=>handleDelete(person._id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
}

export default Person;
