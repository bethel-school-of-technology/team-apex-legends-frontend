import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/car.service';
import { Car } from 'src/app/models/car';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit{

  carList: Car[] = [];
  constructor(private carService: CarService, public userService: UserService) { }


  ngOnInit(): void {

    this.carService.getAllCars().subscribe(tweets => {
      this.carList = tweets;
      // console.log(this.carList)
    });
   
  }

  isLoggedIn(): boolean {
 
    return !!localStorage.getItem('myCarsToken');
  }


}
