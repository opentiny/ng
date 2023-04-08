import { Component } from '@angular/core';

@Component({
  templateUrl: './select-noempty.html'
})
export class SelectNoemptyComponent {
  myOptions: Array<any> = [
    {
      label: '美国',
      englishname: 'America'
    },
    {
      label: '',
      englishname: 'Brazil'
    },
    {
      label: '加拿大',
      englishname: 'Canada'
    },
    {
      label: '',
      englishname: 'China'
    },
    {
      label: '法国',
      englishname: 'France'
    },
    {
      label: '',
      englishname: 'Germany'
    },
    {
      label: '日本',
      englishname: 'Japan'
    },
    {
      label: '',
      englishname: 'South Korea'
    },
    {
      label: '土耳其',
      englishname: 'Turkey'
    },
    {
      label: '大不列颠和北爱兰联合王国',
      englishname: 'United Kingdom'
    }
  ];

  mySelected: any;
}
