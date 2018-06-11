import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-input',
  templateUrl: './item-input.component.html',
  styleUrls: ['./item-input.component.css']
})
export class ItemInputComponent implements OnInit {

  @Output()
  addItem = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  submitItem(form: NgForm) {
    console.log(form.value);
    this.addItem.emit(form.value);
    form.reset();
  }

}
