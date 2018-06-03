import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showRegistration = false;
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  login(credentials) {
    this.api.login(credentials)
    .subscribe(
      (data) => {
        console.log(data);
        this.api.verifyAuthToken()
        .subscribe((verified) => console.log(verified));
      }
    );
  }

}
