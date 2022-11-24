import { Component } from '@angular/core';
import { TiNavMenuItem } from '@opentiny/ng/components/nav/interface';

@Component({
  templateUrl: './nav-submenu.html',
})
export class NavSubmenuComponent {
  items: TiNavMenuItem[] = [
    { label: '首页' },
    { label: '组件总览' },
    {
      label: '使用指南',
      children: [
        { label: '介绍' },
        { label: '快速上手' },
        { label: '主题配置' },
        { label: '国际化' },
        { label: '常见问题' },
      ],
    },
    {
      label: '表单选择',
      children: [
        { label: '按钮' },
        { label: '选择器' },
        { label: '单选框' },
        { label: '复选框' },
      ],
    },
    {
      label: '表单文本',
      children: [
        { label: '文本框' },
        { label: '多行文本框' },
        { label: '自动补全' },
        { label: '搜索框' },
      ],
    },
  ];

  items2: TiNavMenuItem[] = [
    { label: '首页' },
    {
      label: '组件总览',
      children: [
        {
          label: '使用指南',
          children: [
            { label: '介绍' },
            { label: '快速上手' },
            { label: '主题配置' },
            { label: '国际化' },
            { label: '常见问题' },
          ],
        },
        {
          label: '表单选择',
          children: [
            { label: '按钮' },
            { label: '选择器' },
            { label: '单选框' },
            { label: '复选框' },
          ],
        },
        {
          label: '表单文本',
          children: [
            { label: '文本框' },
            { label: '多行文本框' },
            { label: '自动补全' },
            { label: '搜索框' },
          ],
        },
      ],
    },

  ];
}
