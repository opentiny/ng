import { Component } from '@angular/core';

enum EnglishName {
  America,
  Brazil,
  Canada,
  China,
  France,
  Germany,
  Japan,
  SouthKorea,
  Turkey,
  UnitedKingdom
}

@Component({
  templateUrl: './select-enum.html'
})
export class SelectEnumComponent {
  myOptions: Array<any> = [
    {
      label: '美国',
      englishname: EnglishName.America
    },
    {
      label: '巴西',
      englishname: EnglishName.Brazil
    },
    {
      label: '加拿大',
      englishname: EnglishName.Canada
    },
    {
      label: '中国',
      englishname: EnglishName.China
    },
    {
      label: '法国',
      englishname: EnglishName.France
    },
    {
      label: '德国',
      englishname: EnglishName.Germany
    },
    {
      label: '日本',
      englishname: EnglishName.Japan
    },
    {
      label: '韩国',
      englishname: EnglishName.SouthKorea
    },
    {
      label: '土耳其',
      englishname: EnglishName.Turkey
    },
    {
      label: '大不列颠和北爱兰联合王国',
      englishname: EnglishName.UnitedKingdom
    }
  ];

  mySelected1: EnglishName;
  mySelecteds: Array<EnglishName>;
}
