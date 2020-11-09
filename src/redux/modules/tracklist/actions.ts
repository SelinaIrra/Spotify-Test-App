import {
  TracklistActionType,
  TracksData,
  TracksDictionary,
  GetTracksSuccessAction,
  GetTracksFailedAction,
  GetTracksRequestAction,
  GetTracksDictionarySuccessAction,
  SetUserOffsetAction,
} from './types';

export function getTracksRequest(offset: number, isInit?: boolean): GetTracksRequestAction {
  return {
    type: TracklistActionType.getTracksData,
    offset,
    isInit,
  };
}

export function getTracksSuccess(data: TracksData): GetTracksSuccessAction {
  return {
    type: TracklistActionType.getTracksSuccess,
    data,
  };
}

export function getTracksFailed(): GetTracksFailedAction {
  return {
    type: TracklistActionType.getTracksFailed,
  };
}

export function getTracksDictSuccess(dict: TracksDictionary): GetTracksDictionarySuccessAction {
  return {
    type: TracklistActionType.getTracksDictionarySuccess,
    dictionary: dict,
  };
}

export function setUserOffset(offset: number): SetUserOffsetAction {
  return {
    type: TracklistActionType.setUserOffset,
    offset,
  };
}
