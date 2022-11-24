import { Component } from '@angular/core';

@Component({
  templateUrl: './alert-messages.html',
})
export class AlertMessagesComponent {
  items1: Array<any> = [
    {
      title: '咏柳（默认支持轮播，轮播速度2秒）',
      content: '碧玉妆成一树高，万条垂下绿丝绦。不知细叶谁裁出，二月春风似剪刀。',
    },
    {
      title: '静夜思',
      content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
    },
    {
      title: '春晓',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
    },
    {
      title: '山行',
      content: '远上寒山石径斜，白云深处有人家。停车坐爱枫林晚，霜叶红于二月花。',
    },
  ];
  items2: Array<any> = [
    {
      title: '咏柳（不支持轮播）',
      content: '碧玉妆成一树高，万条垂下绿丝绦。不知细叶谁裁出，二月春风似剪刀。'
    },
    {
      title: '静夜思',
      content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。'
    },
    {
      title: '春晓',
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。'
    },
    {
      title: '山行',
      content: '远上寒山石径斜，白云深处有人家。停车坐爱枫林晚，霜叶红于二月花。'
    },
  ];
}
