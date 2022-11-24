import { Component } from '@angular/core';
import { TiRadioItem, TiValidationConfig, TiValidators } from '@opentiny/ng';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
	templateUrl: './radiogroup-validation.html'
})

export class RadiogroupValidationComponent {
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
	selected :String = '';
	validationConfig: TiValidationConfig = {
		errorMessage: {
				required: '请至少选择一项'
		}
	};

	checkgroup(form: FormGroup): void {
		const errors: ValidationErrors | null = TiValidators.check(form);
		console.log('errors', errors);
	}

}
