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
/*
 * Logger工具类提供全局日志输出级别控制。
 *
 * 提供三个静态日志方法，log()/warn()/error()
 *
 * log()是调试期日志，产品时一定关闭。组件对打包对外提供时也关闭，不干扰用户开发。
 *
 * info()是产品期也可以输出的重要日志。暂不提供。
 *
 * warn()/error()产品期，可酌情打开。后期可以考虑，error日志回传给服务器。
 *
 */

export class TiLog {

    /**
     * 输出 Log 以上日志，包含 Log/Warn/Error，log 表示一般的调试和运行信息。
     */
    public static readonly LEVEL_LOG: number = 1;
    /**
     * 输出 Warn 以上日志，包含 Warn/Error 日志，Warn 表示会出现潜在错误的提示。
     */
    public static readonly LEVEL_WARN: number = 2;
    /**
     * 输出 Error 日志，Error 表示发生错误事件，已经影响系统的正常运行。
     */
    public static readonly LEVEL_ERROR: number = 3;
    /**
     * 关闭输出所有日志
     */
    public static readonly LEVEL_OFF: number = 10;

    private static level: number = TiLog.LEVEL_OFF;
    /**
     * 设置输出日志级别：LOG/WARN/ERROR/OFF. 默认是 OFF
     */
    public static setLevel(level: number): void {
            TiLog.level = level;
    }
    /**
     * 打印一般的调试和运行信息
     * @param [message] 信息
     * @param optionalParams 参数
     */
    public static log(message?: any, ...optionalParams: Array<any>): void {
        if (TiLog.LEVEL_LOG >= TiLog.level && console.log) {
            console.log(message, ...optionalParams);
        }
    }

    /**
     *  打印会出现潜在错误的提示
     * @param [message] 信息
     * @param optionalParams 参数
     */
    public static warn(message?: any, ...optionalParams: Array<any>): void {
        if (TiLog.LEVEL_WARN >= TiLog.level && console.warn) {
            console.warn(message, ...optionalParams);
        }
    }
    /**
     * 打印在发生错误，已经影响系统的正常运行的信息
     * @param [message] 信息
     * @param optionalParams 参数
     */
    public static error(message?: any, ...optionalParams: Array<any>): void {
        if (TiLog.LEVEL_ERROR >= TiLog.level && console.error) {
            console.error(message, ...optionalParams);
        }
    }
}
