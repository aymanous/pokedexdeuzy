import { AuthenticationService } from './../../authentication/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Session } from 'protractor';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  signout(){
    this.authentication.signout();
  }

}
