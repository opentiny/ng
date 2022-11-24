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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiIconModule } from '../../components/icon/TiIconModule';
import { TiLoadingModule } from '../../components/loading/TiLoadingModule';
import { TiValidationDirective } from './TiValidationDirective';
import { TiPwdMsgComponent } from './TiPwdMsgComponent';
import { TiErrorMsgComponent } from './TiErrorMsgComponent';
import { TiPendingStateComponent } from './TiPendingStateComponent';
import { MaxLengthValidatorDirective } from './validators/directives/MaxLengthValidatorDirective';
import { RangeSizeValidatorDirective } from './validators/directives/RangeSizeValidatorDirective';
import { RangeValueValidatorDirective } from './validators/directives/RangeValueValidatorDirective';
import { MinLengthValidatorDirective } from './validators/directives/MinLengthValidatorDirective';
import { EmailValidatorDirective } from './validators/directives/EmailValidatorDirective';
import { NotScriptValidatorDirective } from './validators/directives/NotScriptValidatorDirective';
import { ContainsValidatorDirective } from './validators/directives/ContainsValidatorDirective';
import { NotContainsValidatorDirective } from './validators/directives/NotContainsValidatorDirective';
import { DateValidatorDirective } from './validators/directives/DateValidatorDirective';
import { DigitsValidatorDirective } from './validators/directives/DigitsValidatorDirective';
import { EqualValidatorDirective } from './validators/directives/EqualValidatorDirective';
import { Ipv4ValidatorDirective } from './validators/directives/Ipv4ValidatorDirective';
import { Ipv6ValidatorDirective } from './validators/directives/Ipv6ValidatorDirective';
import { MaxValueValidatorDirective } from './validators/directives/MaxValueValidatorDirective';
import { IntegerValidatorDirective } from './validators/directives/IntegerValidatorDirective';
import { MinValueValidatorDirective } from './validators/directives/MinValueValidatorDirective';
import { NotEqualValidatorDirective } from './validators/directives/NotEqualValidatorDirective';
import { NumberValidatorDirective } from './validators/directives/NumberValidatorDirective';
import { PasswordValidatorDirective } from './validators/directives/PasswordValidatorDirective';
import { PortValidatorDirective } from './validators/directives/PortValidatorDirective';
import { RegExpValidatorDirective } from './validators/directives/RegExpValidatorDirective';
import { UrlValidatorDirective } from './validators/directives/UrlValidatorDirective';
import { RequiredValidatorDirective } from './validators/directives/RequiredValidatorDirective';
import { TiRendererModule } from '../../services/renderer/TiRendererModule';
import { TiTipModule } from '../tip/TiTipModule';
import { BaseValidator } from './validators/directives/BaseValidator';
import { MaxValueByStringValidatorDirective } from './validators/directives/MaxValueByStringValidatorDirective';
import { MinValueByStringValidatorDirective } from './validators/directives/MinValueByStringValidatorDirective';
import { RangeValueByStringValidatorDirective } from './validators/directives/RangeValueByStringValidatorDirective';
import { BigIntegerValidatorDirective } from './validators/directives/BigIntegerValidatorDirective';
import { BigNumberValidatorDirective } from './validators/directives/BigNumberValidatorDirective';
import { BigDigitsValidatorDirective } from './validators/directives/BigDigitsValidatorDirective';

