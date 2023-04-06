import { ChangeDetectorRef, Component } from '@angular/core';
import { TiTreeNode, TiTreeselectComponent, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './treeselect-lazyload.html'
})
export class TreeselectLazyloadComponent {
  options: Array<TiTreeNode> = [];
  value: TiTreeNode = TiTreeUtil.getTreeSelectedData(this.options, true, false);

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  onBeforeOpen(treeselectComp: TiTreeselectComponent): void {
    setTimeout(() => {
      this.options = [
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
          checked: 'indeterminate',
          children: [
            {
              label: '男装',
              checked: true
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

      // 此处设置options的值，无法触发ngOnInit，需要设置下oldOptions
      treeselectComp.oldOptions = this.options;
      this.value = TiTreeUtil.getTreeSelectedData(this.options, true, false);
      // OnPush模式下，异步刷新都需要手动触发。
      this.changeDetectorRef.markForCheck();
      treeselectComp.open();
    }, 1000);
  }
}
