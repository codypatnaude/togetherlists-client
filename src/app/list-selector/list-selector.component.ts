import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.css']
})
export class ListSelectorComponent implements OnInit {

  lists;
  showNewListEntry = false;

  @Input()
  listId;

  @Output()
  update = new EventEmitter<any>();

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getLists().subscribe(lists => this.lists = lists);
  }

  UpdateSelection() {
    if (this.listId === 'NEW_LIST') {
      this.showNewListEntry = true;
      console.log('Adding new list');
    } else {
      const list  = this.lists.find(elem => parseInt(this.listId, 10) === elem.id);
      this.update.emit(this.lists.find(elem => parseInt(this.listId, 10) === elem.id));
    }
  }

  CreateList(form: NgForm) {
    console.log(form.value);
    this.api.createList(form.value)
    .subscribe(
      list => {
        console.log(list);
        form.reset();
        this.lists.push(list);
        this.listId = list.id;
        this.showNewListEntry = false;
        this.update.emit(list);
      }
    );
  }

}
