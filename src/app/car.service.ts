import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './models/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {




  baseURL: string = "http://localhost:3006/api/car";
  tokenKey: string = "myCarsToken";

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
}
