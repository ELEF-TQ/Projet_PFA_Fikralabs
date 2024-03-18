import { Injectable } from '@nestjs/common';
import * as geolib from 'geolib';
import { stationslocations } from './geolocData/locations';

@Injectable()
export class GeolocationService {
    private readonly locations = stationslocations;

    getNearestGasStations(lat: number, lng: number) {
        const sortedLocations = this.locations.sort((a, b) => {
            const distanceA = geolib.getDistance({ latitude: lat, longitude: lng }, { latitude: a.lat, longitude: a.lng });
            const distanceB = geolib.getDistance({ latitude: lat, longitude: lng }, { latitude: b.lat, longitude: b.lng });
            return distanceA - distanceB;
        });

        return sortedLocations.slice(0,50);
    }

    getGasStationsByCity(city: string) {
        return this.locations.filter(location => location.city.toLowerCase() === city.toLowerCase());
    }
}
