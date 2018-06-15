import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ListIoService } from '../services/websocket/list-io.service';
import { tap } from 'rxjs/operators';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private api: ApiService, private listIo: ListIoService) { }

  @LocalStorage()
  list;
  listDetails: any[];

  ngOnInit() {

    this.listIo.connect();
    this.listIo.item.subscribe(newItem => {
      this.HandleNewItem(newItem);
    });

    if (this.list) {
      this.UpdateSelectedList(this.list);
    }
  }

  HandleNewItem(item) {
    if (!item) {
      return;
    }

    console.log('got a new item!');
    const index = this.listDetails.findIndex(elem => parseInt(elem.id, 10) === parseInt(item.id, 10));

    if (index > -1) {
      this.listDetails.splice(index, 1, item);
    } else {
      this.listDetails.push(item);
    }
  }

  UpdateSelectedList(list) {
    console.log('recieved updated list selection');
    console.log(list);
    this.list = list;
    this.api.getListDetails(list.id)
      .pipe(
        tap(data => console.log(data)),
      )
      .subscribe(details => {
        details.sort((a, b) => {
          if (a.ordering > b.ordering) {
            return 1;
          } else if (a.ordering === b.ordering) {
            return a.id > b.id ? 1 : -1;
          } else {
            return -1;
          }
        });
        this.listDetails = details;
        this.listIo.requestList(this.list.id);
      });
  }

  UpdateItem(item) {
    this.api.updateListDetail(this.list.id, item.id, item)
    .subscribe(data => console.log('item updated'));
  }

  AddListItem(item) {
    console.log('adding');
    this.api.addListDetail(this.list.id, item)
    .subscribe((data) => console.log(data));
  }

}
