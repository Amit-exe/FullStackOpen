import React from "react";

function PersonForm({
  handleSubmit,
  newName,
  phoneNo,
  setNewName,
  setPhoneNo,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <br />
          phone number:{" "}
          <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
