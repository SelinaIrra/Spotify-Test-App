import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getUserDataRequest, getTracksRequest } from '../redux';
import { AUTH_URL } from '../constants/urls';
import { serverOffsetSelector } from '../redux/modules/tracklist/selectors';

function parseQueryParams(string: string) {
  return string.split('&').reduce((paramsObj: {[key: string]: string}, paramStr: string) => {
    const [key, val] = paramStr.split('=');
    return {
      ...paramsObj,
      [key]: val,
    };
  }, {});
}

const useUserMounting = (oauthConfirm?: boolean) => {
  const history = useHistory();
  const { hash } = useLocation();
  const dispatch = useDispatch();
  const trackOffset = useSelector(serverOffsetSelector);

  const loadData = () => {
    dispatch(getUserDataRequest());
    dispatch(getTracksRequest(trackOffset, true));
  };

  useEffect(() => {
    if (oauthConfirm) return;
    const token = localStorage.getItem('medusa_token');
    if (token) {
      loadData();
    } else {
      window.location.href = AUTH_URL;
    }
  }, []);

  useEffect(() => {
    if (!oauthConfirm) return;

    const data = parseQueryParams(hash.slice(1));
    if (data.access_token) {
      localStorage.setItem('medusa_token', data.access_token);
      history.push('/');
      loadData();
    }
  }, [oauthConfirm]);
};

export default useUserMounting;
