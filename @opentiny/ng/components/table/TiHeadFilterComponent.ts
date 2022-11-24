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
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    ViewChild
} from '@angular/core';
import { TiSelectComponent } from '../select/TiSelectModule';
import { TiHeadFilterDatetimeConfig, TiHeadFilterDropComponent } from './TiHeadFilterDropComponent';
import { TiFormComponent } from '../base/TiBaseModule';
import { TiBrowser } from '../../utils/Util';

// 下面注释，可以避免编译lib时正则报错。原理未知，副作用未知。
// @dynamic
/**
 * TiHeadFilter 表头过滤(漏斗)组件， 嵌在表头的 th 中使用。
 *
 * ti-head-filter 用来显示过滤操作漏斗图标，点击其可打开下拉框，选中下拉框中的选项时，
 * 可在提供的 select 事件中做对应的表格数据过滤处理。
 *
 * ### 接口说明
 * **Inputs：**
 *
 * |     名称    |  类型   | 默认值   | 功能描述  |
 * | --------   | :-----   | :---- | :---- |
 * | options   | array  | [] | 所有过滤项 |
 * | ngModel   | object  | false | 可设置和获取 headfilter下拉选中值 |
 * | labelKey   |  string  | 'label' | 下拉面板中要显示的字段|
 * | valueKey   |  string  | '' | 当存在valueKey时，选中值基于valueKey|
 * | idKey   |   string  | '' | idKey指定的属性的值相等时即认为 option 选项是选中的 |
 * | panelMaxHeight   |  string  | 最大显示8条数据 | 下下拉面板的最大显示高度，溢出时则出滚动条。 |
 * | id   | string  | undefined | HTML属性id，自动化测试要求必须给id赋值 |
 * | select   | function  | 无 | 下拉面板选中事件，向外通知选中数据 |
 * | multiple   |  boolean  | false | 下拉面板是否为多选 |
 * | selectAll   |  boolean  | false | 下拉面板是否显示全选框 |
 * | panelAlign   |  string  | 'left' | 下拉面板展开对齐方式|
 * | searchable   |  boolean  | false | 是否开启搜索功能|
 * | panelWidth   |  'auto' 或 string  | 'auto' | 设置下拉面板的宽度，"auto"表示下拉框的宽度根据下拉选项的内容自动撑开，也可设置固定的下拉框宽度(不小于过滤图标的宽度)，例如："200px"|
 * | noDataText   |  string  | '暂无数据' | 无数据时的显示文本。默认值改为国际化词条 |
 * | isDatetime   |  boolean  | false | 下拉面板是否为时间日期格式 |
 * | datetimeConfig   |  object  | {} | 时间日期中的基本信息配置 |
 *
 * <p><span style="color: red">以下说明不可用，不做参考。</span>该组件只有以上15个Input接口和1个Output接口
 * 可用，其余方法、Input、输出等(继承于TiSelectComponent,是供select的内部使用的)都不可用</p>
 */
@Component({
    selector: 'ti-head-filter',
    templateUrl: './head-filter.html',
    styleUrls: ['./head-filter.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TiFormComponent.getValueAccessor(TiHeadFilterComponent)],
    host: {
        '[class.ti3-head-filter-container]': 'true',
        '(blur)': 'onBlur()'
    }
})
export class TiHeadFilterComponent extends TiSelectComponent {
    /**
     * 面板对齐方式
     */
    @Input() panelAlign: 'left' | 'right' = 'left';
    // 由于headfilter与select中的panelWidth的默认值和类型不一样，所以这里重定义panelWidth接口
    /**
     * 下拉面板的最大宽度，'auto' 表示下拉框的宽度根据下拉选项的内容自动撑开，string 是可以设置具体的宽度值，比如 '200px'
     */
    @Input() panelWidth: 'auto'| string = undefined; // 设置为undefined是为了覆盖父类的panelWidth值

    /**
     * 是否为时间日期菜单
     */
    @Input() isDatetime: boolean = false;
    /**
     * 时间日期的相关配置
     */
    @Input() datetimeConfig: TiHeadFilterDatetimeConfig = {};
    /**
     * @ignore
     */
    @ViewChild('filterIcon', { static: true }) filterIconEleRef: ElementRef;
    /**
     * @ignore
     */
    @ViewChild(TiHeadFilterDropComponent, { static: true }) dropsearchCom: TiHeadFilterDropComponent;

    /**
     * @ignore
     * 在初始化DOM渲染完成之时，将下拉面板中的所有选中项放在一起，使可聚焦元素都放在组件内部，从而在点击面板进行相关操作时，
     * 组件不会触发blur事件，保证面板内操作的正常执行，在点击组件外的空白处时，保证blur事件的正常执行
     */
    ngAfterViewInit(): void {
        if (this.isDatetime) {
            const elemsNodeList: Array<any> = [this.filterIconEleRef.nativeElement].concat(
                this.dropsearchCom.dropCom.nativeElement,
                this.dropsearchCom.datetimeStartCom.getFocusableElems(),
                this.dropsearchCom.datetimeEndCom.getFocusableElems(),
                this.dropsearchCom.datetimeOkCom.nativeElement,
                this.dropsearchCom.datetimeCancelCom.nativeElement
            );
            this.setFocusableElems(elemsNodeList);
        }
    }

    ngAfterViewChecked(): void {
        // 这里不能调用父类方法，因为Select父类对dominator处理，空指针报错。
        // TODO: 看是否能够不继承select
        if (!this.isDatetime && this.searchable !== this.oldSearchable) {
            this.oldSearchable = this.searchable;
            if (this.searchable) {
                this.setFocusableElems([this.filterIconEleRef.nativeElement]
                    .concat(this.dropsearchCom.getFocusableElems()));
            } else {
                this.setFocusableElems([this.filterIconEleRef.nativeElement]);
            }
        }
    }

    /**
     * @ignore
     * 失焦情况下，仅关闭面板，不做聚焦等处理
     */
    public onBlur(): void {
        super.onBlur();
        if (this.searchable) {
            if (getComputedStyle(this.filterIconEleRef.nativeElement).outlineStyle === 'none') {
                this.renderer.setStyle(this.filterIconEleRef.nativeElement, 'outlineStyle', '');
            }
        }
    }

    /**
     * @ignore
     * seachbox:180
     * datetime:310  面板的宽度需要固定值
     * 其他场景如果不设置，则自动撑开
     */
      public getDropWidth(): string {
        let panelWidthTemp: string = 'auto';
        if (!this.isDatetime && this.searchable) {
            panelWidthTemp = '180px';
        }
        if (this.isDatetime) {
            panelWidthTemp = this.datetimeConfig?.onlyDate ? '270px'  : '310px';
        }

        panelWidthTemp =  this.panelWidth ? this.panelWidth : panelWidthTemp;

        return panelWidthTemp;
    }
}
