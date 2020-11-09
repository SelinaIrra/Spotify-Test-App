import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { combineReducers } from 'redux';
import sessionSaga from './session/saga';
import { sessionReducer } from './session';
import tracklistSaga from './tracklist/saga';
import { tracklistReducer } from './tracklist';
import searchSaga from './search/saga';
import { searchReducer } from './search';

export function* medusaSaga(): SagaIterator {
  yield all([
    fork(sessionSaga),
    fork(tracklistSaga),
    fork(searchSaga),
  ]);
}

export const reducers = combineReducers({
  session: sessionReducer,
  tracklist: tracklistReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof reducers>;
