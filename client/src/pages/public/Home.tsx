import React, { useState } from 'react';
import { locations } from '../../utils/Stations';
import Header from '../../components/Header';
import StationCard from '../../components/StationCard'; // Import the StationCard component

interface Station {
  id: string;
  name: string;
  address: string;
  city: string;
  telephone: string;
  website_url: string;
  country: string;
}

const Home: React.FC = () => {
  // Object to store the count of locations for each city in Morocco
  const cityCount: { [key: string]: number } = {};
  const cityStations: { [key: string]: Station[] } = {};

  // Iterate over the locations to count the number of elements for each city in Morocco
  locations
    .filter((location: Station) => location.country === "Morocco")
    .forEach((location: Station) => {
      const city = location.city;
      cityCount[city] = (cityCount[city] || 0) + 1;
      if (!cityStations[city]) {
        cityStations[city] = [];
      }
      cityStations[city].push(location);
    });

  // Sort cities by the count of stations in descending order
  const sortedCities = Object.keys(cityCount).sort((a, b) => cityCount[b] - cityCount[a]);

  // State to track the selected city and search query
  const [selectedCity, setSelectedCity] = useState<string>("Agadir");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter stations based on the selected city and search query
  const filteredStations = cityStations[selectedCity].filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="mb-4">
        <label htmlFor="citySelect" className="mr-2">Select a city:</label>
        <select
          id="citySelect"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          {sortedCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by station name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-4">{selectedCity}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredStations.map(station => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
