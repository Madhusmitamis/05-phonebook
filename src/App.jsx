
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setNewSearchFilter] =  useState('');


  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  
  const addPerson = (event) => {
    event.preventDefault()
  //   console.log('button clicked', event.target)
  //   const isNameDuplicate = persons.some(person => person.name === newName);

  // if (isNameDuplicate) {
  //   // Display a warning using the alert command
  //   alert(`${newName} is already added to the phonebook`);
  //   return; // Exit the function early
  // }
  const existingPerson = persons.find(person => person.name === newName && person.number === newNumber)
  if (existingPerson) {
    const confirmUpdate = `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`;

    if (window.confirm(confirmUpdate)) {
      const updatedPerson = { ...existingPerson, number: newNumber };

      personService
          .update(existingPerson.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error('Error updating person:', error);
          });
      }
    } else {
   const personObject = { name: newName, number: newNumber }
    
    personService
    .create(personObject)
    .then(returnedPerson => {
    setPersons([...persons, returnedPerson])
    setNewName('')
    setNewNumber('')
    })
    .catch(error => {
      console.error('Error adding person:', error);
    });
  }
}
 const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchFilterChange = (event) => {
    setNewSearchFilter(event.target.value)
  }
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // const Person = ({ person }) => <li>{person.name}</li>;
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter searchFilter={searchFilter} handleSearchFilterChange={handleSearchFilterChange} />

      
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </div>
  )
        }

export default App