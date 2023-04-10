import { Component } from '@angular/core';

@Component({
  templateUrl: './ip-valid.html'
})
export class IpValidComponent {
  ipv4Value: string = '';
  ipv6Value: string = '0:0:0:0:0:0:0:1';
}
