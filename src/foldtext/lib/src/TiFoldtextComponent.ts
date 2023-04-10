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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';
import { TiLocale } from '@opentiny/ng-locale';

/**
 * 折叠文本
 */
@Component({
  selector: 'ti-foldtext',
  templateUrl: './foldtext.html',
  styleUrls: ['./foldtext.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiFoldtextComponent extends TiBaseComponent {
  localeWords: any = TiLocale.getLocaleWords().tiFoldtext;

  /**
   * 文本内容
   */
  @Input() texts: Array<string> = [];
  /**
   * 折叠时显示的行数
   */
  @Input() line: number = 2;
  /**
   * @ignore
   * “查看全部” 词条
   */
  showMore: string = this.localeWords.showMore;
  /**
   * @ignore
   * “收起” 词条
   */
  showLess: string = this.localeWords.showLess;

  /**
   * @ignore
   * 显示文本内容的高度
   */
  height: string;
  /**
   * @ignore
   * 是否折叠
   */

  folded: boolean = true;
  // 表格中的默认font-size:12px, 默认line-height:1.5, 所以默认值取18px
  private lineHeight: string = '18px';
  constructor(protected hostRef: ElementRef, private renderer2: Renderer2, private changeRef: ChangeDetectorRef) {
    super(hostRef, renderer2);
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    const CSSStyles: CSSStyleDeclaration = getComputedStyle(this.nativeElement);
    const lineHeight: string = CSSStyles.getPropertyValue('line-height');

    if (!Number.isNaN(parseFloat(lineHeight))) {
      this.lineHeight = lineHeight;
    }

    this.line = this.getLine();
    this.height = this.line * parseFloat(this.lineHeight) + 'px';
    // default模式下，解决ExpressionChangedAfterItHasBeenCheckedError报错问题
    this.changeRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if ((changes['texts'] && !changes['texts'].firstChange) || (changes['line'] && !changes['line'].firstChange)) {
      this.line = this.getLine();
      this.height = this.line * parseFloat(this.lineHeight) + 'px';
    }
  }
  /**
   * @ignore
   * 切换文本的点击事件
   */
  onClick(event: Event): void {
    this.folded = !this.folded;
  }

  // 当总行数小于折叠时显示行数时，设置折叠时显示行数为总行数
  private getLine(): number {
    return this.texts?.length < this.line ? this.texts.length : this.line;
  }
}
