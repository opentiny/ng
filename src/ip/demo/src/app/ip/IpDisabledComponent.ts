import { Component } from '@angular/core';

@Component({
  templateUrl: './ip-disabled.html'
})
export class IpDisabledComponent {
  ipv4Value: string = '127.0.0.1';
  disabled: boolean = true;
}
