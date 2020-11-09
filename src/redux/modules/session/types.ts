import { User } from '../../../types/spotifyTypes';

// eslint-disable-next-line no-shadow
export enum SessionActionType {
    getUserDataSuccess = 'getUserDataSuccess',
    getUserDataFailed = 'getUserDataFailed',
    getUserData = 'getUserData',
    setLoadingStatus = 'setLoadingStatus'
}

export interface SessionState {
    userData: User,
    loading: boolean
}

export interface GetUserDataSuccessAction {
    type: SessionActionType.getUserDataSuccess,
    data: UserData
}

export interface GetUserDataRequestAction {
    type: SessionActionType.getUserData,
}

export interface GetUserDataFailedAction {
    type: SessionActionType.getUserDataFailed,
}

export interface SetLoadingStatusAction {
    type: SessionActionType.setLoadingStatus,
    load: boolean
}

export interface UserData extends User {}

export type SessionActions = SetLoadingStatusAction
                        | GetUserDataFailedAction
                        | GetUserDataRequestAction
                        | GetUserDataSuccessAction
