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
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TiLocale } from '@opentiny/ng-locale';
import { Util } from '@opentiny/ng-utils';
import { TiMessageButtonConfig } from './TiMessageInterface';

/**
 * messge类型设置
 */
export type TiMessageType = 'prompt' | 'warn' | 'error' | 'confirm';
/**
 * @ignore
 * message模板组件定义
 */
@Component({
  selector: 'ti-message',
  templateUrl: './TiMessageComponent.html',
  styleUrls: ['./message.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiMessageComponent implements OnInit {
  // 常量配置
  private CONST_CONFIG: any = {
    validType: ['confirm', 'error', 'warn', 'prompt'],
    defaultType: 'confirm'
  };
  @Input() id: string;
  @Input() title: string;
  @Input() type: TiMessageType;
  @Input() content: any;
  @Input() context: any;
  @Input() okButton: TiMessageButtonConfig;
  @Input() cancelButton: TiMessageButtonConfig;
  @Input() close: () => void;
  @Input() dismiss: () => void;
  public contentConfig: any; // 内容区域属性配置
  private readonly localeWords = TiLocale.getLocaleWords();

  /**
   * 设置按钮属性（除primary和autofocus外）
   * @param options 外部配置属性
   * @param defaults 按钮text和click属性
   * @returns 合并后的属性
   */
  private static setBtn(
    options: TiMessageButtonConfig,
    defaults: {
      text?: string;
      click(): void;
    }
  ): TiMessageButtonConfig {
    const defaultOpts: TiMessageButtonConfig = {
      show: true,
      disabled: false,
      ...defaults
    };
    if (typeof options === 'object') {
      return { ...defaultOpts, ...options };
    }

    return defaultOpts;
  }

  ngOnInit(): void {
    this.setType();
    this.setTitle();
    this.setBtns();
    this.setContent();
  }
  private setType(): void {
    const validType: Array<TiMessageType> = this.CONST_CONFIG.validType;
    const defaultType: TiMessageType = this.CONST_CONFIG.defaultType;
    if (validType.indexOf(this.type) === -1) {
      this.type = defaultType;
    }
  }
  private setTitle(): void {
    if (typeof this.title === 'string') {
      return;
    }
    // 不同类型的message有默认title
    this.title = this.localeWords.tiMessage[this.type];
  }
  /**
   * 设置按钮属性：
   * 对按钮的设置支持Object类型
   * 为Object类型时，覆盖和扩展默认设置
   */
  private setBtns(): void {
    this.okButton = TiMessageComponent.setBtn(this.okButton, {
      text: this.localeWords.tiMessage.ok,
      click: (): void => {
        this.close();
      }
    });
    this.cancelButton = TiMessageComponent.setBtn(this.cancelButton, {
      text: this.localeWords.tiMessage.cancel,
      click: (): void => {
        this.dismiss();
      }
    });

    this.setBtnUniqueState('autofocus');
    this.setBtnUniqueState('primary');
  }
  /**
   * 设置按钮属性，确保默认状态只在一个按钮生效
   * @param prop 按钮属性
   */
  private setBtnUniqueState(prop: string): void {
    if (Util.isUndefined(this.okButton[prop]) && Util.isUndefined(this.cancelButton[prop])) {
      this.okButton[prop] = true;
    }
  }
  private setContent(): void {
    this.contentConfig = {
      content: this.content,
      context: this.context
    };
  }
  public setId(suffix: string): string {
    if (Util.isUndefined(this.id)) {
      return '';
    }

    return `${this.id}${suffix}`;
  }
}
