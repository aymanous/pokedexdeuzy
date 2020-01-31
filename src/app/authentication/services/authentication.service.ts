import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Token, Error } from '../models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiURL = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io"

  constructor(private http: HttpClient) { }

  signin(username, password): Observable<Token>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.post<Token>(this.apiURL + "/auth/login", {"email": username, "password": password}, {headers})
    .pipe(
      catchError(this.handleError<Token>('signin'))
    );
  }

  signout(){
    sessionStorage.clear();
  }

  checkUserSession(){
    if(sessionStorage.getItem("access_token")){
      return true;
    }
    return false;
  }

  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {


      return throwError (error);
    };
  }
}
