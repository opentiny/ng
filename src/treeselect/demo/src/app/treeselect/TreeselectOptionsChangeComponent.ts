import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './treeselect-options-change.html'
})
export class TreeselectOptionsChangeComponent implements OnInit {
  options: Array<TiTreeNode> = [];
  value: TiTreeNode = [];
  myOptions: Array<TiTreeNode> = [
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
              label: '冰箱'
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
    }
  ];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // 模拟请求后台数据
    setTimeout((): void => {
      this.options = this.myOptions;
      this.value = TiTreeUtil.getTreeSelectedData(this.options, true, true);
      // OnPush模式下，异步刷新都需要手动触发。
      this.cdRef.markForCheck();
    }, 2000);
  }
}
