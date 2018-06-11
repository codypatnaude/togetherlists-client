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

  constructor() { }

  ngOnInit() {
  }

  HandleItemChange(item) {
    console.log('item changed!');
    console.log(item);
    this.itemUpdate.emit(item);
  }
}
