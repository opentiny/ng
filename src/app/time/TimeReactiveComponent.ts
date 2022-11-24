import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './time-reactive.html'
})
export class TimeReactiveComponent {
    timeValue: string = '';
    timeValue1: string = '';
    format: string = 'HH:mm:ss';
    format1: string = 'HH:mm';
    timeGroup = new FormGroup({
            timeForm: new FormControl('timeValue'),
            timeForm1: new FormControl('timeValue1')
        })
}