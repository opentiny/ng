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
/* eslint-disable no-eq-null */
/* eslint-disable eqeqeq */
import { Component, ElementRef, Input, QueryList, Renderer2, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { TiKeymap, Util } from '@opentiny/ng-utils';
import { TiFormComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';
// 下面注释，可以避免编译lib时正则报错。原理未知，副作用未知。
// @dynamic
/**
 * Ip组件
 *
 * Ip组件提供了一种方便的显示和设置IP地址的功能。
 *
 */
@Component({
  selector: 'ti-ip',
  templateUrl: './ip.html',
  styleUrls: ['./ip.less'],
  providers: [TiFormComponent.getValueAccessor(TiIpComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti_input_ip_container_ipv4]': 'version !== 6',
    '[class.ti_input_ip_container_ipv6]': 'version === 6',
    '(paste)': 'pasteHandle($event)',
    '(blur)': 'blurHandle($event)'
  }
})
export class TiIpComponent extends TiFormComponent {
  protected versionInfo: string = super.getVersion(packageInfo);
  // ipv4 配置参数
  private static readonly ipv4Version: number = 4;
  // 采用自研的ipv4正则表达式
  private static readonly ipv4Reg: RegExp =
    /^(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))$/i;
  private static readonly ipv4 = {
    ipvCheckReg: /[\D]/g,
    label: '...',
    placeReg: /\s/g,
    separator: '.',
    ipValueArray: new Array(4).fill('')
  };
  // ipv6 配置参数
  private static readonly ipv6Version: number = 6;
  // 采用自研的ipv6正则表达式
  private static readonly ipv6Reg: RegExp =
    /^(((([\da-f]{1,4}):){7}([\da-f]{1,4}))|(((([\da-f]{1,4}):){1,7}:)|((([\da-f]{1,4}):){6}:([\da-f]{1,4}))|((([\da-f]{1,4}):){5}:(([\da-f]{1,4}):)?([\da-f]{1,4}))|((([\da-f]{1,4}):){4}:(([\da-f]{1,4}):){0,2}([\da-f]{1,4}))|((([\da-f]{1,4}):){3}:(([\da-f]{1,4}):){0,3}([\da-f]{1,4}))|((([\da-f]{1,4}):){2}:(([\da-f]{1,4}):){0,4}([\da-f]{1,4}))|((([\da-f]{1,4}):){1}:(([\da-f]{1,4}):){0,5}([\da-f]{1,4}))|(::(([\da-f]{1,4}):){0,6}([\da-f]{1,4}))|(::([\da-f]{1,4})?))|(((([\da-f]{1,4}):){6}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){5}:(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){4}:(([\da-f]{1,4}):)?(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){3}:(([\da-f]{1,4}):){0,2}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){2}:(([\da-f]{1,4}):){0,3}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(([\da-f]{1,4})::(([\da-f]{1,4}):){0,4}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(::(([\da-f]{1,4}):){0,5}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))))$/i;
  private static readonly ipv6 = {
    ipvCheckReg: /[^a-f\d]/gi,
    label: ':::::::',
    placeReg: /\s/g,
    separator: ':',
    ipValueArray: new Array(8).fill('')
  };
  private static getGlbInfo(ver: number): any {
    return ver === 4 ? TiIpComponent.ipv4 : TiIpComponent.ipv6;
  }

  /**
   * Ip 版本号
   */
  @Input() version: number = 4;
  /**
   * @ignore
   */
  @ViewChildren('ipInput') ipInputs: QueryList<ElementRef>;
  /**
   * @ignore
   * 存放 ip 组件各个input框值的数组
   */
  public ipsValues: Array<string>;

  /**
   * @ignore
   */
  public pasteHandle = (event: any) => {
    if (this.disabled) {
      return;
    }
    event.preventDefault(); // 阻止默认的input原生的粘贴事件（把粘贴板的值粘贴到input框）
    let pasteValue: string = '';
    if (window['clipboardData'] && window['clipboardData'].getData) {
      // for IE
      pasteValue = window['clipboardData'].getData('Text');
    } else {
      // For other browser
      try {
        pasteValue = event.clipboardData.getData('Text');
      } catch (err) {}
    }
    const unmaskpaste: string = this.unmask(this.version, pasteValue);
    if (this.isValidIP(this.version, unmaskpaste)) {
      this.updateValue(unmaskpaste); // 粘贴之后更新值
      this.ipsValues = this.splitToIPArray(this.version, this.model); // 内部的操作手动更新数组
    }
  };
  /**
   * @ignore
   */
  public blurHandle = (event: any) => {
    const ipValue: string = this.generateIPValue(0);
    if (ipValue === '') {
      this.updateValue(ipValue);
    } else {
      const fixedVaule: string = this.blurFixed(this.version, ipValue);
      this.updateValue(this.mask(this.version, fixedVaule));
    }
  };
  private blurFixed(ver: number, ip: string): string {
    const arr: Array<string> = this.splitToIPArray(ver, ip);
    for (let i: number = 0; i < arr.length; i++) {
      if (arr[i] === '') {
        arr[i] = '0';
      }
    }

    return this.joinToIPValue(ver, arr);
  }

  // 组件声明周期钩子--start

  ngOnInit(): void {
    super.ngOnInit();
    this.init();
  }

  private init(): void {
    // 默认是IPv4
    this.version = parseInt(String(this.version), 10) === TiIpComponent.ipv6Version ? TiIpComponent.ipv6Version : TiIpComponent.ipv4Version;
    // 初始化ipValueArray  赋值新的数组
    this.ipsValues = TiIpComponent.getGlbInfo(this.version).ipValueArray.concat();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    //  处理 聚焦 并使第一段ip获焦(放在这个钩子的原因：在oninit中拿不到 QueryList 返回的结果集)
    const elements = [];
    this.ipInputs.forEach((item) => {
      elements.push(item.nativeElement);
    });
    // 推荐在onInit()时调用setFocusableElems(), 但是ngFor/ngIf中的元素在ngAfterViewInit()才能获取到
    this.setFocusableElems(elements);
  }
  // 组件声明周期钩子--end

  // 实现ControlValueAccessor接口--start
  /**
   * @ignore
   */
  writeValue(value: any): void {
    if (value === '') {
      super.writeValue(value);
      // 对空值做特殊处理,为空时清空IP框
      this.ipsValues = TiIpComponent.getGlbInfo(this.version).ipValueArray.concat();
    } else if (value === this.joinToIPValue(this.version, this.ipsValues)) {
      // 和当前IP框的值相同不处理
    } else if (this.isValidIP(this.version, value) || this.isInputting(this.version, value)) {
      super.writeValue(this.mask(this.version, value));
      this.ipsValues = this.splitToIPArray(this.version, this.model);
    } else {
      // 非法不处理 恢复之前值
      super.writeValue(this.joinToIPValue(this.version, this.ipsValues));
    }
  }
  // 实现ControlValueAccessor接口--end

  // 组件交互方法集合--start
  /**
   * @ignore
   */
  public keydown(e: any, index: number): void {
    const ipInputs = this.ipInputs;
    const keyCode = e.keyCode;
    this.keydownHandle(e, ipInputs['_results'][index], index, this.version);
    // 按下键为左或右键时，不做重新赋值，避免IE浏览器下重新赋值之后光标位置不准确问题
    if (keyCode === TiKeymap.KEY_ARROW_LEFT || keyCode === TiKeymap.KEY_ARROW_RIGHT) {
      return;
    }
  }
  /**
   * @ignore
   */
  public change(index: number): void {
    const ipValues: string = this.generateIPValue(index);
    this.updateValue(ipValues);
  }

  // 组件交互方法集合--end

  // 内部公共方法集合--start
  /**
   * @description  将 ip 数组拼接成ip值
   * @param: ver ip版本
   * @param: arr ip字符串中数字组成的数组
   * @returns
   */
  private joinToIPValue(ver: number, arr: Array<string>): string {
    return arr.join(TiIpComponent.getGlbInfo(ver).separator);
  }
  /**
   * @description 将 ip 值分割成ip数组
   * @param: ver ip版本
   * @param: ip ip字符串
   */
  private splitToIPArray(ver: number, ip: string): Array<string> {
    const res: Array<string> = ip ? ip.split(TiIpComponent.getGlbInfo(ver).separator) : [];

    return res;
  }
  private isInputting(ver: number, value: string): boolean {
    const arr: Array<string> = this.splitToIPArray(ver, value);

    return arr.indexOf('') >= 0;
  }
  // 判断当前ip值是否合法
  private isValidIP(ver: number, ip: string): boolean {
    if (ip === null || ip === undefined) {
      return false;
    }
    const rgx = ver === TiIpComponent.ipv4Version ? TiIpComponent.ipv4Reg : TiIpComponent.ipv6Reg;
    return rgx.test(ip);
  }
  /**
   * @description IP需要去除前面的0，例如：,“010.0.0.0”经过该函数处理后变为：“10.0.0.0”；IPv6支持缩略格式
   * @param: ver ip版本
   * @param: ip ip字符串
   * @returns
   */
  private mask(ver: number, ip: string): string {
    const ipInfo = TiIpComponent.getGlbInfo(ver);
    const part = ip.split(ipInfo.separator);
    const partLength = part.length;
    if (ver === 4) {
      for (let i: number = 0; i < partLength; i++) {
        if (part[i] !== '') {
          let partNumber = parseInt(part[i], 10);
          // parseInt(part[i], 10) /= 1;
          partNumber /= 1; // 将part[j]转化为整数，目的是消除前面的0
          part[i] = String(partNumber); // 再转化为字符串
        }
      }
    } else {
      // IPv6支持缩略格式，即任何由全0组成的1个或多个16位段的单个连续的字符串 都可以用一个双冒号“::”，且“::”只出现一次；例如：2001:d02::14:95
      // 用‘0’补齐缩略格式缺少个数
      while (part.length < 8) {
        let index = part.indexOf('');
        part.splice(index, 0, '0');
      }

      part.forEach((partItem, index) => {
        //  查找是否有1-9和字母，如果没有，替换为0，如果有，去除前面的0
        if (partItem.match(/[1-9a-f]/i)) {
          part[index] = partItem.replace(/^0{1,3}/i, '');
        } else if (partItem !== '0') {
          part[index] = '0';
        }
      });
    }

    return part.join(ipInfo.separator);
  }
  /**
   * @description 去掉空格后的IP地址；例如“  10.0 .0.0 ”进过该函数处理后返回：“10.0.0”
   * @param: ver ip版本
   * @param: ip ip字符串
   */
  private unmask(ver: number, ip: string): string {
    const iPInfo = TiIpComponent.getGlbInfo(ver);

    return ip.replace(iPInfo.placeReg, '');
  }

  /**
   * @description  获取当前ip段输入的值并进行判断，合法时更新到当前ip段输入框内，并拼接返回整体ip值
   * @param: index 当前输入框的下标
   */
  private generateIPValue(index: number): string {
    const ipInfo = TiIpComponent.getGlbInfo(this.version);
    const cellArray = this.ipInputs;
    let value = cellArray['_results'][index].nativeElement.value;
    if (ipInfo.ipvCheckReg.test(value)) {
      value = value.replace(ipInfo.ipvCheckReg, '');
    }

    // ipv4下，当前输入框值大于255时，强制转换成255
    if (this.version === TiIpComponent.ipv4Version && value > 255) {
      value = 255;
    }
    for (let i: number = 0; i < this.ipsValues.length; i++) {
      if (i === index) {
        this.ipsValues[i] = value;
        cellArray['_results'][index].nativeElement.value = value;
      }
    }
    let ipValues;
    ipValues = this.ipsValues.join(ipInfo.separator);
    if (ipValues === ipInfo.label) {
      ipValues = '';
    }
    return ipValues;
  }
  // 更新value值 //TODO: 考虑去除这个函数，用writeValue代替
  private updateValue(newValue: string): void {
    if (newValue === this.model) {
      return;
    }
    // 记录ip的值在value中,方便用户获取
    this.model = newValue;
    this.writeValue(newValue);
  }
  // keydown事件触发时，判断并设置组件光标位置
  private keydownHandle(e: any, thisInput: ElementRef, index: number, ver: number): void {
    const ipInputsLength = this.ipInputs.length;
    const nextCell = index < ipInputsLength - 1 ? this.ipInputs['_results'][index + 1] : undefined;
    const prevCell = index > 0 ? this.ipInputs['_results'][index - 1] : undefined;

    const keyCode = e.keyCode;
    // 键盘码110代表. 190代表 >.---当键盘码为这两种时,跳至下一输入框中,并选中该输入框中的值
    if (keyCode === TiKeymap.KEY_NUMPAD_DECIMAL || keyCode === TiKeymap.KEY_PERIOD) {
      if (!Util.isUndefined(nextCell)) {
        // 非最后一个输入框时，跳至下一输入框
        nextCell.nativeElement.focus();
        nextCell.nativeElement.select();
      }
      e.preventDefault(); // 不论是否为最后一个输入框,防止默认事件发生,否则输入框中会出现 ...
      return;
    }
    // 光标后移到下一段ip
    if (this.isMoveToNext(e, thisInput, nextCell, ver)) {
      nextCell.nativeElement.focus();
      this.caret(nextCell, 0); // 设置光标位置
    }

    // 光标前移到上一段ip
    if (this.isMoveToPrevous(keyCode, thisInput, prevCell)) {
      this.caret(prevCell, prevCell.nativeElement.value.length); // 设置光标位置
      e.preventDefault(); // 防止默认事件发生,否则输入框中的回退光标位置会有问题
    }
  }
  // 判断当前是否需要将光标移至后一段ip
  private isMoveToNext(e: any, thisInput: ElementRef, nextCell: ElementRef, ver: number): boolean {
    // 如果下一段ip不存在直接返回false
    if (Util.isUndefined(nextCell)) {
      return false;
    }
    // 如果输入为合法数字,输入框中已有3个值,光标位于输入框末尾,并且存在下一输入框, 则跳至下一输入框
    let isFullToNext;
    if (ver !== TiIpComponent.ipv6Version) {
      isFullToNext = this.checkIpv4MoveToNext(thisInput, e);
    } else {
      isFullToNext = this.checkIpv6MoveToNext(thisInput, e);
    }
    // 当为向右键时→,且光标位置在该输入框末尾。则直接跳到下一输入框中
    const keyCode = e.keyCode;
    const isRightToNext = keyCode === TiKeymap.KEY_ARROW_RIGHT && this.caret(thisInput)[0] === thisInput.nativeElement.value.length;
    return isFullToNext || isRightToNext;
  }
  // 判断当前是否需要将光标移至前一段ip
  private isMoveToPrevous(keyCode: number, thisInput: ElementRef, prevCell: ElementRef): boolean {
    // 1.当为向左键(37),且光标位置位于输入框起始位置时,则跳至前一输入框中;
    // 2.当为backspace键,且已回删至输入框起始位置 跳至前已输入框中
    // 3.输入框处于选中状态时，按backspace键不跳到前一输入框中
    return (
      !Util.isUndefined(prevCell) &&
      ((keyCode === TiKeymap.KEY_ARROW_LEFT && this.caret(thisInput)[0] === 0) || // 按左键
        (keyCode === TiKeymap.KEY_BACKSPACE &&
          this.caret(thisInput)[0] === 0 && // 按后退键并且删除完
          this.caret(thisInput)[0] === this.caret(thisInput)[1]))
    ); // 输入框处于选中状态按后退键不跳到前一个输入框
  }

  // 判断当前段ipv4输入框是否已满3,末端是合法字符，且光标位置在此段ip最后
  private checkIpv4MoveToNext(thisInput: ElementRef, e: any): boolean {
    return thisInput.nativeElement.value.length === 3 && this.isNumeric(e) && this.caret(thisInput)[0] === 3;
  }
  // 判断当前段ipv6输入框是否已满4未合法字符，且光标位置在此段ip最后
  private checkIpv6MoveToNext(thisInput: ElementRef, e: any): boolean {
    return thisInput.nativeElement.value.length === 4 && this.isHexaDecimal(e) && this.caret(thisInput)[0] === 4;
  }
  // 判断输入是否为ipv4合法字符
  private isNumeric(e: any): boolean {
    if (e.shiftKey || e.ctrlKey) {
      return false;
    }
    const code = e.keyCode;
    return (code >= TiKeymap.KEY_0 && code <= TiKeymap.KEY_9) || (code >= TiKeymap.KEY_NUMPAD_0 && code <= TiKeymap.KEY_NUMPAD_9);
  }
  // 判断输入是否为ipv6合法字符
  private isHexaDecimal(e: any): boolean {
    const keyCode = e.keyCode;
    // ctrl键组合其它情况，输入框中不会输入有效字符，返回
    if (e.ctrlKey) {
      return false;
    }
    // 输入有效字符情况：1）a~f 2）有效数字
    const isValidInput =
      (keyCode >= TiKeymap.KEY_A && keyCode <= TiKeymap.KEY_F) ||
      (keyCode >= TiKeymap.KEY_NUMPAD_0 && keyCode <= TiKeymap.KEY_NUMPAD_9) ||
      (keyCode >= TiKeymap.KEY_0 && keyCode <= TiKeymap.KEY_9);
    return isValidInput;
  }

  /**
   * @description  获取或设置光标位置
   * @param: ele 光标所在dom
   * @param: s 开始位置
   * @param: e 结束位置
   */
  private caret(ele: ElementRef, s?: number, e?: number): any {
    const element = ele.nativeElement;
    const setPosition = function (el, start, end) {
      if (el.setSelectionRange) {
        el.focus();
        el.setSelectionRange(start, end);
      } else if (el.createTextRange) {
        const range = el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
      }
    };

    if (s != null && e != null) {
      // setting range
      return setPosition(element, s, e);
    } else if (s != null) {
      // setting position
      return setPosition(element, s, s);
    }

    // getting
    if (element.createTextRange && document['selection']) {
      const r = document['selection'].createRange().duplicate();

      const end = element.value.lastIndexOf(r.text) + r.text.length;

      r.moveEnd('character', element.value.length);
      const start = r.text === '' ? element.value.length : element.value.lastIndexOf(r.text);

      return [start, end];
    }

    return [element.selectionStart, element.selectionEnd];
  }
  /**
   * @ignore
   * ngFor遍历的 trackBy函数，防止数据更新导致所有DOM重新渲染
   */
  public trackByFn(index: any, item: any): any {
    return index;
  }
  // 内部公共方法集合--end
}
