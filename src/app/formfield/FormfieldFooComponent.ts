import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TiButtonItem } from '@opentiny/ng';

@Component({
  selector: 'ti-formfield-foo',
  templateUrl: './formfield-foo.html',
})
export class FormfieldFooComponent implements OnInit {
  title: string = '单列表单';
  item1: any = {
    show: true,
    label: '时间:',
    required: true,
    options: [
      {
        text: '近1小时',
        value: 1,
      },
      {
        text: '近12小时',
        value: 12,
      },
      {
        text: '近1天',
        value: 24,
      },
      {
        text: '近3天',
        value: 72,
      },
    ],
  };
  item2: any = {
    label: '容量',
    required: true,
    value: 'happy',
  };
  item3: any = {
    show: true,
    label: '时光',
    required: true,
  };

  profileForm: FormGroup;
  max: number = 10000;
  min: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      time: [undefined],
      spinner: [16],
    });

    this.profileForm
      .get('time')
      .valueChanges.subscribe((option: TiButtonItem) => {
        console.log('value', option);

        this.item2.show = option.value > 12;
      });

    this.profileForm.get('spinner').valueChanges.subscribe((value) => {
      console.log('spinner', value);
    });
  }
}
