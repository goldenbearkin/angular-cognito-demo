// /* tslint:disable:no-unused-variable */

export const mockPoolData = {
  // UserPoolId: 'ap-northeast-1_z5j7ZOo5C',
  // ClientId: 'ctdbreu1h64r43qqbp61lvq6m'
  UserPoolId: 'ap-northeast-1_*********',
  ClientId: '*************************'
};

// useValue: 'ap-northeast-1:4ec3151e-96fd-435b-9b81-34b966df1c32'
export const mockIdentityPoolId = 'ap-northeast-1:************************************';

export const mockTokens = {
  getIdToken: () => { return { getJwtToken: () => 'mockIdToken' }; },
  getAccessToken: () => { return { getJwtToken: () => 'mockAccessToken' }; },
  getRefreshToken: () => 'mockRefreshToken'
};


