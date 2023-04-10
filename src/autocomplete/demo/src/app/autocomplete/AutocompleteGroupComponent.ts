import { Component } from '@angular/core';

@Component({
  templateUrl: './autocomplete-group.html'
})
export class AutocompleteGroupComponent {
  public options: Array<any> = [
    {
      label: '北美洲',
      children: [
        { label: '美国', englishname: 'America', flag: 'assets/world_falg/america_flag.png', disabled: true },
        { label: '加拿大', englishname: 'Canada', flag: 'assets/world_falg/canada_flag.png', disabled: true }
      ]
    },
    {
      label: '南美洲',
      children: [{ label: '巴西', englishname: 'Brazil', flag: 'assets/world_falg/brazil_flag.png', disabled: false }]
    },
    {
      label: '亚洲',
      children: [
        { label: '中国', englishname: 'China', flag: 'assets/world_falg/china_flag.png', disabled: false },
        { label: '日本', englishname: 'Japan', flag: 'assets/world_falg/japan_flag.png' },
        { label: '韩国', englishname: 'South Korea', flag: 'assets/world_falg/south_korea_flag.png' }
      ]
    },
    {
      label: '欧洲',
      children: [
        { label: '法国', englishname: 'France', flag: 'assets/world_falg/france_flag.png', disabled: true },
        { label: '德国', englishname: 'Germany', flag: 'assets/world_falg/germany_flag.png', disabled: false },
        { label: '土耳其', englishname: 'Turkey', flag: 'assets/world_falg/turkey_flag.png' },
        { label: '大不列颠和北爱兰联合王国', englishname: 'United Kingdom', flag: 'assets/world_falg/united_kingdom_flag.png' }
      ]
    }
  ];
}
