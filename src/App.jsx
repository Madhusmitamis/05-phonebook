import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        const initialPersons = response.data; // Assuming response.data is an array of persons
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  }, []);
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
    person.name && person.name.toLowerCase().includes(searchFilter.toLowerCase())
)

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      const confirmUpdate =`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
      
      if (window.confirm(confirmUpdate) ){
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(prevPersons => prevPersons.map(person => person.id === returnedPerson.id ? returnedPerson : person));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error updating person:', error);
          
        });
    }
    
      } else {
    const personObject = {
      name: newName,
      number:newNumber
    }
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(prevPersons => [...prevPersons, returnedPerson])
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.error('Error adding person:', error);
        });
      
  
    }
}
const handleDelete = (id) => {
  const personToDelete = persons.find(person => person.id === id);
  const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
  if (confirmDelete) {
    personService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error('Error deleting person:', error);
      });
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
        <Persons persons={filteredPersons} onDelete={handleDelete} />
    
      
    </div>
  )
}

export default App