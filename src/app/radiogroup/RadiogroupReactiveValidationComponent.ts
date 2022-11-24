import { Component, ElementRef } from '@angular/core';
import { TiRadioItem, TiValidationConfig, TiValidators } from '@opentiny/ng';
import { FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
	templateUrl: './radiogroup-reactive-validation.html'
})

export class RadiogroupReactiveValidationComponent {
	radioList: Array<TiRadioItem> = [
		{
			id: '1',
			label: '中国',
			value: 'China',
		},
		{
			id: '2',
			label: '美国',
			value: 'America',
		},
		{
			id: '3',
			label: '英国',
			value: 'Britain'
		}
	];
	validationConfig: TiValidationConfig = {
		errorMessage: {
				required: '请至少选择一项'
		}
	};

	myForm: FormGroup;
	constructor(fb: FormBuilder, private elementRef: ElementRef) {
		this.myForm = fb.group({
				formradiogroup: new FormControl(undefined, [TiValidators.required]),
		});
	}

	checkgroup(): void {
		const errors: ValidationErrors | null = TiValidators.check(this.myForm);
		console.log(errors);
	}
}
