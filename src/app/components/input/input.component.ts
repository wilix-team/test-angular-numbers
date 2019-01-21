import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output()
  public updateNumberEvent = new EventEmitter<number>();
  numberForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.numberForm = new FormGroup({number: new FormControl(0, Validators.required)})
  }

  public updateNumber() {
    this.updateNumberEvent.emit(this.numberForm.controls.number.value);
  }

}
