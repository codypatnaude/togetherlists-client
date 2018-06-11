import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.css']
})
export class ListSelectorComponent implements OnInit {

  lists;
  listId;

  @Output()
  update = new EventEmitter<any>();

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getLists().subscribe(lists => this.lists = lists);
  }

  UpdateSelection() {
    const list  = this.lists.find(elem => parseInt(this.listId, 10) === elem.id);
    this.update.emit(this.lists.find(elem => parseInt(this.listId, 10) === elem.id));
  }

}
