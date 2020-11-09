import {
  call, put, getContext, takeLatest, select, delay,
} from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import {
  SearchActionType,
  MakingUserSearchAction,
  GettingArtistAction,
  ArtistTracksSearchingAction,
  TracksByArtist,
} from './types';
import { RootState } from '..';
import { getTracksSuccess, setUserOffset } from '../tracklist';
import {
  saveSearchSuccess, saveSearchFailed, searchByArtistSuccess, searchArtistSuccess,
} from './actions';
import { setLoadingStatus } from '../session';
import { Track } from '../../../types/spotifyTypes';
import { SERVER_LIMIT } from '../../../constants/pagination';

function* makeUserSearch({ value }: MakingUserSearchAction): SagaIterator {
  const lowerValue = value.toLocaleLowerCase();
  try {
    yield put(setLoadingStatus(true));
    const ajax = yield getContext('ajax');
    const trackDictionary = yield select((state: RootState) => state.tracklist.dictionary);
    const trackIds: string[] = [];
    Object.keys(trackDictionary).forEach((id) => {
      if (trackIds.length === SERVER_LIMIT) return;
      if (trackDictionary[id].indexOf(lowerValue) > -1) {
        trackIds.push(id);
      }
    });
    if (trackIds.length) {
      const responseTracksData = yield call(
        ajax,
        'get',
        '/v1/tracks',
        { ids: trackIds.join(',') },
      );
      const { data } = responseTracksData;
      yield put(getTracksSuccess({
        items: data.tracks.map((
          trackData: Track,
        ) => ({ track: trackData })),
        total: data.tracks.length,
        offset: 0,
      }));
      yield put(saveSearchSuccess(value, !data.tracks.length));
      if (data.tracks.length) { yield delay(800); }
    } else {
      yield put(saveSearchSuccess(value, true));
    }
  } catch (e) {
    yield put(saveSearchFailed());
    console.error(e);
  } finally {
    yield put(setUserOffset(0));
    yield put(setLoadingStatus(false));
  }
}

function* searchArtistTracks({ name }: ArtistTracksSearchingAction): SagaIterator {
  try {
    const ajax = yield getContext('ajax');

    const responseTracksData = yield call(
      ajax, 'get', '/v1/search',
      {
        q: name,
        type: 'track',
        limit: SERVER_LIMIT,
        include_external: 'audio',
      },
    );
    const { data } = responseTracksData;
    const tracks = data.tracks.items.map((track: Track) => ({
      name: track.name,
      url: track.preview_url,
      artist: track.artists[0].name,
      spotify: track.external_urls.spotify,
    })).filter(
      (
        track: TracksByArtist,
        index: number,
        self: TracksByArtist[],
      ) => track.artist.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      && index === self.findIndex((trackTmp: TracksByArtist) => trackTmp.name === track.name),
    );
    yield put(searchByArtistSuccess(tracks));
  } catch (e) {
    console.error(e);
  }
}

function* getArtist({ id }: GettingArtistAction): SagaIterator {
  try {
    yield put(setLoadingStatus(true));
    const ajax = yield getContext('ajax');
    const responseTracksData = yield call(
      ajax,
      'get',
      `/v1/artists/${id}`,
    );
    const { data } = responseTracksData;

    yield put(searchArtistSuccess(data));
  } catch (e) {
    console.error(e);
  } finally {
    yield delay(500);
    yield put(setLoadingStatus(false));
  }
}

export default function* searchSaga(): SagaIterator {
  yield takeLatest(SearchActionType.makingUserSearch, makeUserSearch);
  yield takeLatest(SearchActionType.gettingArtist, getArtist);
  yield takeLatest(SearchActionType.artistTracksSearching, searchArtistTracks);
}
