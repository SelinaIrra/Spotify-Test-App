import {
  TracklistActionType, TracklistActions, TracklistState, NormalizedTrack,
} from './types';
import { Track } from '../../../types/spotifyTypes';

const initialState: TracklistState = {
  tracks: [],
  serverOffset: 0,
  userOffset: 0,
  total: 0,
  dictionary: {},
  dictionaryReady: false,
};

export function tracklistReducer(state = initialState, action: TracklistActions): TracklistState {
  switch (action.type) {
    case TracklistActionType.getTracksSuccess: {
      const tracksItems: NormalizedTrack[] = action.data.items.map((item: {track: Track}) => {
        const curTrack = item.track;
        return {
          artist: curTrack.artists[0],
          images: curTrack.album.images,
          name: curTrack.name,
          previewUrl: curTrack.preview_url,
          id: curTrack.id,
        };
      });
      return {
        ...state,
        serverOffset: action.data.offset || 0,
        tracks: tracksItems,
        total: action.data.total || 0,
      };
    }
    case TracklistActionType.getTracksFailed: {
      return {
        ...state,
        tracks: [],
      };
    }
    case TracklistActionType.getTracksDictionarySuccess: {
      return {
        ...state,
        dictionary: action.dictionary,
        dictionaryReady: true,
      };
    }
    case TracklistActionType.setUserOffset: {
      return {
        ...state,
        userOffset: action.offset,
      };
    }
    default:
      return state;
  }
}

export * from './actions';
export * from './types';
