import React from "react";

export default function Persons({ handleFilter, persons, handleDelete }) {
  return (
    <div>
      {handleFilter().length < 1
        ? persons.map((person, index) => (
            <div key={index}>
              <span>{person.name}</span>
              <span>{person.number}</span>
              <button
                type="button"
                onClick={() => handleDelete(person.id, person.name)}
              >
                delete
              </button>
            </div>
          ))
        : handleFilter().map((person, index) => (
            <div key={index}>
              <span>{person.name}</span>
              <span>{person.number}</span>
              <button
                type="button"
                onClick={() => handleDelete(person.id, person.name)}
              >
                delete
              </button>
            </div>
          ))}
    </div>
  );
}
