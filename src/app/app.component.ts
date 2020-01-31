import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedexnew';

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
  }

}
