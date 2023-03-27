import { useState, useEffect } from 'react'
import Search from './components/Search'
import AddNewEntry from './components/AddNewEntry'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
import backendService from './services/backendService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    backendService
      .getAll()
      .then(data => {
        console.log('promise fulfilled')
        setPersons(data)
      })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const showNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  
    const hasAlphabeticCharacter = /[a-zA-Z]/.test(newName)
  
    if (!hasAlphabeticCharacter) {
      alert('Please enter a valid name containing at least one alphabetic character.')
      return
    }
  
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
  
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Do you want to update the number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber }
  
        backendService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${returnedPerson.name}'s number`)
          })
          .catch((error) => {
            console.error('Error updating the number:', error)
          })
      }
    } else {
      // Create a new person object
      const newPerson = {
        name: newName,
        number: newNumber
      }
  
      // Send a POST request to the API to save the new person
      backendService
        .create(newPerson)
        .then(savedPerson => {
          // Update the state with the saved person
          setPersons(persons.concat(savedPerson))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${savedPerson.name}`)
        })
        .catch(error => {
          // Handle any errors that occur during the request
          console.error('Error saving the new person:', error)
        })
    }
  }

  const handleDelete = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      backendService
        .deleteEntry(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          console.error('Error deleting the person:', error)
        })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add New Entry</h3>
      <AddNewEntry
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App