import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'my-bar-first',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>I am from Bar First Component</h1>
  `,
})
export class BarFirstComponent {
  
}
