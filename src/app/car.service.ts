import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './models/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {


  weatherBaseURL: string = "http://api.weatherapi.com/v1/current.json";
  weatherAPIKey: string = "142a8baab89f46b889820953243006";
  baseURL: string = "http://localhost:3006/api/car";
  tokenKey: string = "myCarsToken";
  private city: string = '';
  
  constructor(private http: HttpClient) { }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseURL);
}

getUserCars(UserId: number): Observable<Car[]> {
  return this.http.get<Car[]>(this.baseURL + "/byUserId/" + UserId);
}

createCar(newCar: Car) {
  let reqHeaders = {
    Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
}
return this.http.post(this.baseURL, newCar, { headers: reqHeaders });
}


deleteCar(hello: string) {
  let reqHeaders = {
    Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
  }
  return this.http.delete(this.baseURL + "/" + hello, { headers: reqHeaders })
}
getCar(CarId: string) {
  return this.http.get<Car>(this.baseURL + "/" + CarId)
}

updateCar(num: string, updatedCar: Car): Observable<Car> {
  let reqHeaders = {
    Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
  }
  return this.http.put(this.baseURL + "/" + updatedCar.carId, updatedCar, { headers: reqHeaders });
}

searchCoffee(searchText: string): Observable<Car[]> {
  return this.http.get<Car[]>(this.baseURL + "?q=" + searchText);
}

getWeather(city: string): Observable<any> {
  const url = `${this.weatherBaseURL}?key=${this.weatherAPIKey}&q=${city}&aqi=no`;
  return this.http.get<any>(url);
}



  setCity(city: string) {
    this.city = city;
  }

  getCity(): string {
    return this.city;
  }

}
