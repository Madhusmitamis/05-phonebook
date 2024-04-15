// Persons.js
import React from 'react';
import Person from './Person'
import axios from 'axios'

const Persons = ({ persons,setPersons }) => {
  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Error deleting person:', error);
        });
    }
  };
  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>{person.name} {person.number}
        <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
        </li>
        
      ))}
    </ul>
  );
};

export default Persons;
