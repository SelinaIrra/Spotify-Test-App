import {
  call, put, getContext, takeLatest, all, delay,
} from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import {
  TracklistActionType, GetTracksRequestAction, TracksDetailed, TracksDictionary,
} from './types';
import {
  getTracksSuccess,
  getTracksFailed,
  getTracksDictSuccess,
} from './actions';
import { setLoadingStatus } from '../session';
import { Track } from '../../../types/spotifyTypes';
import { SERVER_LIMIT } from '../../../constants/pagination';

interface TracksData {
  items: TracksDetailed
}

function* getTracksRequest({ offset, isInit }: GetTracksRequestAction): SagaIterator {
  const ajax = yield getContext('ajax');
  try {
    yield put(setLoadingStatus(true));
    const responseTracksData = yield call(
      ajax,
      'get',
      '/v1/me/tracks',
      { offset, limit: SERVER_LIMIT },
    );
    const tracksData = responseTracksData.data;
    yield put(getTracksSuccess(tracksData));
    const requestCount = Math.ceil(tracksData.total / SERVER_LIMIT);
    if (isInit && requestCount > 1) {
      const dict: TracksDictionary = tracksData.items.reduce(
        (dictObj: TracksDictionary, item: {track: Track}) => ({
          ...dictObj,
          [item.track.id]: `${item.track.name} ${item.track.artists[0].name}`.toLocaleLowerCase(),
        }), {},
      );
      const calls = [];
      for (let i = 1; i < requestCount; i += 1) {
        calls.push(call(ajax,
          'get',
          '/v1/me/tracks',
          { offset: SERVER_LIMIT * i, limit: SERVER_LIMIT }));
      }
      const allTracks = yield all(calls);
      allTracks.forEach((jsonData: {data: TracksData}) => {
        const { data } = jsonData;
        data.items.forEach((item: {track: Track}) => {
          dict[item.track.id] = `${item.track.name} ${item.track.artists[0].name}`.toLocaleLowerCase();
        });
      });
      yield put(getTracksDictSuccess(dict));
    }
  } catch (e) {
    console.error(e);
    yield put(getTracksFailed());
  } finally {
    yield delay(800);
    yield put(setLoadingStatus(false));
  }
}

export default function* tracklistSaga(): SagaIterator {
  yield takeLatest(TracklistActionType.getTracksData, getTracksRequest);
}
