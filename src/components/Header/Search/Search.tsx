import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeUserSearchRequest,
  getTracksRequest,
  saveSearchSuccess,
  setUserOffset,
} from '../../../redux';
import search from '../../../style/media/search.png';
import style from './Search.module.scss';
import { dictReadySelector } from '../../../redux/modules/tracklist/selectors';
import { lastSearchQuerySelector } from '../../../redux/modules/search/selectors';

const Search: React.FC<object> = () => {
  const [isChanged, setChanged] = useState<boolean>(false);
  const [searchValue, setSearchVal] = useState<string>('');
  const isTracksDictionaryReady = useSelector(dictReadySelector);
  const lastSearchQuery = useSelector(lastSearchQuerySelector);
  // eslint-disable-next-line no-undef
  const [timeout, setNewTimeout] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();

  useEffect(() => () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  }, [timeout]);

  useEffect(() => {
    if (!isChanged) return;
    setNewTimeout(setTimeout(() => {
      if (searchValue) {
        dispatch(makeUserSearchRequest(searchValue));
      } else {
        dispatch(saveSearchSuccess('', true));
        dispatch(setUserOffset(0));
        dispatch(getTracksRequest(0));
      }
    }, 300));
  }, [searchValue]);

  useEffect(() => {
    setSearchVal(lastSearchQuery);
  }, []);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(ev.target.value);
    setChanged(true);
  };

  return (
    <div className={style.container}>
      <input
        value={searchValue}
        onChange={handleChange}
        disabled={!isTracksDictionaryReady}
        placeholder="Search..."
      />
      <img alt="search" src={search} />
    </div>
  );
};

export default Search;
