import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBarReact from 'simplebar-react';
import { Link } from 'react-router-dom';
import { getTracksRequest, setUserOffset } from '../../../redux';
import TrackCard from './TrackCard';
import Button from '../../../components/Button';
import useWindowSize from '../../../hooks/windowSizeHook';
import 'simplebar/dist/simplebar.min.css';
import style from './Tracklist.module.scss';
import { SERVER_LIMIT, USER_PAGE_SIZE } from '../../../constants/pagination';
import {
  tracksSelector,
  serverOffsetSelector,
  userOffsetSelector,
  trackTotalSelector,
} from '../../../redux/modules/tracklist/selectors';
import { loadingSelector } from '../../../redux/modules/session/selectors';
import { emptySearchResultSelector } from '../../../redux/modules/search/selectors';

const Tracklist: React.FC<object> = () => {
  const tracks = useSelector(tracksSelector);
  const scrollNodeRef = useRef<HTMLElement>(null);
  const size = useWindowSize();
  const dispatch = useDispatch();
  const serverOffset = useSelector(serverOffsetSelector);
  const userOffset = useSelector(userOffsetSelector);
  const trackTotal = useSelector(trackTotalSelector);

  const loading = useSelector(loadingSelector);
  const emptySearchResult = useSelector(emptySearchResultSelector);

  const scrollToTop = () => {
    (scrollNodeRef.current as HTMLElement).scrollTop = 0;
  };

  const handlePrevClick = () => {
    if (userOffset + serverOffset === 0) return;
    if (userOffset) {
      dispatch(setUserOffset(userOffset - USER_PAGE_SIZE));
    } else {
      dispatch(getTracksRequest(serverOffset - SERVER_LIMIT));
      dispatch(setUserOffset(SERVER_LIMIT - USER_PAGE_SIZE));
    }
  };

  const handleNextClick = () => {
    if (trackTotal <= serverOffset + userOffset + USER_PAGE_SIZE) return;
    if (userOffset === SERVER_LIMIT - USER_PAGE_SIZE) {
      dispatch(getTracksRequest(serverOffset + SERVER_LIMIT));
      dispatch(setUserOffset(0));
    } else dispatch(setUserOffset(userOffset + USER_PAGE_SIZE));
  };

  useEffect(() => {
    if (!loading && !emptySearchResult) { scrollToTop(); }
  }, [userOffset, loading]);

  return (
    <>
      {emptySearchResult
        ? <p className={style.emptyResult}>Nothing is found</p> : (
          <SimpleBarReact
            style={{ maxHeight: `calc(100% - ${size.width > 540 ? 60 : 144}px)`, width: '100%' }}
            scrollableNodeProps={{ ref: scrollNodeRef }}
          >
            <div className={style.container}>
              {tracks.slice(userOffset, userOffset + USER_PAGE_SIZE).map((track) => (
                <Link to={`/track/${track.id}`} key={track.id} className={style.link}>
                  <TrackCard
                    mp3={track.previewUrl || ''}
                    name={track.name}
                    imgs={track.images}
                    artist={track.artist.name}
                  />
                </Link>
              ))}
            </div>
            <div className={style.pagination}>
              <Button onClick={handlePrevClick} title="Previous" disabled={userOffset + serverOffset === 0} />
              <Button onClick={handleNextClick} title="Next" disabled={trackTotal <= serverOffset + userOffset + USER_PAGE_SIZE} />
            </div>
          </SimpleBarReact>
        )}
    </>
  );
};

export default Tracklist;
