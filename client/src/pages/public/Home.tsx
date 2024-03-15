import React, {  useState } from 'react';
import { locations } from '../../utils/Stations';
import Header from '../../components/Header';
import StationCard from '../../components/StationCard'; // Import the StationCard component
import SearchIcon from '@mui/icons-material/Search';

interface Station {
  id: string;
  name: string;
  address: string;
  city: string;
  telephone: string;
  website_url: string;
  country: string;
}

// interface Coordinates {
//   latitude: number;
//   longitude: number;
// }

const Home: React.FC = () => {

 


  const cityCount: { [key: string]: number } = {};
  const cityStations: { [key: string]: Station[] } = {};

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

  const sortedCities = Object.keys(cityCount).sort((a, b) => cityCount[b] - cityCount[a]);

  const [selectedCity, setSelectedCity] = useState<string>("Agadir");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredStations = cityStations[selectedCity]?.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 my-5">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative flex items-center w-full md:w-auto mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search by station name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-10 py-1 border border-gray-300 rounded-md w-full md:w-auto"
            />
            <button
              type="button"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              <SearchIcon />
            </button>
          </div>
          <div>
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
    
    </>
  );
};

export default Home;
