import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/car.service';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{

  user?: User;
  userId?: number;
  thisCar: Car = new Car();
  thisCar2: Car = new Car();
  id: string = ""
  id2: string = ""
  constructor(private carService: CarService, private actRoute: ActivatedRoute, private router: Router, private userService: UserService) { }


  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];

    this.carService.getCar(this.id).subscribe((product) => {
      this.thisCar = product;
      console.log(this.thisCar);
      console.log(this.thisCar.userId);
      
      this.userId = this.thisCar.userId;

      // Ensure userId is populated before fetching user details
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe((result) => {
          this.user = result;
          console.log(this.user); // Assuming result is of type User
        });
      }
    });
  
  
  
  
  
  }
  
  
  }
