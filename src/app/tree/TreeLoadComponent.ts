import { Component } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './tree-load.html',
})
export class TreeLoadComponent {
  /**
   * 初始值采用空数据。经测试，初始值为undefined或null，会报错。
   */
  myData: Array<TiTreeNode> = [];

  private dataA: Array<TiTreeNode> = [
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
              children: [
                {
                  label: '海尔空调',
                },
                {
                  label: '美的空调',
                },
              ],
            },
            {
              label: '冰箱',
            },
            {
              label: '洗衣机',
            },
            {
              label: '热水器',
            },
          ],
        },
        {
          label: '生活电器',
          children: [
            {
              label: '加湿器',
            },
            {
              label: '电熨斗',
            },
          ],
        },
      ],
    },
    {
      label: '服饰',
      expanded: true,
      checked: 'indeterminate',
      children: [
        {
          label: '男装',
          checked: true,
        },
        {
          label: '女装',
        },
      ],
    },
    {
      label: '化妆',
      children: [
        {
          label: '面部护理',
        },
        {
          label: '口腔护理',
        },
      ],
    },
  ];
  private dataB: Array<TiTreeNode> = [
    {
      label: '家用电器',
      children: [],
    },
    {
      label: '服饰',
      children: [],
    },
    {
      label: '视频',
      children: [],
    },
    {
      label: '食品',
      children: [],
    },
  ];
  // 获取当前选中项，参数：树节点数据，选中项是否只包含叶子节点，是否多选
  selectedData: Array<TiTreeNode> = TiTreeUtil.getSelectedData(
    this.myData,
    false,
    false
  );
  onChange(event: TiTreeNode): void {
    console.log(event);
    // 获取当前选中项，参数：树节点数据，选中项是否只包含叶子节点，是否多选
    this.selectedData = TiTreeUtil.getSelectedData(this.myData, false, false);
  }
  // 每个组件都用下面六个函数，只改变函数内容
  changeUndefined(): void {
    this.myData = undefined;
  }
  changeNull(): void {
    this.myData = null;
  }
  changeWrongType(): void {
    const temp: any = 5;
    this.myData = temp;
  }
  changeNullData(): void {
    this.myData = [];
    this.selectedData = TiTreeUtil.getSelectedData(this.myData, false, false);
  }
  changeDataA(): void {
    this.myData = this.dataA;
    this.selectedData = TiTreeUtil.getSelectedData(this.myData, false, false);
  }
  changeDataB(): void {
    this.myData = this.dataB;
    this.selectedData = TiTreeUtil.getSelectedData(this.myData, false, false);
  }
}
