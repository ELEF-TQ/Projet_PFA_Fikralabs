import {  LocationOnOutlined, PhoneOutlined } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

interface Station {
  id: string;
  name: string;
  address: string;
  city: string;
  telephone: string;
  website_url: string;
  country: string;
}

interface StationCardProps {
  station: Station;
}

const StationCard: React.FC<StationCardProps> = ({ station }) => {
  return (
    <div className="station-list-item bg-white rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <Link to={station.website_url} className="station-list-item__link block p-4">
        <h3 className="station-list-item__heading text-lg font-semibold mb-2">{station.name}</h3>
        <div className="flex items-center mb-2">
          <LocationOnOutlined className="mr-2 text-gray-600" style={{ fontSize: 16 }}/>
          <p className="station-list-item__address text-gray-600">{station.address}</p>
        </div>
        <div className="flex items-center">
          <PhoneOutlined className="mr-2 text-gray-600" style={{ fontSize: 16 }}/>
          <p className="station-list-item__address text-gray-600">{station.telephone}</p>
        </div>
        <span className="open-now open-now--is-open block mt-2 text-green-600" data-testid="open-now"><strong>Open 24 Hours</strong></span>
      </Link>
    </div>
  );
};

export default StationCard;
