import { Component } from '@angular/core';

@Component({
  templateUrl: './score-limittext.html'
})
export class ScoreLimittextComponent {
  minText: string = '非常不可能';
  maxText: string = '非常可能';
}
