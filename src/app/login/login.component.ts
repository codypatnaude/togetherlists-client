import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showRegistration = false;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  login(credentials) {
    console.log('calling login!');
    this.api.login(credentials)
    .subscribe(
      (data) => {
        console.log('navigating');
        this.router.navigate(['dashboard']);
      }
    );
  }

  createUser(userDetails) {
    console.log('calling login!');
    this.api.createUser(userDetails)
    .subscribe(
      (data) => {
        console.log('navigating');
        this.router.navigate(['dashboard']);
      }
    );
  }

}
