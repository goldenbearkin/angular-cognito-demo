import { NgModule, ModuleWithProviders } from '@angular/core';

import { CognitoUtilityService, PoolData, PoolDataT, IdentityPoolId } from './cognito-utility/cognito-utility.service';
import { UserRegistrationService } from './user-registration/user-registration.service';
import { UserLoginService } from './user-login/user-login.service';
// import { HttpV4 } from './http-v4/http-v4.service';

export { PoolDataT };

import 'rxjs/add/operator/mergeMap';

@NgModule()
export class AwsCognitoModule {
  static setConfig(POOL_DATA: PoolDataT, IDENTITY_POOL_ID: string): ModuleWithProviders {
    return {
      ngModule: AwsCognitoModule,
      providers: [
        // HttpV4,
        CognitoUtilityService,
        UserLoginService,
        UserRegistrationService,
        { provide: PoolData, useValue: POOL_DATA },
        { provide: IdentityPoolId, useValue: IDENTITY_POOL_ID }
      ]
    };
  }
}
