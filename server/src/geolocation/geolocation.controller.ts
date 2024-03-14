import { Controller, Get, Query } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Get('nearest-gas-stations')
  getNearestGasStations(@Query('lat') lat: number, @Query('lng') lng: number) {
      return this.geolocationService.getNearestGasStations(lat, lng);
  }

  @Get('gas-stations-by-city')
  getGasStationsByCity(@Query('city') city: string) {
      return this.geolocationService.getGasStationsByCity(city);
  }
}
