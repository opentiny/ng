/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
// 该功能类用于根据校验方式定义校验实体执行函数
import { Injectable } from '@angular/core';
import { ChangeCheck } from './ChangeCheck';
import { BlurCheck } from './BlurCheck';
import { PwdCheck } from './PwdCheck';
import { RadiobaseCheck } from './RadiobaseCheck';
import { CommonService } from './CommonService';
import { TiValidationDefaultConfig } from '../TiValidationConfig';
import { Util } from '../../../utils/Util';
import { TiValidationConfig, TiValidationType } from '../TiValidationInterface';
import { CheckStyleModule } from './CheckStyleModule';

/**
 * @ignore
 */
@Injectable({
    providedIn: CheckStyleModule
})
export class CheckStyleService {
    constructor(private commonService: CommonService) {
    }
    public createHandler(type: TiValidationType | '', config: TiValidationConfig): any {
        let resultType: any = type;
        // 设置checkStyle默认值
        if (Util.isUndefined(type)) {
            resultType = TiValidationDefaultConfig.type;
            // 设置passwordConfig情况下，type默认为'password'
            if (!Util.isUndefined(config.passwordConfig)) {
                resultType = 'password';
            }
        }
        // 根据不同的配置，设置校验方式执行函数
        let handle: any;
        switch (resultType) {
            case 'radiobase':
                handle = new RadiobaseCheck(config, this.commonService);
                break;
            case 'blur':
                handle = new BlurCheck(config, this.commonService);
                break;
            case 'password':
                handle = new PwdCheck(config, this.commonService);
                break;
            default: // 定义为'change'及其他无效方式,均采用change校验方式
                handle = new ChangeCheck(config, this.commonService);
        }

        return handle;
    }
}
