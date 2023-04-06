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

import { AnimationEvent } from '@angular/animations';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { TiNoticeData, TiNoticeConfig, TiTimerType, TiNotificationPosition } from './TiNotificationInterface';
import { notificationMotion } from './TiNotificationMotion';

@Component({
  selector: 'ti-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./notification.less'],
  animations: [notificationMotion],
  templateUrl: './TiNotificationComponent.html'
})
export class TiNotificationComponent implements OnDestroy {
  config!: Required<TiNoticeConfig>;
  private autoDestroy?: boolean = true;
  private timerStamp?: number;
  private duration!: number;
  private destroyTimer: TiTimerType;
  readonly animationEvtEmt: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();

  @Input() instance: Required<TiNoticeData>;
  @Input() position: TiNotificationPosition;
  @Output() readonly destroyed = new EventEmitter<{ id: string }>();

  constructor(public cdr: ChangeDetectorRef) {}

  private static timerCleaner(targetTimer: TiTimerType): void {
    if (targetTimer !== null) {
      clearTimeout(targetTimer);
      targetTimer = null;
    }
  }

  ngOnInit(): void {
    this.config = this.instance.config as Required<TiNoticeConfig>;
    this.duration = this.config.duration;
    if (this.duration === 0) {
      this.autoDestroy = false;
    } else {
      this.timerStamp = Date.now();
      this.startTimer();
    }
    if (this.config.animation) {
      this.instance.state = 'enter';
      this.animationEvtEmt
        .pipe(
          filter((evt) => evt.toState === 'leave' && evt.phaseName === 'done'),
          take(1)
        )
        .subscribe(() => {
          this.destroyed.next({ id: this.instance.noticeId });
        });
    }
  }

  private startTimer(): void {
    if (this.duration > 0) {
      TiNotificationComponent.timerCleaner(this.destroyTimer);
      this.destroyTimer = setTimeout(() => this.destroy(), this.duration);
      this.timerStamp = Date.now();
    } else {
      this.destroy();
    }
  }

  ngOnDestroy(): void {
    if (this.autoDestroy) {
      TiNotificationComponent.timerCleaner(this.destroyTimer);
    }
    this.animationEvtEmt.complete();
  }

  private destroy(): void {
    if (this.config.animation) {
      this.instance.state = 'leave';
      this.cdr.detectChanges();
    } else {
      this.destroyed.next({ id: this.instance.noticeId });
    }
  }

  onMouseEnter(): void {
    if (this.autoDestroy && this.config.hoverPause) {
      TiNotificationComponent.timerCleaner(this.destroyTimer);
      this.duration = this.timerStamp + this.duration - Date.now();
    }
  }

  onMouseLeave(): void {
    if (this.autoDestroy && this.config.hoverPause) {
      this.startTimer();
    }
  }

  get state(): string | undefined {
    if (this.instance.state === 'enter') {
      switch (this.position) {
        case 'top-right':
        case 'bottom-right':
          return 'rightEnter';
        case 'top':
          return 'topEnter';
        case 'top-left':
        case 'bottom-left':
          return 'leftEnter';
        case 'bottom':
          return 'bottomEnter';
        default:
          return 'rightEnter';
      }
    } else {
      return this.instance.state;
    }
  }

  alertOpenStateChangeHandle(openState: boolean): void {
    if (!openState) {
      this.destroy();
    }
  }
}
