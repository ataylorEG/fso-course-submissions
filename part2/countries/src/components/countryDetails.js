const CountryDetails = ({ country }) => {
    const languages = Object.values(country.languages);
  
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area} km²</p>
        <p><strong>Languages:</strong></p>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          style={{ width: '200px', height: 'auto' }}
        />
      </div>
    );
  };
  
  export default CountryDetails;