import { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import useWeather from './hooks/useWeather';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const countriesURL = 'https://restcountries.com/v3.1/all';
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, fetchWeather] = useWeather(api_key);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch(countriesURL)
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const results = searchTerm
      ? countries.filter((country) =>
          country.name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      : [];
    setFilteredCountries(results);
  }, [searchTerm, countries]);

  const handleSelectedCountry = async (country) => {
    await fetchWeather(country.latlng[0], country.latlng[1]);
    setSelectedCountry(country);
  };

  const handleBack = () => {
    setSelectedCountry(null);
  };

  return (
    <div>
      <p>Find countries:</p>
      <input
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {!selectedCountry && (
        <CountryList
          countries={filteredCountries}
          searchTerm={searchTerm}
          onCountrySelect={handleSelectedCountry}
        />
      )}
      {selectedCountry && (
        <CountryDetails
          country={selectedCountry}
          onBack={handleBack}
          weather={weather}
        />
      )}
    </div>
  );
};

export default App;