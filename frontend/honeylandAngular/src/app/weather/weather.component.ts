import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  @Input() lokacija: string;

  WeatherData:any;
  cloudCnt :number;
  

  constructor() { }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
  //  console.log(this.WeatherData);
  }

  getForecastData(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=382f68817aee70e256cfb09996a5d780
    `).then(response=>response.json())
    .then(data=>{
       console.log(data)
      
      }
       )
  }

  getWeatherData(){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.lokacija}&appid=7212c32965f65a5501623ae06b59d908`)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);
      }
       )
  }

  setWeatherData(data){
  
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime()); 
    this.WeatherData.isCloudy = this.WeatherData.weather[0].main=='Clouds';
    this.WeatherData.isRain = this.WeatherData.weather[0].main=='Rain';
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    this.WeatherData.wind_speed = (this.WeatherData.wind.speed);
  }

}


  interface WeatherDataI{
    coord: {
    },
    weather: [
      {
        id,
        main,
        description,
        icon
      }
    ],
    base,
    main: {
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity
    },
    visibility,
    wind: {
    },
    clouds: {
      all: number
    },
    dt,
    sys: {
      type,
      id,
      message,
      country,
      sunrise,
      sunset
    },
    timezone,
    id,
    name,
    cod
}