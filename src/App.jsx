import React, { useState } from 'react'
import './App.css'


const App = () => {
const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
        alertUser()
      } else {
    const personObject = {
      name: newName,
    };
    setPersons(persons.concat(personObject));
    setNewName('')
  }
}
const alertUser = () => {
    alert(`${newName} is already added to the phonebook`)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {/* Render the list of persons */}
        {persons.map((person, index) => (
          <div key={index}>{person.name}</div>
        ))}
      </div>
    </div>
  )
}

export default App