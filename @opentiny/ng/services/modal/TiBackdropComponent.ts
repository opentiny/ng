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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, Renderer2 } from '@angular/core';
import { animate, state,  style, transition, trigger } from '@angular/animations';

/**
 * @ignore
 */
export const animateStyle: string = '0.3s cubic-bezier(0.40, 0.00, 0.20, 1.00)';
/**
 * @ignore
 */
@Component({
    selector: 'ti-backdrop',
    template: `<div class='ti3-modal-backdrop'
                [@.disabled]='!animation' [@backdropAnimate] = 'showState'
                (@backdropAnimate.done)='onAnimationDone($event)'></div>`,
    styleUrls: ['./backdrop.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('backdropAnimate', [
            state('show', style({
                opacity : 0.2
            })),
            state('hide, void', style({
                opacity: 0
            })),
            transition('show => hide', animate(animateStyle)),
            transition('hide => show', animate(animateStyle))
        ])
    ]
})
export class TiBackdropComponent {
    constructor(protected renderer: Renderer2, protected changeDetectorRef: ChangeDetectorRef) {
    }

    protected _showState: string; // 遮罩的显示状态，用于控制动画的状态切换

    set showState(value: string) {
        if (this._showState !== value) {

            this._showState = value;
            // onpush 模式下，点击 ok / cancel 按钮关闭弹窗和遮罩时；改变模板变量 showState，需要手动触发变更检测来强制更新。
            this.changeDetectorRef.markForCheck();
        }
    }

    get showState(): string {
        return this._showState;
    }

    public animation: boolean; // 是否开启动画
    public index: number = 0; // 多个弹出框情况下，zindex层级设置辅助
    public destroy: () => void;
    // 在微前端，多个子应用之间url路径跳转,等到弹出框隐藏结束后，this.destroy() 已经无效。
    @HostListener('window:hashchange', ['$event']) onhashchange(event: HashChangeEvent): void {
        if (event.newURL !== event.oldURL) {
            this.destroy();
        }
    }
    onAnimationDone($event: any): void {
        // 弹框隐藏动画结束后,销毁弹框DOM
        if ($event.toState === 'hide') {
            this.destroy();

            return;
        }
    }
}
