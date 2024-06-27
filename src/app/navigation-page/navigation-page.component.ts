import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navigation-page',
  templateUrl: './navigation-page.component.html',
  styleUrls: ['./navigation-page.component.css']
})
export class NavigationPageComponent implements OnInit{

  currentUser: User | null = null; // Assuming User is a model with properties
  id: number | null = null; // Assuming id is a string representing user ID
  isAuthenticated: boolean = false;
  user?: User;
  isHandset$: Observable<boolean>;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
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
  };
  

  onLogout(): void {
    this.userService.logout();
    this.refreshPage();
  }

  refreshPage() {
    window.location.reload();
  }



}
