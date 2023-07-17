import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'my-bar-second',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>I am from Bar Second Component</h1>
  `,
})
export class BarSecondComponent {}
