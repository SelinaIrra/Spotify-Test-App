export const SOURCE_URL = 'https://api.spotify.com';
export const BASE_URL = 'http://localhost:3000';

const QUERY_PARAMS = [
  'client_id=17d893ffda3e47019f2117f770e00315',
  'response_type=token',
  `redirect_uri=${BASE_URL}/oauth`,
  'scope=user-read-private%20user-library-read',
].join('&');

export const AUTH_URL = `https://accounts.spotify.com/authorize?${QUERY_PARAMS}`;
