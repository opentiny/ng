import { Component, ViewEncapsulation } from '@angular/core';
import { TiAutocompleteComponent, TiTreeNode } from '@opentiny/ng';

@Component({
  templateUrl: './autocomplete-test.html',
  styles: ['body { overflow: auto; }'],
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteTestComponent {
  value: string = '';
  value1: string = '';
  mySelected: any = [];
  myselected1: any = [];
  options: Array<object> = [
    {
      label: '华北'
    },
    {
      label: '华南'
    },
    {
      label: '西北'
    },
    {
      label: '西南'
    },
    {
      label: '华北'
    },
    {
      label: '华南'
    },
    {
      label: '西北'
    },
    {
      label: '西南'
    },
    {
      label: '华北'
    },
    {
      label: '华南'
    },
    {
      label: '西北'
    },
    {
      label: '西南'
    }
  ];
  myOptions: Array<any> = [
    {
      label: '美国',
      englishname: 'America',
      disabled: true,
      code: '010'
    },
    {
      label: '巴西',
      englishname: 'Brazil',
      disabled: false,
      code: '020'
    },
    {
      label: '加拿大',
      englishname: 'Canada',
      disabled: true,
      code: null
    },
    {
      label: '中国',
      englishname: 'China',
      disabled: false,
      code: '030'
    },
    {
      label: '法国',
      englishname: 'France',
      disabled: true,
      code: '040'
    },
    {
      label: '德国',
      englishname: 'Germany',
      disabled: false,
      code: '050'
    },
    {
      label: '日本',
      englishname: 'Japan',
      code: null
    },
    {
      label: '韩国',
      englishname: 'South Korea',
      code: '060'
    },
    {
      label: '土耳其',
      englishname: 'Turkey',
      code: '080'
    },
    {
      label: '大不列颠和北爱兰联合王国',
      englishname: 'United Kingdom',
      code: '011'
    }
  ];
  myData: Array<TiTreeNode> = [
    {
      label: '家用电器',
      expanded: true,
      children: [
        {
          label: '大家电',
          expanded: true,
          children: [
            {
              label: '空调',
              expanded: true,
              disabled: false,
              children: [
                {
                  label: '海尔空调'
                },
                {
                  label: '美的空调'
                }
              ]
            },
            {
              label: '冰箱',
              disabled: false
            },
            {
              label: '洗衣机'
            },
            {
              label: '热水器'
            }
          ]
        },
        {
          label: '生活电器',
          children: [
            {
              label: '加湿器'
            },
            {
              label: '电熨斗'
            }
          ]
        }
      ]
    },
    {
      label: '服饰',
      expanded: true,
      children: [
        {
          label: '男装'
        },
        {
          label: '女装'
        }
      ]
    },
    {
      label: '化妆',
      children: [
        {
          label: '面部护理'
        },
        {
          label: '口腔护理'
        }
      ]
    }
  ];

  // 设置建议项
  onSuggest(autocomplete: TiAutocompleteComponent): void {
    // 模拟后台异步请求
    setTimeout(() => {
      const suggestions: Array<object> = this.getSuggestionData(autocomplete.model);
      autocomplete.setSuggestions(suggestions); // 关键点
    }, 200);
  }
  private getSuggestionData(value: string): Array<object> {
    const options: Array<object> = value
      ? [
          {
            label: value
          },
          {
            label: value + value
          },
          {
            label: value + value
          }
        ]
      : [
          {
            label: 'a'
          },
          {
            label: 'b'
          },
          {
            label: 'c'
          },
          {
            label: 'd'
          },
          {
            label: 'a'
          },
          {
            label: 'b'
          },
          {
            label: 'c'
          },
          {
            label: 'd'
          }
        ];

    return options;
  }
}
