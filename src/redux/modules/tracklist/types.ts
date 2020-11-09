import { Track, Image, SimpleArtist } from '../../../types/spotifyTypes';

// eslint-disable-next-line no-shadow
export enum TracklistActionType {
    getTracksSuccess = 'getTracksSuccess',
    getTracksFailed = 'getTracksFailed',
    getTracksData = 'getTracksData',
    getTracksDictionarySuccess = 'getTracksDictionarySuccess',
    setUserOffset = 'setUserOffset'
}

export interface TracklistState {
    tracks: NormalizedTrack[],
    serverOffset: number,
    userOffset: number,
    total: number,
    dictionary: TracksDictionary,
    dictionaryReady: boolean
}

export interface NormalizedTrack {
    artist: SimpleArtist,
    images: Image[],
    name: string,
    previewUrl: string | null,
    id: string,
}

export interface GetTracksSuccessAction {
    type: TracklistActionType.getTracksSuccess,
    data: TracksData
}

export interface GetTracksRequestAction {
    type: TracklistActionType.getTracksData,
    offset: number,
    isInit?: boolean
}

export interface GetTracksFailedAction {
    type: TracklistActionType.getTracksFailed,
}

export interface GetTracksDictionarySuccessAction {
    type: TracklistActionType.getTracksDictionarySuccess,
    dictionary: TracksDictionary
}

export interface SetUserOffsetAction {
    type: TracklistActionType.setUserOffset,
    offset: number,
}

export interface TracksData {
    items: TracksDetailed,
    offset?: number,
    total?: number,
}

export type TracksDetailed = {
    track: Track
}[]

export interface TracksDictionary {
    [key: string]: string
}

export type TracklistActions = GetTracksSuccessAction
    | GetTracksRequestAction
    | GetTracksFailedAction
    | GetTracksDictionarySuccessAction
    |SetUserOffsetAction
