import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output()
  public updateNumberEvent = new EventEmitter<number>();
  numberForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.numberForm = this.formBuilder.group({
      number: [0, Validators.required]
    });
  }

  public updateNumber() {
    this.updateNumberEvent.emit(this.numberForm.controls.number.value);
  }

}
