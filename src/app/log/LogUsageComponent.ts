import { Component } from '@angular/core';
import { TiLog } from '@opentiny/ng';

@Component({
  templateUrl: './log-usage.html',
})
export class LogUsageComponent {
  constructor() {
    // 当前日志的数值大于等于日志等级时，当前日志才会正常输出
    // 当前日志等级：LEVEL_LOG为1
    TiLog.setLevel(TiLog.LEVEL_LOG);
    // log的数值是1，大于等于1，正常输出
    TiLog.log('LEVEL_LOG：log');
    // warn的数值是2，大于等于1，正常输出
    TiLog.warn('LEVEL_LOG：warn');
    // error的数值是3，大于等于1，正常输出
    TiLog.error('LEVEL_LOG：error');

    // 当前日志等级：LEVEL_WARN为 2
    TiLog.setLevel(TiLog.LEVEL_WARN);
    // log的数值是1，小于2，不会输出
    TiLog.log('LEVEL_WARN: log');
    // warn的数值是2，大于等于2，正常输出
    TiLog.warn('LEVEL_WARN: warn');
    // error的数值是3，大于等于2，正常输出
    TiLog.error('LEVEL_WARN: error');

    // 以下同理
    TiLog.setLevel(TiLog.LEVEL_ERROR);
    // 不输出
    TiLog.log('LEVEL_ERROR: log');
    // 不输出
    TiLog.warn('LEVEL_ERROR: warn');
    // 输出
    TiLog.error('LEVEL_ERROR: error');

    TiLog.setLevel(TiLog.LEVEL_OFF);
    // 不输出
    TiLog.log('LEVEL_OFF：log');
    // 不输出
    TiLog.warn('LEVEL_OFF：warn');
    // 不输出
    TiLog.error('LEVEL_OFF：error');
  }
}
