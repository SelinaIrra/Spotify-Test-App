import { Artist } from '../../../types/spotifyTypes';

// eslint-disable-next-line no-shadow
export enum SearchActionType {
    makingUserSearchSuccess = 'MakingUserSearchSuccess',
    makingUserSearchFailed = 'MakingUserSearchFailed',
    makingUserSearch = 'MakingUserSearch',
    artistTracksSearching = 'ArtistTracksSearching',
    artistTracksSearchingSuccess = 'ArtistTracksSearchingSuccess',
    gettingArtist = 'GettingArtist',
    gettingArtistSuccess = 'GettingArtistSuccess',
    artistSearchClearing = 'ArtistSearchClearing'
}

export interface SearchState {
    query: string,
    emptyResult: boolean,
    globalSearchResult: {
        artist: Artist,
        tracks: TracksByArtist[]
    }
}

export interface TracksByArtist {
    name: string,
    url: string,
    artist: string,
    spotify: string,
}

export interface MakingUserSearchSuccessAction {
    type: SearchActionType.makingUserSearchSuccess,
    query: string,
    isEmptyResult: boolean
}

export interface MakingUserSearchAction {
    type: SearchActionType.makingUserSearch,
    value: string,
}

export interface SearchArtistSuccessAction {
    type: SearchActionType.gettingArtistSuccess,
    data: Artist
}

export interface GettingArtistAction {
    type: SearchActionType.gettingArtist,
    id: string
}

export interface ArtistTracksSearchingAction {
    type: SearchActionType.artistTracksSearching,
    name: string
}

export interface ArtistTracksSearchingSuccessAction {
    type: SearchActionType.artistTracksSearchingSuccess,
    data: TracksByArtist[]
}

export interface MakingUserSearchFailedAction {
    type: SearchActionType.makingUserSearchFailed,
}

export interface ArtistSearchClearingAction {
    type: SearchActionType.artistSearchClearing,
}

export type SearchActions = MakingUserSearchSuccessAction
                        | MakingUserSearchAction
                        | SearchArtistSuccessAction
                        | GettingArtistAction
                        | ArtistTracksSearchingAction
                        | ArtistTracksSearchingSuccessAction
                        | ArtistSearchClearingAction
                        | MakingUserSearchFailedAction
