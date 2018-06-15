import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input()
  listDetails = [];

  @Output()
  itemUpdate = new EventEmitter<any>();

  sortableOptions = {
    onUpdate: (event: any) => this.OnSortUpdate(event),
    handle: '.handle'
  };

  constructor() { }

  ngOnInit() {
  }

  OnSortUpdate(event: any) {
    console.log(event);
    console.log(this.listDetails);
    this.listDetails.forEach((item, index) => {
      item.ordering = index;
      this.itemUpdate.emit(item);
    });
  }

  HandleItemChange(item) {
    console.log('item changed!');
    console.log(item);
    this.itemUpdate.emit(item);
  }
}
