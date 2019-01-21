import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(InputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button onclick should call updateNumber', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    spyOn(component, 'updateNumber');

    buttonElement.nativeElement.click();

    expect(component.updateNumber).toHaveBeenCalled();
  })

  it('updateNumber () should emit @Output event emitter', () => {
    let emittedValue: number;

    component.updateNumberEvent.subscribe((value) => emittedValue = value);
    component.numberForm.controls.number.patchValue(5);
    component.updateNumber();

    expect(emittedValue).toBe(5);
  })
});
