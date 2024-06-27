import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css']
})
export class CarNewComponent {


  newCar: Car = new Car();

  constructor(private carService: CarService, private router: Router) { }



  onSubmit() {
    console.log(this.newCar);
    this.carService.createCar(this.newCar).subscribe( result => {
      window.alert("Car Created Successfully");
      this.router.navigate(['car']);
    }, error => {
      console.log('Error: ', error)
      if (error.status === 401 || error.status === 403) {
        window.alert("Error");
        this.router.navigate(['signin']);
      }
    });
  }





}
