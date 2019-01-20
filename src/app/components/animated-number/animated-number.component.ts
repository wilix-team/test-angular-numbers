import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-animated-number',
  templateUrl: './animated-number.component.html',
  styleUrls: ['./animated-number.component.css']
})
export class AnimatedNumberComponent implements OnInit, OnChanges {
  @Input()
  public number: number;

  private duration = 0.5;
  private decimal = '.';
  private decimals = 2;
  private startTime: number;
  private countDown: boolean;
  private frameVal: number;
  private value: number;
  private prevValue: number;
  private requestAnimationFrame: any;

  public result: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.number.previousValue) {
      this.value = Number(changes.number.currentValue);
      this.prevValue = 0;
      this.countDown = (this.prevValue > this.value);
      this.start();
    }
    if (changes.number.currentValue) {
      this.value = changes.number.currentValue;
      this.update(this.value);
    }
  }

  private formatNumber(number: number, decimals: number, decimalDelimiter: string) {
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

  private printValue(value: number) {
    this.result = this.formatNumber(value, this.decimals, this.decimal) + '₽';
  }

  private count = (timestamp: number) => {
    const duration = this.duration * 1000 || 2000;
    if (!this.startTime) { this.startTime = timestamp; }

    const progress = timestamp - this.startTime;

    if (this.countDown) {
      this.frameVal = this.prevValue - ((this.prevValue - this.value) * (progress / duration));
    } else {
      this.frameVal = this.prevValue + (this.value - this.prevValue) * (progress / duration);
    }

    if (this.countDown) {
      this.frameVal = (this.frameVal < this.value) ? this.value : this.frameVal;
    } else {
      this.frameVal = (this.frameVal > this.value) ? this.value : this.frameVal;
    }

    const decimal = Math.pow(10, this.decimals);
    this.frameVal = Math.round(this.frameVal * decimal) / decimal;

    this.printValue(this.frameVal);

    if (progress < duration) {
      this.requestAnimationFrame = requestAnimationFrame(this.count);
    }
  }

  private update(newValue: number) {
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

  public start() {
    this.requestAnimationFrame = requestAnimationFrame(this.count);
  }

}
