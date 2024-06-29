import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/car.service';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{

  idcurrent: number | null = null;
  id: number | null = null;
  carList: Car[] = [];
  newUser: User = new User();
  loggedoutuser: User = new User();
  constructor(private carService: CarService, private actRoute: ActivatedRoute, private router: Router, private userService: UserService) { }


  ngOnInit(): void {
    console.log(this.actRoute.snapshot.params['user']);
    this.id = +this.actRoute.snapshot.params['user'];
  
    this.carService.getUserCars(this.id).subscribe((product) => {
      this.carList = product;
      // console.log(this.carList);
     
    });
    this.userService.getUserById(this.id).subscribe((result) => {
      this.loggedoutuser = result;
      // console.log(this.newUser); 
    });
    this.idcurrent = this.userService.getUserIdFromToken();
    console.log(this.idcurrent);
     
    if (this.idcurrent) {
      this.userService.getUserById(this.idcurrent).subscribe((result) => {
        this.newUser = result;
        // console.log(this.newUser); 
      });
    }
  }

  deleteCar(carid: string | undefined): void {
    if (carid) {
        this.carService.deleteCar(carid)
          .subscribe(() => {
            alert('Car deleted successfully!');
            this.refreshPage();
          }, error => {
            console.error(error);
            if (error.status === 401) {
             
              this.router.navigate(['car']);
            }
          });
      
    } else {
      console.error('Invalid CarId:', carid);
    }
  }
  refreshPage() {
    window.location.reload();
   }
}
