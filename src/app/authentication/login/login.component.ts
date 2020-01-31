import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: string
  
  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: '',
      password: ''
    });
  }

  login() {
    if (this.form.valid) {
      this.authService.signin(this.form.value.username, this.form.value.password).pipe(
        tap(res => {
          sessionStorage.setItem("access_token", res.access_token);
          sessionStorage.setItem("refresh_token", res.refresh_token);
          this.router.navigateByUrl('/pokedex');
        }),
        catchError(this.handleError<Error>('login'))
      ).subscribe();
    }
  }

  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {
      this.error = "Identifiant ou mot de passe incorrect!"
      return error;
    };
  }
}
