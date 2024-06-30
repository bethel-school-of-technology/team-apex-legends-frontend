import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { CarService } from '../car.service';

@Component({
  selector: 'app-navigation-page',
  templateUrl: './navigation-page.component.html',
  styleUrls: ['./navigation-page.component.css']
})
export class NavigationPageComponent implements OnInit{

  currentUser: User | null = null; 
  id: number | null = null; 
  isAuthenticated: boolean = false;
  user?: User;
  isHandset$: Observable<boolean>;
  weatherData: any;
  city: string = '';

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver, private carService: CarService
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  ngOnInit(): void {
  
   
    this.id = this.userService.getUserIdFromToken();
    // console.log(this.id);
    this.isAuthenticated = this.userService.isLoggedIn(); 
    if (this.id) {
      this.userService.getUserById(this.id).subscribe((result) => {
        this.user = result;
        // console.log(this.user); 
      });
    }
    const storedCity = localStorage.getItem('city');
  if (storedCity) {
    this.carService.setCity(storedCity);
    this.city = storedCity;
  }

  console.log('City on init:', this.city);

  this.carService.getWeather(this.city).subscribe(
    data => {
      this.weatherData = data;
      console.log(this.weatherData.current.temp_f);
    },
    error => {
      console.error('Error fetching weather data:', error);
    }
  );

  const navigateTo = localStorage.getItem('navigateTo');
  if (navigateTo) {
    localStorage.removeItem('navigateTo');
    setTimeout(() => {
      this.router.navigateByUrl(navigateTo);
    }, 100);
  }
}
    // this.carService.getWeather(this.city).subscribe(
    //   data => {
    //     this.weatherData = data;
    //     console.log(this.weatherData.current.temp_f
    //       );
    //   },
    //   error => {
    //     console.error('Error fetching weather data:', error);
    //   }
    // );
  
  

  onLogout(): void {
    this.userService.logout();
    this.refreshPage();
  }

  refreshPage() {
    window.location.reload();
  }



}
