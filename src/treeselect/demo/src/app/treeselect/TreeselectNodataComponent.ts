import { Component } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './treeselect-nodata.html'
})
export class TreeselectNodataComponent {
  options: Array<TiTreeNode> = [];
  value: TiTreeNode = TiTreeUtil.getTreeSelectedData(this.options, true, false);
  noDataText: string = '空数据';
}
