import React, { useState } from 'react'
import './App.css'


const App = () => {
const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange =(event)=>{
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
        alertUser()
      } else {
    const personObject = {
      name: newName,
      number:newNumber
    };
    setPersons(persons.concat(personObject));
    setNewName('')
    setNewNumber('')
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
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {/* Render the list of persons */}
        {persons.map((person, index) => (
          <div key={index}>{person.name} {person.number}</div>
        ))}
      </div>
    </div>
  )
}

export default App