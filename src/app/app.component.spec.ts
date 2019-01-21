import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { AnimatedNumberComponent } from './components/animated-number/animated-number.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Output, Directive } from '@angular/core';
import { By } from '@angular/platform-browser';    


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  @Directive({
    selector: 'app-input'
  })
  class MockInputDirective {
    @Output('updateNumberEvent')
    public updateNumberEventEmmitter = new EventEmitter<number>();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        InputComponent,
        AnimatedNumberComponent,
        MockInputDirective
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should call updateNumber() if event catched', async(() => {
    spyOn(component, 'updateNumber');

    const mockInputElement = fixture.debugElement.query(By.directive(MockInputDirective));
    const mockInputComponent = mockInputElement.injector.get(MockInputDirective) as MockInputDirective;
  
    mockInputComponent.updateNumberEventEmmitter.emit(0);
    expect(component.updateNumber).toHaveBeenCalled(); 
  }));

  it('should update number when updateNumber() is called', async(() => {
    component.updateNumber(5);
    expect(component.number).toBe(5); 
  }));
});