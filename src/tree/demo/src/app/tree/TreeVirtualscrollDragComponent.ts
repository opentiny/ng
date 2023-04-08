import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './tree-virtualscroll-drag.html',
  encapsulation: ViewEncapsulation.None
})
export class TreeVirtualscrollDragComponent implements OnInit {
  data1: Array<TiTreeNode> = [];
  data2: Array<TiTreeNode> = [];
  selectedData1: Array<TiTreeNode>;
  selectedData2: Array<TiTreeNode>;

  ngOnInit(): void {
    this.data1 = this.createData('node-radio', 3, 60);
    this.data2 = this.createData('node-multiple', 3, 50);
  }

  onSelect1(event: TiTreeNode): void {
    // 获取当前选中项，参数：树节点数据，选中项是否只包含叶子节点，是否多选
    this.selectedData1 = TiTreeUtil.getSelectedData(this.data1, false, false);
  }

  onSelect2(event: TiTreeNode): void {
    // 获取当前选中项，参数：树节点数据，选中项是否只包含叶子节点，是否多选
    this.selectedData2 = TiTreeUtil.getSelectedData(this.data2, false, true);
  }

  createData(parentLabel: string, level: number, num: number): Array<TiTreeNode> {
    const result: Array<TiTreeNode> = [];
    for (let i: number = 0; i < num; i++) {
      const item: TiTreeNode = {
        label: `${parentLabel}-${i}`
      };
      if (level > 1) {
        item.children = this.createData(item.label, level - 1, num);
      }
      result.push(item);
    }

    return result;
  }
}
