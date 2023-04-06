import { Component } from '@angular/core';
import { TiLocaleFormat } from '@opentiny/ng';
@Component({
  templateUrl: './locale-format.html'
})
export class LocaleFormatComponent {
  formatedNumber: string = TiLocaleFormat.formatNumber(1598565912.6574, '1.2-2');
  formatedNumber1: string = TiLocaleFormat.formatNumber(1000, '1.1-1');
  formatedDate: string = TiLocaleFormat.formatDate(new Date());
  formatedTime: string = TiLocaleFormat.formatTime(new Date());
  formatedDateTime: string = TiLocaleFormat.formatDateTime(new Date(), '', '+0430');
}
