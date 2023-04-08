import { Component } from '@angular/core';
import { TiModalService, TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './treeselect-modal.html'
})
export class TreeselectModalComponent {
  constructor(private tiModal: TiModalService) {}

  openModal(): void {
    this.tiModal.open(ModalTestComponent, {});
  }
}
@Component({
  template: `
    <ti-modal-header> 在弹窗中使用树下拉选择组件 </ti-modal-header>
    <ti-modal-body>
      <ti-treeselect [options]="options" [(ngModel)]="value" placeholder="Please select" id="treeselect-modal"> </ti-treeselect>
    </ti-modal-body>
    <ti-modal-footer>
      <button type="button" (click)="close()" tiButton>OK</button>
      <button type="button" (click)="dismiss()" tiButton>Cancel</button>
    </ti-modal-footer>
  `
})
export class ModalTestComponent {
  options: Array<TiTreeNode> = [];
  value: TiTreeNode = TiTreeUtil.getTreeSelectedData(this.options, true, true);
  data: Array<TiTreeNode> = [
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

  ngOnInit(): void {
    this.options = this.data;
    this.value = TiTreeUtil.getTreeSelectedData(this.options, true, true);
  }

  // 模板中实际调用的是Modal服务提供的close和dismiss方法，并非此处定义的方法；
  // 在此处定义close和dismiss方法只是为了避免生产环境打包时报错
  close(): void {}
  dismiss(): void {}
}
