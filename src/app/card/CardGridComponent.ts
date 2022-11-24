import { Component } from '@angular/core';

@Component({
    templateUrl: './card-grid.html'
})

export class CardGridComponent {
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
