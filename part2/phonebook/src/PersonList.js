const PersonList = ({ persons }) => {
    return (
      <>
        {persons.map((person, index) => (
          <p key={index}>{person.name}: {person.number}</p>
        ))}
      </>
    )
  }
  
  export default PersonList