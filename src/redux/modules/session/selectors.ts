import { RootState } from '..';

export const usernameSelector = (state: RootState): string => state.session.userData.display_name;

export const loadingSelector = (state: RootState): boolean => state.session.loading;
