import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuggestionItem } from './TagsInputPanelwidthComponent';
@Component({
  templateUrl: './tagsinput-reactive.html',
})
export class TagsinputReactiveComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  suggestions: Array<SuggestionItem> = [
    { id: '1', label: '中文 Chinese' },
    { id: '2', label: '英文 English' },
    { id: '3', label: '拉美西语 Latin American' },
    { id: '4', label: '欧洲西语 European Spanish' },
    { id: '5', label: '法语 French' },
    { id: '6', label: '葡萄牙语 Portuguese' }
];

  ngOnInit(): void {
    this.form = this.fb.group({
      mytagsInput: [[this.suggestions[0]]] // 设置初始值
  });
  }
}
