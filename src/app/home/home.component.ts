import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherCondition } from '../weatherModels/weather-condition';
import { DatePipe } from '@angular/common';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  forecastArr!: any;
  locationArr!: any;
  latitude: number = 0;
  longitude: number = 0;
  farenheit: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private geolocationService: GeolocationService
  ) {
    this.getGeolocation();
  }

  weatherCodeConditions: WeatherCondition[] = [
    {
      code: 0,
      description: 'Clear sky',
      img: '../../assets/icons/clearsky.png',
      imgBG: '../../assets/backgrounds/clear-sky-bg.jpg',
    },
    {
      code: 1,
      description: 'Mainly clear',
      img: '../../assets/icons/partly-cloudy.png',
      imgBG: '../../assets/backgrounds/partly-cloudy-bg.jpg',
    },
    {
      code: 2,
      description: 'Partly cloudy',
      img: '../../assets/icons/partly-cloudy.png',
      imgBG: '../../assets/backgrounds/partly-cloudy-bg.jpg',
    },
    {
      code: 3,
      description: 'Overcast',
      img: '../../assets/icons/overcast.png',
      imgBG: '../../assets/backgrounds/overcast-bg.jpg',
    },
    {
      code: 45,
      description: 'Fog and depositing rime fog',
      img: '../../assets/icons/fog.png',
      imgBG: '../../assets/backgrounds/fog-bg.jpg',
    },
    {
      code: 48,
      description: 'Fog and depositing rime fog',
      img: '../../assets/icons/fog.png',
      imgBG: '../../assets/backgrounds/fog-bg.jpg',
    },
    {
      code: 51,
      description: 'Drizzle: Light intensity',
      img: '../../assets/icons/drizzle.png',
      imgBG: '../../assets/backgrounds/drizzle-bg.jpg',
    },
    {
      code: 53,
      description: 'Drizzle: Moderate intensity',
      img: '../../assets/icons/drizzle.png',
      imgBG: '../../assets/backgrounds/drizzle-bg.jpg',
    },
    {
      code: 55,
      description: 'Drizzle: Dense intensity',
      img: '../../assets/icons/drizzle.png',
      imgBG: '../../assets/backgrounds/drizzle-bg.jpg',
    },
    {
      code: 56,
      description: 'Freezing Drizzle: Light intensity',
      img: '../../assets/icons/snowy-rainy.png',
      imgBG: '../../assets/backgrounds/rain-bg.jpg',
    },
    {
      code: 57,
      description: 'Freezing Drizzle: Dense intensity',
      img: '../../assets/icons/snowy-rainy.png',
      imgBG: '../../assets/backgrounds/rain-bg.jpg',
    },
    {
      code: 61,
      description: 'Rain: Slight intensity',
      img: '../../assets/icons/rain.png',
      imgBG: '../../assets/backgrounds/rain-bg.jpg',
    },
    {
      code: 63,
      description: 'Rain: Moderate intensity',
      img: '../../assets/icons/rain.png',
      imgBG: '../../assets/backgrounds/rain-bg.jpg',
    },
    {
      code: 65,
      description: 'Rain: Heavy intensity',
      img: '../../assets/icons/rain.png',
      imgBG: '../../assets/backgrounds/rain-bg.jpg',
    },
    {
      code: 66,
      description: 'Freezing Rain: Light intensity',
      img: '../../assets/icons/snowy-rainy.png',
      imgBG: '../../assets/backgrounds/rain-bg.jpg',
    },
    {
      code: 67,
      description: 'Freezing Rain: Heavy intensity',
      img: '../../assets/icons/snowy-rainy.png',
      imgBG: '../../assets/backgrounds/rain-bg.jpg',
    },
    {
      code: 71,
      description: 'Snow fall: Slight intensity',
      img: '../../assets/icons/snowy.png',
      imgBG: '../../assets/backgrounds/snow-bg.jpg',
    },
    {
      code: 73,
      description: 'Snow fall: Moderate intensity',
      img: '../../assets/icons/snowy.png',
      imgBG: '../../assets/backgrounds/snow-bg.jpg',
    },
    {
      code: 75,
      description: 'Snow fall: Heavy intensity',
      img: '../../assets/icons/snowy.png',
      imgBG: '../../assets/backgrounds/snow-bg.jpg',
    },
    {
      code: 77,
      description: 'Snow grains',
      img: '../../assets/icons/hail.png',
      imgBG: '../../assets/backgrounds/hail-bg.jpg',
    },
    {
      code: 80,
      description: 'Rain showers: Slight intensity',
      img: '../../assets/icons/rainpour.png',
      imgBG: '../../assets/backgrounds/heavy-rain-bg.jpg',
    },
    {
      code: 81,
      description: 'Rain showers: Moderate intensity',
      img: '../../assets/icons/rainpour.png',
      imgBG: '../../assets/backgrounds/heavy-rain-bg.jpg',
    },
    {
      code: 82,
      description: 'Rain showers: Violent intensity',
      img: '../../assets/icons/rainpour.png',
      imgBG: '../../assets/backgrounds/heavy-rain-bg.jpg',
    },
    {
      code: 85,
      description: 'Snow showers: Slight intensity',
      img: '../../assets/icons/snowy.png',
      imgBG: '../../assets/backgrounds/snow-bg.jpg',
    },
    {
      code: 86,
      description: 'Snow showers: Heavy intensity',
      img: '../../assets/icons/snowy.png',
      imgBG: '../../assets/backgrounds/snow-bg.jpg',
    },
    {
      code: 95,
      description: 'Thunderstorm: Slight or moderate',
      img: '../../assets/icons/thunder.png',
      imgBG: '../../assets/backgrounds/thunder-bg.jpg',
    },
    {
      code: 96,
      description: 'Thunderstorm with slight hail',
      img: '../../assets/icons/thunder.png',
      imgBG: '../../assets/backgrounds/thunder-bg.jpg',
    },
    {
      code: 99,
      description: 'Thunderstorm with heavy hail',
      img: '../../assets/icons/thunder.png',
      imgBG: '../../assets/backgrounds/thunder-bg.jpg',
    },
  ];

  getWeatherconditionByCode(code: number): string {
    let condition: string = '';

    for (let i = 0; i < this.weatherCodeConditions.length; i++) {
      if (this.weatherCodeConditions[i].code == code) {
        condition = this.weatherCodeConditions[i].img;
        break;
      }
    }
    return condition;
  }

  getWeatherconditionByCodeBg(code: number): string {
    let condition: string = '';

    for (let i = 0; i < this.weatherCodeConditions.length; i++) {
      if (this.weatherCodeConditions[i].code == code) {
        condition = this.weatherCodeConditions[i].imgBG;
        break;
      }
    }
    return condition;
  }

  getGeolocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        this.getForecast(position.coords.latitude, position.coords.longitude);
        this.getLocation(position.coords.latitude, position.coords.longitude);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      },
      error: (error) => {
        console.error('Kaput', error);
      },
    });
  }

  getForecast(latitude: number, longitude: number) {
    if (this.farenheit == false) {
      this.weatherService
        .getForecast(latitude, longitude)
        .subscribe((forecast: any) => {
          this.forecastArr = forecast;
        });
    } else {
      this.weatherService
        .getForecastF(latitude, longitude)
        .subscribe((forecast: any) => {
          this.forecastArr = forecast;
        });
    }
  }

  getLocation(latitude: number, longitude: number) {
    this.weatherService
      .getLocation(latitude, longitude)
      .subscribe((location) => {
        this.locationArr = location;
        console.log(this.locationArr);
      });
  }

  getDays(): string {
    let day: string;

    day = this.forecastArr.daily.time[0].toUTCDateString().getDay();
    console.log(this.forecastArr.daily.time[0]);
    console.log(day);
    return day;
  }

  farenheitSwitch() {
    if (this.farenheit == true) {
      this.farenheit = false;
      this.getGeolocation();
    } else {
      this.farenheit = true;
      this.getGeolocation();
    }
  }
}
