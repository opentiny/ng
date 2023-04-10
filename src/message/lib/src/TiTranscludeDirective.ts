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
import { Directive, ElementRef, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { TiPopupService } from '@opentiny/ng-popup';
import { TiContentWrapperComponent } from './TiContentWrapperComponent';
/**
 * @ignore
 * 生成并且compile内容为宿主元素的子元素
 */
@Directive({
  selector: '[tiTransclude]'
})
export class TiTranscludeDirective implements OnInit, OnDestroy {
  @Input() tiTransclude: {
    content: string | TemplateRef<any> | any;
    context?: any;
  };
  private wrapperRef: any;
  constructor(private eleRef: ElementRef, private popService: TiPopupService<any>) {}
  ngOnInit(): void {
    this.wrapperRef = this.popService.create(TiContentWrapperComponent);
    this.wrapperRef.show({
      content: this.tiTransclude.content,
      contentContext: this.tiTransclude.context,
      container: this.eleRef
    });
  }
  ngOnDestroy(): void {
    this.wrapperRef.hide();
  }
}
