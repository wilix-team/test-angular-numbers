import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AnimatedNumberComponent } from './animated-number.component';
import { Component, SimpleChange, DebugElement, OnInit } from '@angular/core';

describe('AnimatedNumberComponent', () => {
  let testHostFixture: ComponentFixture<TestHostComponent>; 
  let testDebugElement: DebugElement;
  beforeEach(async(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    TestBed.configureTestingModule({
      declarations: [ AnimatedNumberComponent, TestHostComponent ]
    })
    .compileComponents().then(() => {
      testHostFixture = TestBed.createComponent(TestHostComponent);
      testDebugElement = testHostFixture.debugElement;
    });
  }));

  it('should create', () => {
    expect(testDebugElement.children[0].componentInstance).toBeTruthy();
  });

  it('ngOnChanges should set "number" value', () => {
    testHostFixture.detectChanges();

    expect(testDebugElement.children[0].componentInstance.number).toBe(5);
  });

  it('ngOnChanges should render new value if number provided', (done) => {
    // you should keep browser window opened
    testDebugElement.children[0].componentInstance.ngOnChanges({ number: new SimpleChange(null, 5, false) });
    testHostFixture.detectChanges();
    testDebugElement.children[0].componentInstance.onAnimated.subscribe(() => {
      try {
        expect(testDebugElement.children[0].componentInstance.result).toBe('5.00₽');
        done();
      } catch (e) {
        done.fail(e);
      }
    });
  });

  @Component({
    selector: `host-component`,
    template: `<app-animated-number [number]="number"></app-animated-number>`
  })
  class TestHostComponent implements OnInit {
    number: number;
  
    ngOnInit() {
      this.number = 5;
    }
  }
});
