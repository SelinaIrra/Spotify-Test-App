import {
  SearchActionType,
  MakingUserSearchSuccessAction,
  MakingUserSearchAction,
  MakingUserSearchFailedAction,
  ArtistTracksSearchingAction,
  ArtistTracksSearchingSuccessAction,
  GettingArtistAction,
  SearchArtistSuccessAction,
  ArtistSearchClearingAction,
  TracksByArtist,
} from './types';
import { Artist } from '../../../types/spotifyTypes';

export function makeUserSearchRequest(value: string): MakingUserSearchAction {
  return {
    type: SearchActionType.makingUserSearch,
    value,
  };
}

export function saveSearchSuccess(
  query: string, isEmptyResult: boolean,
): MakingUserSearchSuccessAction {
  return {
    type: SearchActionType.makingUserSearchSuccess,
    isEmptyResult,
    query,
  };
}

export function saveSearchFailed(): MakingUserSearchFailedAction {
  return {
    type: SearchActionType.makingUserSearchFailed,
  };
}

export function searchByArtistRequest(name: string): ArtistTracksSearchingAction {
  return {
    type: SearchActionType.artistTracksSearching,
    name,
  };
}

export function searchByArtistSuccess(data: TracksByArtist[]): ArtistTracksSearchingSuccessAction {
  return {
    type: SearchActionType.artistTracksSearchingSuccess,
    data,
  };
}

export function searchArtistRequest(id: string): GettingArtistAction {
  return {
    type: SearchActionType.gettingArtist,
    id,
  };
}

export function searchArtistSuccess(data: Artist): SearchArtistSuccessAction {
  return {
    type: SearchActionType.gettingArtistSuccess,
    data,
  };
}

export function clearArtistSearch(): ArtistSearchClearingAction {
  return {
    type: SearchActionType.artistSearchClearing,
  };
}