@NgModule({
  imports: [
    CommonModule,
    TiIconModule,
    TiRendererModule,
    TiTipModule, // 引用TiTipModule，可以使用Tip指令和Tip服务
    TiLoadingModule
  ],
  // 下面必须写两遍，因为生产环境不允许编译之前执行函数。
  exports: [
    BaseValidator,
    TiErrorMsgComponent,
    TiPendingStateComponent,
    TiValidationDirective, // 额外加的
    MaxLengthValidatorDirective, RangeSizeValidatorDirective, RangeValueValidatorDirective,
    MinLengthValidatorDirective, EmailValidatorDirective, NotScriptValidatorDirective,
    ContainsValidatorDirective, NotContainsValidatorDirective, DateValidatorDirective,
    DigitsValidatorDirective, EqualValidatorDirective, Ipv4ValidatorDirective,
    Ipv6ValidatorDirective, MaxValueValidatorDirective, IntegerValidatorDirective,
    MinValueValidatorDirective, NotEqualValidatorDirective, NumberValidatorDirective,
    PasswordValidatorDirective, PortValidatorDirective, RegExpValidatorDirective, UrlValidatorDirective,
    RequiredValidatorDirective, MaxValueByStringValidatorDirective, MinValueByStringValidatorDirective,
    RangeValueByStringValidatorDirective, BigIntegerValidatorDirective, BigNumberValidatorDirective,
    BigDigitsValidatorDirective
  ],
  declarations: [
    BaseValidator,
    TiValidationDirective, TiPwdMsgComponent, TiPendingStateComponent, TiErrorMsgComponent, // 额外加的
    MaxLengthValidatorDirective, RangeSizeValidatorDirective, RangeValueValidatorDirective, MinLengthValidatorDirective,
    EmailValidatorDirective, NotScriptValidatorDirective, ContainsValidatorDirective, NotContainsValidatorDirective,
    DateValidatorDirective, DigitsValidatorDirective, EqualValidatorDirective, Ipv4ValidatorDirective, Ipv6ValidatorDirective,
    MaxValueValidatorDirective, IntegerValidatorDirective, MinValueValidatorDirective,
    NotEqualValidatorDirective, NumberValidatorDirective, PasswordValidatorDirective,
    PortValidatorDirective, RegExpValidatorDirective,
    UrlValidatorDirective, RequiredValidatorDirective,
    MaxValueByStringValidatorDirective, MinValueByStringValidatorDirective, RangeValueByStringValidatorDirective,
    BigIntegerValidatorDirective, BigNumberValidatorDirective, BigDigitsValidatorDirective
  ],
  entryComponents: [TiPwdMsgComponent, TiErrorMsgComponent, TiPendingStateComponent]
})
export class TiValidationModule {
}
export { TiValidationDirective } from './TiValidationDirective';
export { TiPasswordValidatorConfig, TiValidationConfig, TiValidationType, TiValidationCheckConfig } from './TiValidationInterface';
export { TiValidators } from './validators/TiValidators';
export { BaseValidator} from './validators/directives/BaseValidator';
export { TiErrorMsgComponent } from './TiErrorMsgComponent';
export { TiPendingStateComponent } from './TiPendingStateComponent';
export { MaxLengthValidatorDirective } from './validators/directives/MaxLengthValidatorDirective';
export { RangeSizeValidatorDirective } from './validators/directives/RangeSizeValidatorDirective';
export { RangeValueValidatorDirective } from './validators/directives/RangeValueValidatorDirective';
export { MinLengthValidatorDirective } from './validators/directives/MinLengthValidatorDirective';
export { EmailValidatorDirective } from './validators/directives/EmailValidatorDirective';
export { NotScriptValidatorDirective } from './validators/directives/NotScriptValidatorDirective';
export { ContainsValidatorDirective } from './validators/directives/ContainsValidatorDirective';
export { NotContainsValidatorDirective } from './validators/directives/NotContainsValidatorDirective';
export { DateValidatorDirective } from './validators/directives/DateValidatorDirective';
export { DigitsValidatorDirective } from './validators/directives/DigitsValidatorDirective';
export { EqualValidatorDirective } from './validators/directives/EqualValidatorDirective';
export { Ipv4ValidatorDirective } from './validators/directives/Ipv4ValidatorDirective';
export { Ipv6ValidatorDirective } from './validators/directives/Ipv6ValidatorDirective';
export { MaxValueValidatorDirective } from './validators/directives/MaxValueValidatorDirective';
export { IntegerValidatorDirective } from './validators/directives/IntegerValidatorDirective';
export { MinValueValidatorDirective } from './validators/directives/MinValueValidatorDirective';
export { NotEqualValidatorDirective } from './validators/directives/NotEqualValidatorDirective';
export { NumberValidatorDirective } from './validators/directives/NumberValidatorDirective';
export { PasswordValidatorDirective } from './validators/directives/PasswordValidatorDirective';
export { PortValidatorDirective } from './validators/directives/PortValidatorDirective';
export { RegExpValidatorDirective } from './validators/directives/RegExpValidatorDirective';
export { UrlValidatorDirective } from './validators/directives/UrlValidatorDirective';
export { RequiredValidatorDirective } from './validators/directives/RequiredValidatorDirective';
export { MaxValueByStringValidatorDirective } from './validators/directives/MaxValueByStringValidatorDirective';
export { MinValueByStringValidatorDirective } from './validators/directives/MinValueByStringValidatorDirective';
export { RangeValueByStringValidatorDirective } from './validators/directives/RangeValueByStringValidatorDirective';
export { BigIntegerValidatorDirective } from './validators/directives/BigIntegerValidatorDirective';
export { BigNumberValidatorDirective } from './validators/directives/BigNumberValidatorDirective';
export { BigDigitsValidatorDirective } from './validators/directives/BigDigitsValidatorDirective';

