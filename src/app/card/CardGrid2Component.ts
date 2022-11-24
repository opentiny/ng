import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    templateUrl: './card-grid2.html'
})

export class CardGrid2Component {
   cards: Array<any> = [
     {
       title: 'card-0'
     },
     {
       title: 'card-1'
     },
     {
       title: 'card-2'
     },
     {
       title: 'card-3'
     },
     {
       title: 'card-4'
     },
     {
       title: 'card-5'
     },
   ]
}
