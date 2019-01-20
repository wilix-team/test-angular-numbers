import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumbersInputDirective } from './directives/only-numbers-input.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OnlyNumbersInputDirective],
  exports: [OnlyNumbersInputDirective]
})
export class SharedModule { }
