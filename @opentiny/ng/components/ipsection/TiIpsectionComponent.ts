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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Injector, Input, Renderer2, SimpleChanges } from '@angular/core';
import { TiFormComponent } from '../base/TiBaseModule';
import { TiValidationConfig } from '../../directives/validation/TiValidationModule';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgControl, NgModel, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface TiIpsectionConfig {
    /**
     * 网段唯一标识
     */
    section: number;
    /**
     * 网段为 select 类型的下拉数据集
     */
    options?: Array<any>;
    /**
     * 网段为 input 类型时文本是否加粗
     */
    bold?: boolean;
    /**
     * 网段为 input 类型时的校验提示信息
     */
    validation?: TiValidationConfig;
    /**
     * 网段为 input 类型时的校验规则，10.1.15 支持 ValidatorFn 类型
     */
    validationRules?: Array<ValidatorFn> | ValidatorFn;
    /**
     * 网段是否禁用
     */
    disabled?: boolean;
    /**
     * 允许有多余的属性字段
     */
    [propName: string]: any;
}
/**
 * Ipsection组件，Ip各网段分开处理，各网段有下拉类和输入类两种类型；
 *
 *
 */
@Component({
    selector: 'ti-ipsection',
    templateUrl: 'ipsection.html',
    styleUrls: ['./ipsection.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-ipsection-container]': 'true',
        '(blur)': 'onBlur($event)'
    },
    providers: [TiFormComponent.getValueAccessor(TiIpsectionComponent)]
})

export class TiIpsectionComponent extends TiFormComponent {
    /**
     * Ip 各网段数据集
     */
    @Input() configs: Array<TiIpsectionConfig>;
    /**
     * @ignore
     * 存放 input 控件实例数组
     */
    private controls: Array<FormControl> = [];
    /**
     * @ignore
     * 格式化输入
     */
    public maskInput: string = '000';
    /**
     * @ignore
     * 存放各网段 ip 值的数组
     */
    public ipValues: Array<string> = [];
    /**
     * input控件 FormGroup 实例，服务可通过该实例动态更改某一FormControl实例相关属性（value，disabled，校验规则等）
     */
    public formGroup: FormGroup;

    constructor(protected hostRef: ElementRef, protected renderer2: Renderer2, protected changeDetectorRef: ChangeDetectorRef,
                private fb: FormBuilder, private injector: Injector) {
        super(hostRef, renderer2, changeDetectorRef);
        this.formGroup = fb.group({});
    }

    /**
     * 将ip值分割为数组
     */
    private static splitToIPArray(ipValue: string): Array<string> {
        const ipArray: Array<string> = ipValue ? ipValue.replace(/\//, '.').split('.') : [];

        return ipArray;
    }

    /**
     * 将ip数组拼接为ip值
     */
    private static joinToIPValue(ipArray: Array<string>): string {
        let ipValue: string = ipArray.join('.');
        if (ipArray.length > 4) {
            ipValue = ipValue.replace(/(.*)\./, '$1/');
        }

        return ipValue;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['configs'] && !changes['configs'].firstChange) {
            this.initIpValue();
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        // 创建表单控件实例
        for (let i: number = 0; i < this.configs.length; i++) {
            if (!this.configs[i].options) {
                this.controls[i] = new FormControl();
                this.formGroup.addControl(`input_${i}`, this.controls[i]);
                // input类型网段值更改时触发事件
                this.controls[i].valueChanges.subscribe((value: any) => {
                    this.updateIpValue(i, value);
                });
            }
        }
    }

    ngAfterViewInit(): void {
        const itemElems: HTMLCollection = this.hostRef.nativeElement.getElementsByClassName('ti3-ipsection');
        const focusElements: Array<any> = [];
        // 获取ipsection对应控件
        const ipsectionControl: any = this.injector.get(NgControl);
        // 添加tiGroup属性，方便业务整体校验时校验组件内部formGroup，获取正确的错误信息
        if (ipsectionControl) {
            const control: any = ipsectionControl.control;
            control.tiGroup = this.formGroup;
            control.setValidators(this.validate.bind(this));
        }

        // 设置可聚焦元素
        for (let i: number = 0; i < this.configs.length; i++) {
            if (itemElems[i].firstChild) {
                focusElements.push(itemElems[i].firstChild);
            } else {
                this.setAttr(itemElems[i], 'disabled', this.configs[i].disabled || this.disabled);
                // 此处添加formControlName|name属性原因：方便业务整体校验时通过formControlName|name找到对应元素
                const controlName: string = ipsectionControl instanceof NgModel ? 'name' : 'formControlName';
                this.renderer.setAttribute(itemElems[i], controlName, `input_${i}`);
                focusElements.push(itemElems[i]);
            }
        }
        this.setFocusableElems(focusElements);
    }

    ngDoCheck(): void {
        super.ngDoCheck();
        this.changeDetectorRef.markForCheck();
    }

    /**
     * @ignore
     * 获取model值，并进行初始化处理
     */
    writeValue(value: any): void {
        super.writeValue(value);
        this.ipValues = TiIpsectionComponent.splitToIPArray(value);

        this.initIpValue();
    }
    /**
     * @ignore
     * 整体失焦触发事件
     */
    onBlur(event: any): void {
        this.formatValue();
    }

    /**
     * @ignore
     * select类型网段值更改时触发事件
     */
    onChange(i: number, value: any): void {
        this.updateIpValue(i, value);
    }

    /**
     * 初始化ip值
     */
    private initIpValue(): void {
        for (let i: number = 0; i < this.configs.length; i++) {
            if (this.configs[i].options) {
                // 初始显示默认选中项，若value值在options存在，则显示该值，否则显示下拉配置项第一项
                this.configs[i].selected = this.configs[i].options.find(item => item === this.ipValues[i]) ? this.ipValues[i] : this.configs[i].options[0];
                this.updateIpValue(i, this.configs[i].selected);
            } else {
                // 初始设置value，disabled及校验规则
                this.ipValues[i] = this.ipValues[i] ? parseInt(this.ipValues[i], 10).toString() : '';
                this.controls[i].setValue(this.ipValues[i]);
                this.controls[i].setValidators(this.configs[i].validationRules);
                this.configs[i].disabled || this.disabled ? this.controls[i].disable() : this.controls[i].enable();
            }
        }
    }

    /**
     * 初始及失焦处理输入框值，清除Ip网段前面的0
     */
    private formatValue(): void {
        for (let i: number = 0; i < this.configs.length; i++) {
            if (!this.configs[i].options) {
                this.controls[i].setValue(parseInt(this.controls[i].value, 10).toString());
            }
        }
    }

    /**
     * 更新model值
     */
    private updateIpValue(index?: number, value?: any): void {
        if (this.ipValues.length <= 0 || this.ipValues[index] === value) {
            return;
        }

        this.ipValues.splice(index, 1, value);
        // 解决model值更新后ExpressionChangedAfterItHasBeenCheckedError报错问题，onpush正常default报错
        setTimeout(() => {
            const ipValue: string = TiIpsectionComponent.joinToIPValue(this.ipValues);
            this.model = (ipValue === '...' || ipValue === '.../') ?  '' : ipValue;
        }, 0);
    }

    // 自定义验证器，同步input表单控件组的状态
    private validate(control: AbstractControl): ValidationErrors | null {
        return this.formGroup.invalid ? {
            'input-formGroup': {
                value: this.formGroup.value
            }
        } : null;
    }
}
