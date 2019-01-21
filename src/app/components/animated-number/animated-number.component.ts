import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-animated-number',
  templateUrl: './animated-number.component.html',
  styleUrls: ['./animated-number.component.css']
})
export class AnimatedNumberComponent implements OnChanges {
  @Input()
  public number;

  @Output()
  public onAnimated = new EventEmitter<boolean>();

  private duration = 0.5;
  private decimalDelimiter = '.';
  private decimals = 2;
  private startTime: number;
  private countDown: boolean; // should we decrement or not
  private frameVal: number;
  private value: number;
  private prevValue: number;
  private requestAnimationFrame: any;

  public result = '0.00₽';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.number && !changes.number.previousValue && !changes.number.firstChange) {
      this.value = Number(changes.number.currentValue);
      this.prevValue = 0;
      this.countDown = this.prevValue > this.value;
      this.start();
    } else if (changes.number && changes.number.previousValue) {
      this.value = changes.number.currentValue;
      this.prevValue = changes.number.previousValue;
      this.update(this.value);
    }
  }

  private formatNumber(number: number, decimals: number, decimalDelimiter: string): string {
    const negative = (number < 0);
    let x: Array<string>;
    let x1: string;
    let x2: string;
    const stringNumber = Math.abs(number).toFixed(decimals);
    x = stringNumber.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? decimalDelimiter + x[1] : '';
    return (negative ? '-' : '') + x1 + x2;
  }

  private printValue(value: number): void {
    this.result = this.formatNumber(value, this.decimals, this.decimalDelimiter) + '₽';
  }

  private count = (timestamp: number): void => {
    const duration = this.duration * 1000 || 2000;

    if (typeof timestamp !== 'number') {
      timestamp = window.performance.now(); 
    }
    if (!this.startTime) { this.startTime = timestamp; }

    const progress = timestamp - this.startTime;
    if (this.countDown) {
      this.frameVal = this.prevValue - ((this.prevValue - this.value) * (progress / duration));
      this.frameVal = (this.frameVal < this.value) ? this.value : this.frameVal; // check if we goes too far
    } else {
      this.frameVal = this.prevValue + (this.value - this.prevValue) * (progress / duration);
      this.frameVal = (this.frameVal > this.value) ? this.value : this.frameVal;
    }

    const decimal = Math.pow(10, this.decimals);
    this.frameVal = Math.round(this.frameVal * decimal) / decimal;

    this.printValue(this.frameVal);

    if (progress < duration) {
      this.requestAnimationFrame = requestAnimationFrame(this.count);
    } else {
      this.onAnimated.emit(true);
    }
  }

  private update(newValue: number): void {
    if (newValue === this.frameVal) {
      return;
    }

    cancelAnimationFrame(this.requestAnimationFrame);
    this.startTime = null;
    this.prevValue = this.frameVal;
    this.value = newValue;
    this.countDown = (this.prevValue > this.value);
    this.requestAnimationFrame = requestAnimationFrame(this.count);
  }

  private start(): void {
    this.requestAnimationFrame = requestAnimationFrame(this.count);
  }

}
