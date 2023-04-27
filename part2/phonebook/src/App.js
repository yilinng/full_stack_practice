import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterByName, setFilterByName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(newName);
    const filter_name =
      persons.length && persons.filter((person) => person.name === newName);

    console.log("filter_name", filter_name);
    if (filter_name.length) {
      console.log(filter_name);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        let id = filter_name[0].id;
        let updateObj = {
          name: filter_name[0].name,
          number: newNumber,
        };
        personService.updateItem(id, updateObj).then((response) => {
          console.log("update success", response);
          setMessage(`update success ${newName}`);

          setTimeout(() => {
            setMessage(null);
          }, 5000);

          setNewName("");
          setNewNumber("");
          getData();
        });
      }
      return;
    }

    const new_Item = {
      name: newName,
      number: newNumber,
    };

    personService
      .createItem(new_Item)
      .then((response) => {
        console.log("sucess..");
        console.log(response);
        setPersons([...persons, new_Item]);

        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.error);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  const handleFilter = () => {
    const filterPerson = persons.filter((person) =>
      person.name.toLowerCase().includes(filterByName.toLowerCase())
    );

    return filterPerson;
  };

  const getData = () => {
    personService.getAll().then((initialPersons) => {
      console.log("initialPersons", initialPersons);
      setPersons(initialPersons);
    });
  };

  const handleDelete = (id, name) => {
    console.log("handle delete", id);
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .deleteItem(id)
        .then((response) => {
          console.log(response);
          setMessage(`${name} delete success`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);

          getData();
        })
        .catch((error) => {
          setError(`Person '${name}' was already removed from server`);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    }
  };

  useEffect(() => getData(), []);

  return (
    <div>
      <h2>Phonebook</h2>

      {message ? (
        <h3 className="message">{message}</h3>
      ) : error ? (
        <h3 className="error">{error}</h3>
      ) : (
        <h3 className="no_message">''</h3>
      )}

      <Filter filterByName={filterByName} setFilterByName={setFilterByName} />

      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons
        handleFilter={handleFilter}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
