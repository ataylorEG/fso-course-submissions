import React from 'react';
import CountryDetails from './countryDetails';

const CountryMessage = ({ searchTerm, countries }) => {
    if (searchTerm === '') {
      return <p>No matches</p>;
    } else if (countries.length === 0) {
      return <p>No matches</p>;
    } else if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return null;
    }
  };

const CountryList = ({ countries, searchTerm }) => {
  return (
    <div>
      <CountryMessage searchTerm={searchTerm} countries={countries} />
      {countries.length === 1 ? (
        <CountryDetails country={countries[0]} />
      ) : (
        countries.length <= 10 && (
          <ul>
            {countries.map((country) => (
              <li key={country.cca3}>{country.name.common}</li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default CountryList;