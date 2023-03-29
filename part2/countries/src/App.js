import { useState, useEffect } from 'react';
import CountryList from './components/countryList';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const results = countries.filter((country) =>
      country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredCountries(results);
  }, [searchTerm, countries]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <p>find countries</p>
      <input
        type="text"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={handleChange}
      />
      <CountryList countries={filteredCountries} searchTerm={searchTerm} />
    </div>
  );
};

export default App;