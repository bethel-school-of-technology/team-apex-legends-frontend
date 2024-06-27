import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{




  username: string = '';
  password: string = '';


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
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

  signin() {
    this.userService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Login response:', response);
        // Optionally, you can redirect to another route upon successful login
        this.router.navigateByUrl('/car');
      },
      (error: any) => {
        console.log('Login error:', error);
        window.alert('Unsuccessful Login');
      }
    );
  }

  
}
