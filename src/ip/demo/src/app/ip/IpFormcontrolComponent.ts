import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './ip-formcontrol.html'
})
export class IpFormcontrolComponent implements OnInit {
  ipForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.ipForm = this.fb.group({
      ipValue: '127.0.0.1'
    });
  }
}
