import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import StationCard from '../../components/StationCard'; // Import the StationCard component
import SearchIcon from '@mui/icons-material/Search';
import { fetchNearestStations } from '../../context/features/StationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../context/store';
import { Station } from '../../types/Station';
import GetUserGeolocation, { Coordinates } from '../../lib/GetUserGeolocation';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nearestStations } = useSelector((state: RootState) => state.stations) as { nearestStations: Station[] };

  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    GetUserGeolocation()
      .then(coords => {
        setUserCoordinates(coords);
      })
      .catch(error => {
        console.error('Error getting user geolocation:', error);
        setUserCoordinates({ latitude:  30.427755, longitude: -9.598107 });
      });
  }, []);

  useEffect(() => {
    if (userCoordinates) {
      dispatch(fetchNearestStations(userCoordinates));
    }
  }, [userCoordinates, dispatch]);

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter stations based on search query and selected city
  const filteredStations = nearestStations.filter(station => {
    const nameMatch = station.name.toLowerCase().includes(searchQuery.toLowerCase());
    const addressMatch = station.address.toLowerCase().includes(searchQuery.toLowerCase());
    const cityMatch = !selectedCity || station.city === selectedCity;
    return (nameMatch || addressMatch) && cityMatch;
  });

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 my-5">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative flex items-center w-full md:w-auto mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Recherche ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" px-10 py-1  w-full md:w-auto border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
            <button
              type="button"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none ml-2"
            >
              <SearchIcon />
            </button>
          </div>
          <div>
            <label htmlFor="citySelect" className="mr-2">Choisir votre ville:</label>
            <select
              id="citySelect"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className=" cursor-pointer px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            >
              {[...new Set(nearestStations.map(station => station.city))].map(city => (
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
