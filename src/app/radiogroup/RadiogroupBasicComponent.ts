import { Component } from '@angular/core';
import { TiRadioItem } from '@opentiny/ng';

@Component({
	templateUrl: './radiogroup-basic.html'
})

export class RadiogroupBasicComponent {
	radioList: Array<TiRadioItem> = [
		{
			id: '1',
			label: '中国',
			value: 'China',
			disabled: false
		},
		{
			id: '2',
			label: '美国',
			value: 'America',
			disabled: true
		},
		{
			id: '3',
			label: '英国',
			value: 'Britain'
		}
	];
	selected: string = 'China';
}
