import React from 'react';

const WeatherDetails = ({country, weather}) => {
    return (
        <div>
            <h1>Weather in {country.name.common}</h1>
            <p>Temperature: {weather.temperature} °C</p>
            <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={`Weather icon for ${country.name.common}`}
            style={{ width: '100px' }}
            />
            <p>Wind: {weather.wind} m/s</p>
        </div>
    )
}

const CountryDetails = ({ country, onBack, weather }) => {
  const languages = Object.values(country.languages).join(', ');

  return (
    <div>
      <h1>{country.name.common}</h1>
      <button onClick={onBack}>Go back</button>
      <p>
        Capital: {country.capital[0]} <br />
        Area: {country.area}
      </p>
      <h2>Languages:</h2>
      <p>{languages}</p>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} style={{ width: '200px' }} />
      {weather && 
      <WeatherDetails country={country} weather={weather}/>}
    </div>
  );
};

export default CountryDetails;