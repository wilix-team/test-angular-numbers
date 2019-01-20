import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output()
  public updateNumberEvent = new EventEmitter<number>();
  number: FormControl;

  constructor() { }

  ngOnInit() {
    this.number = new FormControl(0, Validators.required);
  }

  public updateNumber() {
    this.updateNumberEvent.emit(this.number.value);
  }

}
