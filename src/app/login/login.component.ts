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
    this.api.login(credentials)
    .subscribe(
      (data) => {
        this.router.navigate(['dashboard']);
      }
    );
  }

}
