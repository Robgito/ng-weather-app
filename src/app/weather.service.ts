import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeComponent } from './home/home.component';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  latitude!: number;
  longitude!: number;

  constructor(private httpClient: HttpClient) {}

  getForecast(latitude: number, longitude: number) {
    return this.httpClient.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin`
    );
  }

  getForecastF(latitude: number, longitude: number) {
    return this.httpClient.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&temperature_unit=fahrenheit`
    );
  }

  getLocation(latitude: number, longitude: number) {
    return this.httpClient.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
  }
}
