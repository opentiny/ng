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
/**
 * @ignore
 */
import { formatDate, formatNumber, getLocaleCurrencySymbol,
    getLocaleId, getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { TiLocale } from './TiLocale';
export class TiLocaleFormat {
    private static readonly TIME_FORMAT: string = 'mediumTime'; // 'h:mm:ss a' (e.g. 9:03:01 AM)
    private static readonly DATE_FORMAT: string = 'mediumDate'; // 'MMM d, y' (e.g. Jun 15, 2015).
    private static readonly DATETIME_FORMAT: string = 'medium'; // 'MMM d, y, h:mm:ss a' (e.g. Jun 15, 2015, 9:03:01 AM)
    private static readonly DEFAULT_LOCALE: string = 'en';
    /**
     * 获取语种关键字，默认为'en'
     * @return 语种关键字
     */
    private static getLocaleKey(): string {
        let locale: string = TiLocale.getLocaleWords().tiLocaleKey;
        try {// local信息未注册情况下，getLocaleId该方法会报错，因此使用try catch的方式
            getLocaleId(TiLocale.getLocaleWords().tiLocaleKey);
        } catch (error) {
            locale = TiLocaleFormat.DEFAULT_LOCALE;
        }

        return locale;
    }
    /**
     * @description 对国际化数字进行处理(包含小数点)
     * @param: number 国际化数字
     * @param: isIntegerValid 只针对integer的情况
     * @return 返回数字信息
     */
    private static parseNumWithDecimal(number: string, isIntegerValid?: boolean): any {
        const groupSep: string = TiLocaleFormat.getNumberSymbol('Group');
        const decimalSep: string = TiLocaleFormat.getNumberSymbol('Decimal');
        const numberReg: RegExp =
            new RegExp('^(?:-?\\d*|-?\\d(?:\\' + groupSep + '?\\d*)+)?(?:\\' + decimalSep + '\\d*)?$');
        const numberFormat: string = number;

        if (!numberReg.test(numberFormat)) {
            return NaN;
        }
        const groupReg: RegExp = new RegExp('\\' + groupSep, 'g');
        const decimalReg: RegExp = new RegExp('\\' + decimalSep, 'g');
        const numberFormatString: string = numberFormat.replace(groupReg, '')
            .replace(decimalReg, '.');
        const numberFloat: number = parseFloat(numberFormatString);
        /*
        * *只针对integer的情况
        * 截取转换前的小数位字符串numFormatSlice
        * 转换前的小数位字符串长度numFormatCount
        * 转换后的小数位为0,就添加小数位个数的0，返回值是string类型
        * */

        if (isIntegerValid && (numberFormatString.indexOf('.') !== -1)) {
            return numberFormatString;
        }

        return numberFloat;
    }
    /**
     * 获取数字规则信息
     * key 规则关键字
     */
    public static getNumberSymbol(key: string): string {
        const standardNumber: number = 10000.0;
        const localeNumber: string = TiLocaleFormat.formatNumber(standardNumber, '1.1-1');

        return key === 'Group' ? localeNumber.charAt(2) : localeNumber.charAt(6);
    }
    /**
     * @description 对数字进行国际化处理
     * @param: number 数字
     * @param: numberFormat 数字格式化形式
     * @return 返回格式化后的信息
     */
    public static formatNumber(number: number, format: string): string {
        let options: any;
        if (format) {
            options = {
                minimumIntegerDigits: format.substring(0, format.indexOf('.')),
                minimumFractionDigits: format.substring(format.indexOf('.') + 1, format.indexOf('-')),
                maximumFractionDigits: format.substring(format.indexOf('-') + 1)
            };
        }

        // TODO: new Intl.NumberFormat es西语下整数部分有四位时，本地化数字没有千位分隔
        const res: string = new Intl.NumberFormat(TiLocale.getLocaleWords().tiLocaleKey, options)
            .format(number);

        return res;
    }

    /**
     * @description 对国际化数字进行标准化处理
     * @param: number 国际化数字
     * @return 返回数字信息
     */
    public static parseNumber(number: string): number {
        return parseFloat(TiLocaleFormat.parseNumWithDecimal(number));
    }

    /**
     * @description 对时间进行国际化处理
     * @param: time 时间
     * @param: format 时间格式
     * @return 返回格式化后的信息
     */
    public static formatTime(time: string | number | Date, format?: string, timezone?: string): string {
        return formatDate(time, format || TiLocaleFormat.TIME_FORMAT, TiLocaleFormat.getLocaleKey(), timezone);
    }

    /**
     * @description 对日期进行国际化处理
     * @param date 日期
     * @param format 日期格式
     * @return 返回格式化后的信息
     */
    public static formatDate(date: Date, format?: string, timezone?: string): string {
        return formatDate(date, format || TiLocaleFormat.DATE_FORMAT, TiLocaleFormat.getLocaleKey(), timezone);
    }

    /**
     * @description 对时间日期进行国际化处理
     * @param: 时间日期
     * @param: 时间日期格式
     * @return 返回格式化后的信息
     */
    public static formatDateTime(dateTime: Date, format?: string, timezone?: string): string {
        return formatDate(dateTime, format || TiLocaleFormat.DATETIME_FORMAT, TiLocaleFormat.getLocaleKey(), timezone);
    }

    /**
     * 功能描述：去除千位分隔符，得到标准化数字
     * value: 带有千位分隔符的数据
     */
    public static deleteGroupSep(value: any): string {
        let res: any;
        res = String(value);
        const groupSep: string = TiLocaleFormat.getNumberSymbol('Group');
        const groupSepReg: any = new RegExp('\\' + groupSep, 'g');

        return res.replace(groupSepReg, '');
    }
    /**
     * 检测format接口配置是否合法。目前spinner和inputnumber组件会用到
     */
    public static isInvalidFormat(format: string): boolean {
        if (typeof (format) !== 'string'
            || format.charAt(0)
            .toUpperCase() !== 'N'
            || Number.isNaN(parseInt(format.slice(1), 10))) {
            return true;
        }

        return false;
    }
}
