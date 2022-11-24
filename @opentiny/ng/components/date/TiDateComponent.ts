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
import {
    Component,
    ContentChild,
    ElementRef,
    NgZone,
    Renderer2,
    SimpleChanges,
    TemplateRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { TiDateUtil, TiKeymap, Util } from '../../utils/Util';
import { TiLocale, TiLocaleFormat } from '../../locale/TiLocaleModule';
import { TiFormComponent } from '../base/TiBaseModule';
import { TiDateBaseComponent, TiDateCustomizeOptions } from '../datebase/TiDateBaseModule';

/**
 * Date日期组件
 *
 * Date组件提供了一种方便的显示和设置日期的方式
 *
 */
@Component({
    selector: 'ti-date',
    templateUrl: './date.html',
    styleUrls: ['./date.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-date-input-container]': 'true',
        '(blur)': 'hidePanel()'
    },
    providers: [ TiFormComponent.getValueAccessor(TiDateComponent) ]
})
export class TiDateComponent extends TiDateBaseComponent {
    /**
     * @ignore
     * 日期显示格式: date组件的format为string类型
     */
    public format: string;
    /**
     * @ignore
     * 标记date/datetime的类型
     */
    public isDatetime: boolean = false;
    /**
     * @ignore
     * 用于标记是不是range
     */
    public isRange: boolean = false;
    /**
     * @ignore
     * placeholder提示文本
     */
    public placeholder: string = `${TiLocale.getLocaleWords().tiDate.datePlaceholder}`;
    /**
     * @ignore
     */
    @ContentChild('customize', { static: true }) customizeTemplate: TemplateRef<any>;

    ngOnInit(): void {
        super.ngOnInit();
        this.setPlacehoder();
    }

    /**
     * @ignore
     * model值变化时的回调
     */
      ngOnModelChange(): void {
        if (!TiDateUtil.isDate(this.model)) {
            this.inputValue = '';

            return;
        }
        this.formatValue();
        this.setPickerDate();
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        // format支持动态变更
        if (changes['format'] && !changes['format'].firstChange) {
          // 如果新的 format 值为非法值，format值保持旧值不变
            if (!Util.isString(changes['format'].currentValue)) {
                this.format = changes['format'].previousValue;

                return;
            }
            this.setFormatChange();
        }
        // 验证最大值最小值，为了处理最大值和最小值从合法日期变为undefined 的情景
        if ((changes['max'] && !changes['max'].firstChange) || (changes['min'] && !changes['min'].firstChange)) {
            this.validateMinAndMax(this.config, this.isDatetime);
        }
    }

    /**
     * @ignore
     */
    public setInputValue(value: Date): void {
        let isDisabled: boolean = false;
        if (Util.isArray(this.disabledDays) && this.disabledDays.length > 0) {
            this.disabledDays.forEach((item: Date) => {
                if (item.getTime() === value.getTime()) {
                    isDisabled = true;
                }
            });
        }
        if (isDisabled) {
            return;
        }
        if (this.isValidValue(value)) {
            this.model = value;
        }
    }
    /**
     * @ignore
     */
    public onKeydownFn(event: KeyboardEvent, val: any, pos: string): void {
        if (event.keyCode === TiKeymap.KEY_ENTER  || event.keyCode === TiKeymap.KEY_NUMPAD_ENTER) {
            this.hideDrop();
        }
     }

     private setFormatChange(): void {
        this.formatValue();
        this.setPlacehoder();
        this.setDatepanelPicker();
        this.validateMinAndMax(this.config);
        // 配置面板的接口值
        this.setPickerDate();
    }

    /**
     * @ignore
     * 配置时间日期面板接口
     */
    public setPickerDate(): void {
        this.datePanel = {
            value : {
                begin: this.model,
                end: null
            },
            picker : this.datepanelPicker,
            min : this.min,
            max : this.max,
            format : this.format,
            nowDateTime : this.nowDateTime,
            select: (): void => {
                // 点击面板：新旧值相同不做处理，不相同，将新值赋给model
                if (!TiDateUtil.isDateEqual(this.model, this.datePanel['value'].begin)) {
                    this.model = this.datePanel['value'].begin;
                }
                this.hideDrop();
            }
        };
    }

    /**
     * @ignore
     * 根据model值和format接口，格式化显示时间日期
     */
    public formatValue(): void {
        if (this.format === 'YYYY/QQ') {
            this.inputValue = TiDateUtil.transformDateToQuarter(this.model);
        } else {
            this.inputValue = (this.model !== null) ? TiLocaleFormat.formatDate(this.model, this.format) : '';
        }
    }
    /**
     * @ignore
     * 判断是不是合法的model
     */
    public isValidValue(value: Date): boolean {
        if (TiDateUtil.isDate(value) && TiDateUtil.isBetweenMaxAndmin(value, this.min, this.max)) {
            return true;
        }

        return false;
    }
}
