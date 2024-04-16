// Persons.js
import React from 'react';
import Person from './Person'
import axios from 'axios'

const Persons = ({ persons, setPersons, showSuccessMessage, showErrorMessage  }) => {
  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
          showSuccessMessage(`Deleted ${name}`);
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          showErrorMessage('Error deleting person. Please try again later.');
        });
    }
  };
  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>
        <p>{person.name}</p>
       <p>{person.number}</p>
        <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
        </li>
        
      ))}
    </ul>
  );
};

export default Persons;
