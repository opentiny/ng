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
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef,
    Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Util } from '../../utils/Util';

import { opentinyNgVersion } from '../../package-version';


// 如果base有@Component，那么所有子类都不必写constructor了，应该跟constructor注入有关
/**
 * 基类，已实现[id]，子类也可以使用hostRef, nativeElement, renderer
 *
 * @ignore
 */
@Component({
    selector: 'ti-base',
    template: ''
})
export class TiBaseComponent implements OnChanges, OnInit, DoCheck, AfterContentInit,
    AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    /**
     * HTML属性id，自动化测试要求必须给id赋值
     */
    // TODO：改名字
    @Input() id: string; // TODO:覆盖Angular的[id]变量。因为Angular[id]变量只能在ngAfterViewInit拿到，太迟。
    /**
     * @ignore
     * 这里用any，原因HTMLElement->Element->Node, attributes定义的格式太死，不能有多余字段，可能是类型定义bug
     * interface Node extends EventTarget {readonly attributes: NamedNodeMap;
     */
    public nativeElement: any; // 宿主元素

    constructor(protected hostRef: ElementRef, protected renderer: Renderer2) {
        this.nativeElement = this.hostRef.nativeElement;
    }
    ngOnChanges(changes: SimpleChanges): void {
        // id动态变化时，重新设置id
        if (changes['id'] && !changes['id'].firstChange) {
            this.setId();
        }
    }
    ngOnInit(): void {
        this.setId();
        this.setVersion();
    }
    ngDoCheck(): void {
    }
    ngAfterContentInit(): void {
    }
    ngAfterContentChecked(): void {
    }
    ngAfterViewInit(): void {
    }
    ngAfterViewChecked(): void {
    }
    ngOnDestroy(): void {
    }
    // 给宿主设置Id
    private setId(): void {
        // 空id都自动创建id
        if (Util.isEmptyString(this.id)) {
            this.id = Util.getUniqueId('ti_auto_id');
        }
        this.renderer.setProperty(this.nativeElement, 'id', this.id);
    }
    /**
     * 生成宿主Id：如果组件必须要有Id，那么调用此方法，无ID时会自动生成一个ID。
     */
    protected creatId(): void {
        // 如果用户没有写宿主id
        if (Util.isEmptyString(this.id)) {
            // 生成唯一id
            this.id = Util.getUniqueId('ti_auto_id');
            this.setId();
        }
    }

    private setVersion(): void {
        this.renderer.setAttribute(this.nativeElement, 'opentiny-ng-version', opentinyNgVersion);
    }

    /**
     * @ignore
     * 供内部子元素使用
     * @example
     * <span  [id]='appendId("label_span")'>{{label}}</span>
     * @param suffix 传入的字符串
     * @returns 返回的字符串this.id + '_' + suffix
     */
    public appendId(suffix: string): string {
        // 应该不存在空id了，因为所有组件都有自动生成id
        return `${this.id}_${suffix}`;
    }
}
/*
用户写宿主id三种方式：
1）给HTML属性id赋字符串id='mycheckbox',
2）给HTML属性id赋变量[attr.id]='mycheckboxid',用户不太会这么用，暂不考虑支持。
3）给DOM属性id赋变量[id]='mycheckboxid'
组件开发读写宿主id的三种方法：
1）读HTML属性id constructor(@Attribute('id') public id )
2）写HTML属性id @HostBinding('attr.id') id: string;
写DOM属性id @HostBinding('id') id: string;
3）读写DOM属性id constructor(private hostRef: ElementRef ) ngAfterViewInit() { ...this.hostRef.nativeElement.id... }
注意：
1）开发Checkbox时，是类似属性指令的组件，宿主元素是input，其他组件暂未尝试。
2）id='mycheckbox'，constructor就能拿到。但Angular[id]变量最早能在ngAfterViewInit()拿到，很迟。
3）自己定义一个id变量，会覆盖angular的id变量，在ngOnInit()就可以拿到，很早。
综上，nativeElement.id读写id，可以兼容以上三种用户写宿主id。
方案一：ngAfterViewInit()取到Angular的id,很晚。但模板中需要使用id，设置太迟，需要强制刷新。
ngAfterViewInit() {
this.setId(); // 取得[id]变量赋值，必须在ngAfterViewInit()。其他周期拿不到。
...
}
private setId() {
// 如果用户没有写宿主id
if (Util.isEmptyString(this.hostNode.id)) {
// 生成唯一id
this.hostNode.id = Util.getUniqueId('checkbox');
}
// 获取宿主id
this.id = this.hostNode.id;
this.cdRef.detectChanges(); // 强制检测，刷新视图中使用的id变量。因为有时视图绘制更早，变量变化后试图未更新。
// TODO: 强制检测变化会不会有性能负担？
}
方案二：自定义id覆盖覆盖Angular的[id]变量，ngOnInit()取到id，很早。无需强制刷新。
@Input('id') id: string; // 覆盖Angular的[id]变量。因为Angular[id]变量只能在ngAfterViewInit拿到，太迟。
ngOnInit() {
...
this.setId();
}
private setId() {
// 如果用户没有写宿主id
if (Util.isEmptyString(this.id)) {
// 生成唯一id
this.id = Util.getUniqueId('checkbox');
}
// 设置宿主id
this.renderer.setProperty(this.hostNode, 'id', this.id);
// this.cdRef.detectChanges(); // 无需强制检测
}
方案三：想办法尽早取到Angular的[id],暂无接口。
可能Angular确实是在AfterViewInit前一刻才取到[id][disabled]。
PrimeNG等库，也是用@Input('id')去覆盖[id] [disabled]等。

Chorme79版报相同id警告：
<span  [id]='appendId("label_span")'>{{label}}</span>
原生标签这样写法，哪怕appendID函数返回空字符串，也会有存在id属性。这样页面中存在多个相同空id。
解决方案：哪怕用户没有赋id，组件都会自动创建id，那么所有组件都有不同id，内部的span等也会有不同id。
*/
