import React from "react";

function InputBox(props) {
  const { value, name, autoComplete, onChangefun, type } = props;
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">{name}</label>
        <input
          type={type}
          value={value}
          autoComplete={autoComplete}
          className="border rounded px-3 py-2 w-full"
          onChange={({ target }) => onChangefun(target.value)}
        />
      </div>
    </>
  );
}

export default InputBox;
