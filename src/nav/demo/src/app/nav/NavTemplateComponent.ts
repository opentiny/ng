import { Component } from '@angular/core';
import { TiNavMenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './nav-template.html'
})
export class NavTemplateComponent {
  items: TiNavMenuItem[] = [
    { label: '首页', id: 'home' },
    {
      label: '组件总览',
      id: 'component',
      children: [
        {
          label: '使用指南',
          icon: 'check-circle',
          id: 'doc',
          children: [
            { label: '介绍', id: 'intro' },
            { label: '快速上手', id: 'start' },
            { label: '主题配置', id: 'theme' },
            { label: '国际化', id: 'locale' },
            { label: '常见问题', id: 'q&a' }
          ]
        },
        {
          label: '表单选择',
          id: 'form-select',
          children: [
            { label: '按钮', id: 'button' },
            { label: '选择器', id: 'select' },
            { label: '单选框', id: 'radio' },
            { label: '复选框', id: 'checkbox' }
          ]
        },
        {
          label: '表单文本',
          id: 'form-text',
          children: [
            { label: '文本框', id: 'input-text' },
            { label: '多行文本', id: 'input-textarea' },
            { label: '自动补全', id: 'autocomplete' },
            { label: '搜索框', id: 'search' }
          ]
        }
      ]
    }
  ];
}
