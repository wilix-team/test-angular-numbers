import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnimatedNumberComponent } from './components/animated-number/animated-number.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumbersInputDirective } from './shared/directives/only-numbers-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    AnimatedNumberComponent,
    InputComponent,
    OnlyNumbersInputDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
