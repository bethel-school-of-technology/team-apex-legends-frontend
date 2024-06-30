import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/car.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{




  username: string = '';
  password: string = '';
  city: string = '';

  constructor(private userService: UserService, private router: Router, private carService: CarService) { }

  ngOnInit() {
    const navigateTo = localStorage.getItem('navigateTo');
    if (navigateTo) {
      localStorage.removeItem('navigateTo');
      setTimeout(() => {
        this.router.navigateByUrl(navigateTo);
      }, 3000);
    }
  }

  // signin() {
  //   this.userService.login(this.username, this.password).subscribe((response: any) => {
  //     console.log('Login response: ', response); // Log the response here
  //     // this.router.navigateByUrl('/car');
  //   }, error => {
  //     console.log('Error: ', error);
  //     window.alert('Unsuccessful Login');
  //     // this.router.navigateByUrl('/signin');
  //   });
  // }
  // signin(){
  //   this.userService.login(this.username, this.password).subscribe((response:any) => {
  //     console.log('Login response: ', response);
  //   }, error => {
  //       console.log('Error: ', error);
  //       window.alert('Unsuccessful Login');
        
  //   });
  // }

  // signin() {
  //   this.userService.login(this.username, this.password).subscribe(
  //     (response: any) => {
  //       console.log('Login response:', response);
  //       // window.alert("Login Successful");
  //       this.refreshPage();
  //       setTimeout(() => {
  //         this.router.navigateByUrl('/car');
  //       }, 2000);
  //       // Optionally, you can redirect to another route upon successful login
        
  //     },
  //     (error: any) => {
  //       console.log('Login error:', error);
  //       window.alert('Unsuccessful Login');
  //     }
  //   );
  // }
  // refreshPage() {
  //   window.location.reload();
  // }
  signin() {
    this.userService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Login response:', response);
        window.alert('Successful Login');
        this.carService.setCity(this.city);
        localStorage.setItem('city', this.city);
        console.log('City set to:', this.city);
        localStorage.setItem('navigateTo', '/car');
        window.location.reload();
      },
      (error: any) => {
        console.log('Login error:', error);
        window.alert('Unsuccessful Login');
      }
    );
  }
}
