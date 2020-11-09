import {
  SessionActionType,
  GetUserDataSuccessAction,
  GetUserDataFailedAction,
  UserData,
  GetUserDataRequestAction,
  SetLoadingStatusAction,
} from './types';

export function getUserDataRequest(): GetUserDataRequestAction {
  return {
    type: SessionActionType.getUserData,
  };
}

export function getUserDataSuccess(data: UserData): GetUserDataSuccessAction {
  return {
    type: SessionActionType.getUserDataSuccess,
    data,
  };
}

export function getUserDataFailed(): GetUserDataFailedAction {
  return {
    type: SessionActionType.getUserDataFailed,
  };
}

export function setLoadingStatus(load: boolean): SetLoadingStatusAction {
  return {
    type: SessionActionType.setLoadingStatus,
    load,
  };
}
