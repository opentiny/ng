import { Component, OnInit, ViewChild } from '@angular/core';
import { TiTreeComponent, TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './tree-virtualscroll.html',
  styleUrls: ['./treeTest.less']
})
export class TreeVirtualscrollComponent implements OnInit {
  @ViewChild('tree', { static: true }) treeCom: TiTreeComponent;
  data: Array<TiTreeNode> = [];
  ngOnInit(): void {
    this.data = this.createData('node-radio', 3, 60);
  }
  createData(
    parentLabel: string,
    level: number,
    num: number
  ): Array<TiTreeNode> {
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

  scrollStart(): void {
    this.treeCom.virtualScrollViewport.scrollToIndex(0, 'smooth');
  }

  scrollMiddle(): void {
    TiTreeUtil.traverse(this.data, (node: TiTreeNode) => {
      return node.expanded = false;
    });

    this.treeCom.virtualScrollViewport.scrollToIndex(this.data.length / 2, 'smooth');
  }

  scrollEnd(): void {
    TiTreeUtil.traverse(this.data, (node: TiTreeNode) => {
      return node.expanded = false;
    });

    this.treeCom.virtualScrollViewport.scrollToIndex(this.data.length, 'smooth');
  }
}
