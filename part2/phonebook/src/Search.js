const Search = ({ searchTerm, handleSearchChange }) => {
    return (
      <div>
        Search by Name: <input value={searchTerm} onChange={handleSearchChange} />
      </div>
    )
  }
  
  export default Search