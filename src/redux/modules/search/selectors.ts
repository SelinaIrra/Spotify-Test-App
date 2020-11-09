import { RootState } from '..';
import { Artist } from '../../../types/spotifyTypes';
import { TracksByArtist } from '.';

export const lastSearchQuerySelector = (state: RootState) => state.search.query;

export const artistSelector = (state: RootState): Artist => state.search.globalSearchResult.artist;

export const tracksSelector = (state: RootState): TracksByArtist[] => (
  state.search.globalSearchResult.tracks
);

export const emptySearchResultSelector = (state: RootState): boolean => state.search.emptyResult && state.search.query !== '';
