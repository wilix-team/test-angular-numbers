import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbersInput]'
})
export class OnlyNumbersInputDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) public onKeyDown(event) {
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||
    (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
    (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
    (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
    (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
    (event.keyCode >= 35 && event.keyCode <= 39)) {
      return;
    }
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }
}



