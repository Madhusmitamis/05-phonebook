import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
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
    
      
    </div>
  )
}

export default App