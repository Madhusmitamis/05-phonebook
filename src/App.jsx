import React, { useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [searchFilter, setSearchFilter] = useState('')
 const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange =(event)=>{
    setNewNumber(event.target.value)
  }
  const handleSearchFilterChange =(event)=>{
    setSearchFilter(event.target.value)
  }
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
        alertUser()
      } else {
    const personObject = {
      name: newName,
      number:newNumber
    };
    setPersons([...persons,personObject]);
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
      <Filter value={searchFilter} onChange={handleSearchFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
        <h2>Numbers</h2>
        <Persons persons={filteredPersons} />
    
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    
    </div>
  )
}

export default App