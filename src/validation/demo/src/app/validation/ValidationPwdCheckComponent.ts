import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TiPasswordValidatorConfig, TiValidationConfig, TiValidators } from '@opentiny/ng';

@Component({
  templateUrl: './validation-pwd-check.html'
})
export class ValidationPwdCheckComponent {
  passwordConfig1: TiValidationConfig = {
    type: 'password'
  };

  passwordConfig2: TiValidationConfig = {
    type: 'password',
    passwordConfig: {
      validator: {
        params: {
          rangeSize: [8, 10],
          minCharType: [3]
        },
        message: {
          rangeSize: '����Ϊ{0}��{1}��',
          minCharType: '���ٰ�����д��ĸ��Сд��ĸ�����ּ��������`!=�е�{0}��'
        }
      }
    }
  };
  passwordConfig3: TiValidationConfig = {
    type: 'password',
    errorMessage: {
      password: 'error msg define'
    }
  };
  passwordConfig4: TiValidationConfig = {
    type: 'password',
    passwordConfig: {
      validator: {
        params: {
          custom1: ['bb']
        },
        message: {
          custom1: 'should not equal to {0}'
        }
      }
    }
  };
  passwordConfig5: TiValidationConfig = {
    errorMessage: {
      custom1: 'error msg define',
      custom2: 'error msg define'
    },
    passwordConfig: {
      validator: {
        rule: 'custiomRule2',
        params: {
          custom1: ['cc'],
          custom2: [8]
        },
        message: {
          custom1: 'should not equal to {0}',
          custom2: 'length should be {0}'
        }
      },
      levelFn(value: string, validator: TiPasswordValidatorConfig): number {
        if (value.length === 2) {
          return 0;
        }
        if (value.length > 2 && value.length < validator.params.custom2[0]) {
          return 1;
        }
        if (value.length === validator.params.custom2[0]) {
          return 2;
        }
      }
    }
  };
  passwordConfig6: TiValidationConfig = {
    type: 'password',
    errorMessage: {
      password: ''
    }
  };
  form: FormGroup;
  constructor(fb: FormBuilder) {
    const custiomRule1: (params: any) => ValidatorFn = (params: any): ValidatorFn => {
      return Validators.compose([
        TiValidators.password({
          notEqualPosRev: () => {
            return this.form.get('usernameInput');
          }
        }),
        this.x(params.t)
      ]);
    };

    const custiomRule2: (params: any) => ValidatorFn = (params: any): ValidatorFn => {
      return Validators.compose([this.x(params.m), this.y(params.n)]);
    };

    this.form = fb.group({
      usernameInput: new FormControl('TinyNG'),
      passwordInput1: new FormControl('', [
        TiValidators.password({
          notEqualPosRev: () => {
            return this.form.get('usernameInput');
          }
        })
      ]),
      passwordInput2: new FormControl('', [
        TiValidators.password({
          notEqualPosRev: () => {
            return this.form.get('usernameInput');
          },
          rangeSize: [8, 10],
          minCharType: [
            3,
            {
              digitsCharReg: /[0-9]+/,
              lowerCharReg: /[a-z]+/,
              upperCharReg: /[A-Z]+/,
              specialCharReg: /[`!=]/
            }
          ]
        })
      ]),
      passwordInput3: new FormControl('', [
        TiValidators.password({
          notEqualPosRev: () => {
            return this.form.get('usernameInput');
          }
        })
      ]),
      passwordInput4: new FormControl('', custiomRule1({ t: 'bb' })),
      passwordInput5: new FormControl('', custiomRule2({ m: 'cc', n: 8 })),
      passwordInput6: new FormControl('', [
        TiValidators.password({
          notEqualPosRev: () => {
            return this.form.get('usernameInput');
          }
        })
      ])
    });
  }
  checkGroup(): void {
    console.log(TiValidators.check(this.form));
  }

  x(param: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value !== param ? null : { custom1: { notEqualValue: param, actualValue: control.value } };
    };
  }

  y(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.length === length
        ? null
        : {
            custom2: {
              requiredLength: length,
              actualLength: control.value.length
            }
          };
    };
  }
}
