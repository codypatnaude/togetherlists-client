import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ListIoService } from '../services/websocket/list-io.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private api: ApiService, private listIo: ListIoService) { }

  ngOnInit() {
    console.log('calling list-io connect');
    this.listIo.connect();
  }

  requestList() {
    this.listIo.requestList();
  }

}
