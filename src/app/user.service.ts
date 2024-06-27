import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/user';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 
  baseURL: string = "http://localhost:3006/api/user"
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  signUp(newUser: User){
    return this.http.post(`${this.baseURL}`, newUser);
}


// login(username: string, password: string) {
//   let queryParams = new HttpParams();
//   queryParams = queryParams.append('username', username);
//   queryParams = queryParams.append('password', password);

//   return this.http.get<any>(`${this.baseURL}/login`, { params: queryParams })
//   .pipe(tap((response: any) => {
//       console.log('Response from Jonathan:', response); // Log the response to see its structure
//       localStorage.setItem('myCarsToken', response.token);
//     }));
// }

login(username: string, password: string) {
  return this.http.post<any>(`${this.baseURL}/login`, { username, password })
    .pipe(
      tap((response: any) => {
        console.log('Login response:', response);
        localStorage.setItem('myCarsToken', response.token);
      })
    );
}


gettoken(): any {
  const token = localStorage.getItem('myCarsToken');
  return token;
}

// getUserFromToken(): any {
//   const token = localStorage.getItem('myCarsToken');

//   if (token && !this.jwtHelper.isTokenExpired(token)) {
//     const decodedToken = this.jwtHelper.decodeToken(token);
//     const user = decodedToken
//     console.log(user);
//     return user; 
//   }

//   return null;
// }


getUserIdFromToken(): number | null {
  const token = localStorage.getItem('myCarsToken');
  if (token) {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if (tokenPayload && typeof tokenPayload.userId === 'number') {
      return tokenPayload.userId;
    }
  }
  return null;
}

refreshPage() {
  window.location.reload();
 }

 getUserById(userId: number): Observable<User> {
  return this.http.get<User>(`${this.baseURL}/id/${userId}`);
}


isLoggedIn(): boolean {

  return !!localStorage.getItem('myCarsToken');
  
}

logout(): void {
 
  localStorage.removeItem('myCarsToken');
}

// getUserFromToken(): any {
//   const token = localStorage.getItem('myTweetsToken');

//   if (token && !this.jwtHelper.isTokenExpired(token)) {
//     const decodedToken = this.jwtHelper.decodeToken(token);
//     console.log(decodedToken);
//     const user = decodedToken.username;
//     console.log(user);
//     return user; 
//   }

//   return null;
// }


}

