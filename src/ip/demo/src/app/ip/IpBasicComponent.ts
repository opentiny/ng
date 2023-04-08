import { Component } from '@angular/core';

@Component({
  templateUrl: './ip-basic.html'
})
export class IpBasicComponent {
  ipv4Value: string = '';
  ipv6Value: string = '0:0:0:0:0:0:0:1';
  ipv6ValueAbbreviated: string = '::1';
}
