import {
  call, put, getContext, takeLatest,
} from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { SessionActionType } from './types';
import { getUserDataFailed, getUserDataSuccess } from './actions';

function* getUserDataRequest(): SagaIterator {
  const ajax = yield getContext('ajax');
  try {
    const responseUserData = yield call(
      ajax,
      'get',
      '/v1/me',
    );
    const { data } = responseUserData;
    yield put(getUserDataSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(getUserDataFailed());
  }
}

export default function* sessionSaga(): SagaIterator {
  yield takeLatest(SessionActionType.getUserData, getUserDataRequest);
}
