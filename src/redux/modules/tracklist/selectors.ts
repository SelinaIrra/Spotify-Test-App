import { RootState } from '..';
import { NormalizedTrack } from '.';

export const dictReadySelector = (state: RootState): boolean => state.tracklist.dictionaryReady;

export const serverOffsetSelector = (state: RootState): number => state.tracklist.serverOffset;

export const isDataLoadedSelector = (state: RootState): boolean => (
  Boolean(state.tracklist.tracks.length)
);

export const artistInfoSelector = (id: string) => (state: RootState) => {
  const trackItem = state.tracklist.tracks.find((item : NormalizedTrack) => item.id === id);
  if (!trackItem) return {};
  return { artistId: trackItem.artist.id, artistName: trackItem.artist.name };
};

export const tracksSelector = (state: RootState): NormalizedTrack[] => state.tracklist.tracks;

export const userOffsetSelector = (state: RootState): number => state.tracklist.userOffset;

export const trackTotalSelector = (state: RootState): number => state.tracklist.total;
