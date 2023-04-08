/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { CountryCode } from 'libphonenumber-js/max';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiValidationConfig } from '@opentiny/ng-validation';
import { TiSelectComponent } from '@opentiny/ng-select';
import { TiTextComponent } from '@opentiny/ng-text';

export interface TiCountryCode {
  /**
   * 国家/地区码
   */
  ISO2Code: CountryCode;
  /**
   * 国家
   */
  Name: string;
  /**
   * 区号
   */
  CountryCode: string;
}
@Component({
  selector: 'ti-phonenumber',
  templateUrl: './phonenumber.html',
  styleUrls: ['./phonenumber.less'],
  providers: [TiFormComponent.getValueAccessor(TiPhonenumberComponent)]
})
export class TiPhonenumberComponent extends TiFormComponent implements OnInit {
  /*
   * 下拉框是否灰化
   */
  @Input() selectDisabled = false;
  /**
   * 校验类型
   */
  @Input() validType: 'blur' | 'change' = 'change';
  /**
   * 当前国家/地区码
   */
  @Input() country: CountryCode = 'CN'; // 默认为中国大陆
  /**
   * 国家/地区码数据集
   */
  @Input() options: Array<TiCountryCode>;
  /**
   * 下拉选中项变化时触发的回调，参数：当前国家/地区码
   */
  @Output() readonly countryChange: EventEmitter<CountryCode> = new EventEmitter<CountryCode>();
  /**
   * 下拉项选中时触发的回调，参数：当前国家/地区码
   */
  @Output() readonly countrySelect: EventEmitter<CountryCode> = new EventEmitter();
  /**
   * @ignore
   * 校验配置
   */
  public validation: TiValidationConfig;
  /**
   * @ignore
   * select组件
   */
  @ViewChild('select', { static: true }) selectComp: TiSelectComponent;
  /**
   * @ignore
   */
  @ViewChild('input', { static: true }) inputComp: TiTextComponent;

  constructor(protected hostRef: ElementRef, protected renderer2: Renderer2, cdRef: ChangeDetectorRef) {
    super(hostRef, renderer2, cdRef);
  }

  ngOnInit() {
    super.ngOnInit();
    // 设置组件可聚焦元素
    this.setFocusableElems([this.selectComp.nativeElement].concat(this.inputComp.nativeElement));
    // 校验配置
    this.validation = {
      type: this.validType
    };
  }
  /**
   * @ignore
   * 下拉组件select事件
   */
  onSelect(event: TiCountryCode): void {
    this.countrySelect.emit(event.ISO2Code);
  }
  /**
   * @ignore
   * 下拉组件ngModelChange事件
   */
  onNgModelChange(event: CountryCode): void {
    this.country = event;
    this.countryChange.emit(event);
  }
}
