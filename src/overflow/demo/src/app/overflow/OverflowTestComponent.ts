import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './overflow-test.html'
})
export class OverflowTestComponent {
  constructor(private router: Router) {}
  goto(): void {
    this.router.navigate(['/autocomplete/autocomplete-events']);
  }
}
