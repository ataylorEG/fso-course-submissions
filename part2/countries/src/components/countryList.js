import React, { useState } from 'react';
import CountryDetails from './CountryDetails';

const CountryMessage = ({ searchTerm, countries }) => {
    if (searchTerm === '' || countries.length === 0) {
      return <p>No matches</p>;
    } else if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return null;
    }
  };

const CountryList = ({ countries, searchTerm, onCountrySelect, weather }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowDetails = (country) => {
    onCountrySelect(country);
    setSelectedCountry(country);
  };

  const handleBack = () => {
    setSelectedCountry(null);
  };

  if (selectedCountry) {
    return (
      <CountryDetails
        country={selectedCountry}
        onBack={handleBack}
        weather={weather}
      />
    );
  }

  return (
    <div>
      <CountryMessage searchTerm={searchTerm} countries={countries} />
      {countries.length > 0 &&
        countries.length <= 10 &&
        countries.map((country) => (
          <div key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => handleShowDetails(country)}>
              Show details
            </button>
          </div>
        ))}
    </div>
  );
};

export default CountryList;