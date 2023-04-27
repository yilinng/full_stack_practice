import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Countries from "./components/Countries";
import axios from "axios";
import countryService from "./services/countries";
import "./index.css";

const App = () => {
  const [courtries, setCourtries] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterByName, setFilterByName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(newName);
    // const filter_name =
    //   persons.length && persons.filter((person) => person.name === newName);

    // if (filter_name.length) {
    //   console.log(filter_name);
    /*

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
 
    const new_Name = {
      name: newName,
      number: newNumber,
    };

    axios
      .post("http://localhost:3001/persons", new_Name)
      .then((response) => {
        console.log("sucess..");
        console.log(response);
        setPersons([...persons, new_Name]);

        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setError(`Information '${newName}' has already removed from server`);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
    */
  };

  const handleFilter = () => {
    const filterPerson = courtries.filter((country) =>
      country.name.common.toLowerCase().includes(filterByName.toLowerCase())
    );

    return filterPerson;
  };

  const getData = () => {
    countryService.getAll().then((initialPersons) => {
      console.log(initialPersons);
      setCourtries(initialPersons);
    });
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
      <Countries handleFilter={handleFilter} countries={courtries} />
    </div>
  );
};

export default App;
