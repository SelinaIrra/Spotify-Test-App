import React, { useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SimpleBarReact from 'simplebar-react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {
  searchByArtistRequest,
  clearArtistSearch,
  searchArtistRequest,
} from '../../redux';
import useWindowSize from '../../hooks/windowSizeHook';
import ArtistCard from './ArtistCard';
import style from './Card.module.scss';
import Player from './Player';
import { artistInfoSelector } from '../../redux/modules/tracklist/selectors';
import { loadingSelector } from '../../redux/modules/session/selectors';

export const Card: React.FC<object> = () => {
  const { goBack } = useHistory();
  const size = useWindowSize();
  const scrollNodeRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const loading = useSelector(loadingSelector);
  const { artistName, artistId } = useSelector(artistInfoSelector(id));

  useEffect(() => {
    if (artistName) { dispatch(searchByArtistRequest(artistName)); }
    if (artistId) { dispatch(searchArtistRequest(artistId)); }
    return () => {
      dispatch(clearArtistSearch());
    };
  }, []);

  return (
    <>
      <Header withSearch={false} />
      <SimpleBarReact
        style={{ maxHeight: `calc(100% - ${size.width > 540 ? 60 : 144}px)`, width: '100%' }}
        scrollableNodeProps={{ ref: scrollNodeRef }}
      >
        <div className={style.mainContainer}>
          <Button title="Go back" onClick={goBack} />
          {!loading && (
            <div className={style.content}>
              <ArtistCard />
              <Player />
            </div>
          )}
        </div>
      </SimpleBarReact>
    </>
  );
};

export default Card;
