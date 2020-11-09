import React from 'react';
import { useSelector } from 'react-redux';
import style from './ArtistCard.module.scss';
import { artistSelector } from '../../../redux/modules/search/selectors';

export const ArtistCard: React.FC<object> = () => {
  const artist = useSelector(artistSelector);
  return (
    <>
      {artist.name ? (
        <figure className={style.container}>
          <img alt="some artist" src={artist.images ? artist.images[1].url : ''} />
          <div className={style.information}>
            <figcaption>{artist.name}</figcaption>
            <ul>
              {artist.genres && artist.genres.map(
                (genre: string) => <li key={genre}><span>{genre}</span></li>,
              )}
            </ul>
          </div>
        </figure>
      ) : <span>Not found</span>}
    </>
  );
};

export default ArtistCard;
