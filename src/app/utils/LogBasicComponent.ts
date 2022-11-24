import { Component } from '@angular/core';
import { TiLog } from '@opentiny/ng';

@Component({
  templateUrl: './log-basic.html',
})
export class LogBasicComponent {
  constructor() {
    // 此示例会改变全局Log等级
    TiLog.setLevel(TiLog.LEVEL_LOG);
    TiLog.log('Logger.LEVEL_LOG');
    TiLog.log('log test');
    TiLog.warn('warn test');
    TiLog.error('error test');

    TiLog.setLevel(TiLog.LEVEL_WARN);
    TiLog.log('Logger.LEVEL_WARN');
    TiLog.log('log test');
    TiLog.warn('warn test');
    TiLog.error('error test');

    TiLog.setLevel(TiLog.LEVEL_ERROR);
    TiLog.log('Logger.LEVEL_ERROR');
    TiLog.log('log test');
    TiLog.warn('warn test');
    TiLog.error('error test');

    TiLog.setLevel(TiLog.LEVEL_OFF);
    TiLog.log('Logger.LEVEL_OFF');
    TiLog.log('log test');
    TiLog.warn('warn test');
    TiLog.error('error test');
  }
}
