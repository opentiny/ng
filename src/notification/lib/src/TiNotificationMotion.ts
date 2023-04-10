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
import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const notificationMotion: AnimationTriggerMetadata = trigger('notificationMotion', [
  state('rightEnter', style({ opacity: 1, transform: 'translateX(0)' })),
  state('topEnter', style({ opacity: 1, transform: 'translateY(0)' })),
  state('leftEnter', style({ opacity: 1, transform: 'translateX(0)' })),
  state('bottomEnter', style({ opacity: 1, transform: 'translateY(0)' })),
  state('leave', style({ opacity: 0, transform: 'scaleY(0.3)', transformOrigin: '0% 0%' })),
  transition('* => rightEnter', [style({ opacity: 0, transform: 'translateX(10%)' }), animate('200ms linear')]),
  transition('* => topEnter', [style({ opacity: 0, transform: 'translateY(-10%)' }), animate('200ms linear')]),
  transition('* => leftEnter', [style({ opacity: 0, transform: 'translateX(-10%)' }), animate('200ms linear')]),
  transition('* => bottomEnter', [style({ opacity: 0, transform: 'translateY(10%)' }), animate('200ms linear')]),
  transition('* => leave', [style({ opacity: 1, transform: 'scaleY(1)', transformOrigin: '0% 0%' }), animate('200ms linear')])
]);
