import { Component, ViewChild } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-format-test.html',
})
export class DaterangeFormatTestComponent {
  value: TiDateValue = {
    begin: new Date(2017, 8, 27),
    end: new Date(2018, 5, 6),
  };

  value1: TiDateValue = {
    begin: new Date(2013, 10, 10),
    end: new Date(2015, 5, 6),
  };

  value2: TiDateValue = {
    begin: new Date(2016, 2, 25),
    end: new Date(2018, 10, 16),
  };

  value3: TiDateValue = {
    begin: new Date(2013, 10, 10),
    end: new Date(2018, 10, 16),
  };

  value4: TiDateValue = {
    begin: new Date(2013, 6, 1),
    end: new Date(2018, 8, 30, 23, 59, 59),
  };
  min: Date = new Date(2012, 0);

  format1: string = 'yyyy/MM/dd';
  format2: string = 'yyyy.MM';
  format3: string = 'mediumDate';
  format4: string = 'yyyy';
  format5: string = 'YYYY/QQ';

  clickFn(): void {
    this.format3 = 'yyyy.MM.dd';
  }

  okClick(event: TiDateValue): void {
    console.log(event);
  }
  changeQuarterVal(): void {
    this.value4 = {
      begin: new Date(2013, 10, 1),
      end: new Date(2018, 4, 30, 23, 59, 59),
    };
  }
}
