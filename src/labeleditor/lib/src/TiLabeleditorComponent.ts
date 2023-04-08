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
import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiValidationConfig } from '@opentiny/ng-validation';
import { TiTextComponent } from '@opentiny/ng-text';
import { TiTextareaComponent } from '@opentiny/ng-textarea';
import { Util } from '@opentiny/ng-utils';
/**
 * 可编辑文本组件，主要实现了编辑文本的功能。组件有两种状态：编辑状态和非编辑状态。
 * 在非编辑状态:点击右侧笔图标时，切换到编辑状态。
 * 在编辑状态:点击右侧对号图标时，切换到非编辑状态，
 * 并且将输入框中内容显示在非编辑状态的文本中;
 * 点击右侧叉图标时，切换到非编辑状态，非编辑状态的文本保持之前的不变，用户输入不生效。
 *
 * <example-url>../tinyplus3demo/#/labeleditor/labeleditor-all</example-url>
 */
@Component({
  selector: 'ti-labeleditor',
  templateUrl: 'labeleditor.html',
  styleUrls: ['./labeleditor.less'],
  host: {
    '[class.ti3-labeleditor-editing]': 'isEditing'
  },
  providers: [TiFormComponent.getValueAccessor(TiLabeleditorComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// extends TiFormComponent
export class TiLabeleditorComponent extends TiFormComponent {
  constructor(protected elementRef: ElementRef, protected renderer2: Renderer2, protected changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, renderer2, changeDetectorRef);
  }
  /**
   * 是否超出显示 tip
   */
  @Input() autoTip: boolean = true;
  /**
   * 是否为多行编辑
   */
  @Input() multiline: boolean;
  /**
   * 允许调整文本框大小的方向:
   *
   * none(不可调整组件大小):
   *
   * vertical(仅可调整垂直方向的大小，即调整组件的高度)
   *
   * horizontal(仅可调节水平方向的大小，即调整组件的宽度)
   *
   * both(水平和垂直方向均可调节，宽高都可调节)
   */
  @Input() resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'both';
  /**
   * 文本最大长度
   */
  @Input() maxlength: number;
  /**
   * 编辑图标 tip 内容
   */
  @Input() iconTip: string | TemplateRef<any> | any;
  /**
   * 图标提示内容对应的上下文，tip 内容类型为 templateRef 或 Component 形式时使用
   */
  @Input() iconTipContext: any;
  /**
   * 校验相关信息
   */
  @Input() validation: TiValidationConfig;
  /**
   * 用户自定义同步校验规则
   *
   * 接口值被当作 new FormControl() 的第二个参数
   *
   * 接口类型与 new FormControl() 的第二个参数格式一致，详情参考 angular 表单部分
   */
  @Input() validationRules: Array<ValidatorFn>;
  /**
   *
   * 用户自定义异步校验规则（仅支持单行编辑）
   *
   * 接口值被当作 new FormControl() 的第三个参数
   *
   * 接口类型与 new FormControl() 的第三个参数格式一致，详情参考 angular 表单部分
   */
  @Input() asyncValidatorRules: Array<AsyncValidatorFn>;
  /**
   * 文本域的宽度
   */
  @Input() width: string = '200px';
  /**
   * 文本域的高度
   */
  @Input() height: string;
  /**
   * 非编辑状态的文本最大行数
   */
  @Input() maxLine: number = 3;
  /**
   * 点击编辑按钮触发的回调
   */
  @Output() readonly editor: EventEmitter<any> = new EventEmitter();
  /**
   * 点击确认按钮触发的回调
   */
  @Output() readonly confirm: EventEmitter<any> = new EventEmitter();
  /**
   * 点击取消按钮触发的回调
   */
  @Output() readonly cancel: EventEmitter<any> = new EventEmitter();
  /**
   * @ignore
   */
  @ViewChild('textarea', { static: false }) textareaComp: TiTextareaComponent;
  /**
   * @ignore
   */
  @ViewChild('text', { static: false }) textComp: TiTextComponent;
  /**
   * @ignore
   */
  @ViewChild('confirmIcon') confirmIconEle: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('edit', { static: false }) editEle: ElementRef;
  /**
   * @ignore
   */
  public isEditing: boolean = false; // 是否处于编辑状态
  /**
   * @ignore
   */
  public value: string; // value内容
  /**
   * @ignore
   */
  public oldValue: string; // value内容
  /**
   * @ignore
   */
  public emptyValue: string = '--'; // 内容为空时显示‘--’
  /**
   * @ignore
   */
  public control: FormControl;
  /**
   * @ignore
   */
  public valueInvalid: boolean = false;
  private subscription: Subscription;
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    super.ngOnInit();
    // 如果显示文本框长度的话，文本框高度要加上最大长度文本的高度 18px
    this.height = this.height ? this.height : this.maxlength ? '98px' : '80px';
    this.asyncValidatorRules = this.multiline ? null : this.asyncValidatorRules;
    this.control = new FormControl(this.model, this.validationRules, this.asyncValidatorRules);
    // 校验提示tip默认top方向展开
    if (this.validation) {
      this.validation.tipPosition = Util.isUndefined(this.validation.tipPosition) ? 'top' : this.validation.tipPosition;
    }
    this.subscription = this.control.statusChanges.subscribe((status: string) => {
      this.valueInvalid = status === 'INVALID' || status === 'PENDING';
      // 手动触发变更
      this.changeDetectorRef.markForCheck();
    });
  }
  /**
   * @ignore
   */
  // tslint:disable-next-line:typedef
  ngOnModelChange() {
    if (this.model) {
      this.control.setValue(this.model.slice(0, this.maxlength));
    } else {
      this.control.setValue('');
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * @ignore
   * 点击编辑图标事件
   */
  public onClickEdit(): void {
    if (this.disabled) {
      return;
    }

    this.isEditing = true;
    this.oldValue = this.model;
    this.editor.emit(this.model);
    if (this.model) {
      this.control.setValue(this.model.slice(0, this.maxlength));
    }
    // 这里使用setTimeout是为了延时能够获取到编辑态的输入框
    setTimeout((): void => {
      if (this.multiline) {
        this.textareaComp.nativeElement.focus();
        if (Util.isUndefined(this.maxlength)) {
          this.renderer2.removeAttribute(this.textareaComp.nativeElement, 'maxlength');
        } else {
          this.renderer2.setAttribute(this.textareaComp.nativeElement, 'maxlength', String(this.maxlength));
        }
      } else {
        this.textComp.nativeElement.focus();
      }
    }, 0);
  }
  /**
   * @ignore
   * 点击确认图标事件
   */
  public onClickConfirm(): void {
    if (this.valueInvalid) {
      return;
    }
    this.isEditing = false;
    this.model = this.control.value;
    this.confirm.emit(this.model);
  }
  /**
   * @ignore
   * 点击取消图标事件
   */
  public onClickCancel(): void {
    this.isEditing = false;
    this.cancel.emit(this.model);
    this.control.setValue(this.oldValue);
  }
}
