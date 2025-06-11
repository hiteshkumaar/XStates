import React, { useEffect, useState } from 'react';

const API_BASE = 'https://crio-location-selector.onrender.com';

export default function CitySelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/countries`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setCountries(data))
      .catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`${API_BASE}/country=${selectedCountry}/states`)
        .then(res => res.ok ? res.json() : [])
        .then(data => setStates(data))
        .catch(() => setStates([]));
    } else {
      setStates([]);
    }
    setSelectedState('');
    setSelectedCity('');
    setCities([]);
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetch(`${API_BASE}/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(res => res.ok ? res.json() : [])
        .then(data => setCities(data))
        .catch(() => setCities([]));
    } else {
      setCities([]);
    }
    setSelectedCity('');
  }, [selectedState]);

  return (
    <div>
      <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select value={selectedState} onChange={e => setSelectedState(e.target.value)} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} disabled={!selectedState}>
        <option value="">Select City</option>
        {cities.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {selectedCity && selectedState && selectedCountry && (
        <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
}
