import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbersInput]'
})
export class OnlyNumbersInputDirective {
  @HostListener('keydown', ['$event']) public onKeyDown(event) {
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }
}



