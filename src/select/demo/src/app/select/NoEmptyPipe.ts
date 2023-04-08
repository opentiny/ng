import { Pipe, PipeTransform } from '@angular/core';
import { Util } from '@opentiny/ng';

@Pipe({ name: 'noempty' })
export class NoEmptyPipe implements PipeTransform {
  transform(value: Array<any>): Array<any> {
    return value.filter((item: any) => !Util.isEmptyString(item.label));
  }
}
