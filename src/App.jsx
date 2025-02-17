
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'
import { ErrorNotification, SuccessNotification } from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setNewSearchFilter] =  useState('');
  // const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
 
  
  const addPerson = (event) => {
    event.preventDefault()
  
     const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService.update(existingPerson.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
            setNewName('');
            setNewNumber('');
            // showNotification(`Number for ${updatedPerson.name} updated successfully!`, 'success')
            showSuccessMessage(`Number for ${updatedPerson.name} updated successfully!`);
          })
          .catch(error => {
            console.error('Error updating person:', error);
            showErrorMessage(`Information of ${updatedPerson.name} has already been removed from server `);
            

          });
      }
    } else {
      const personObject = { name: newName, number: newNumber };

      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('')
          showSuccessMessage(`Added ${returnedPerson.name}`);
          
        })
        
        .catch(error => {
          console.error('Error adding person:', error)
          showErrorMessage('Error adding person. Please try again later.');
        });
    }
  }
  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }
  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
  
  


  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
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
      
      <Persons
       persons={filteredPersons} setPersons={setPersons}
       showSuccessMessage={showSuccessMessage}
  showErrorMessage={showErrorMessage}

       />
    </div>
  )
        }

export default App