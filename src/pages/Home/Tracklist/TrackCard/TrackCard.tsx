import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import style from './TrackCard.module.scss';
import { Image } from '../../../../types/spotifyTypes';
import { loadingSelector } from '../../../../redux/modules/session/selectors';

interface TrackCardProps {
  name: string,
  imgs: Image[],
  mp3: string,
  artist: string
}

const TrackCard: React.FC<TrackCardProps> = ({
  name, imgs, mp3, artist,
}: TrackCardProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const loading = useSelector(loadingSelector);

  const handleMouseEnter = () => {
    if (!mp3 || !canPlay) return;
    const audio: HTMLAudioElement = audioRef.current as HTMLAudioElement;
    if (audio.currentTime >= 30) audio.currentTime = 0;
    audio.play();
  };

  const handleMouseLeave = () => {
    if (!mp3 || !canPlay) return;
    (audioRef.current as HTMLAudioElement).pause();
  };

  return (
    <div className={style.container}>
      <div
        className={style.album}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!loading && <img src={imgs[1].url} alt="album" width={180} height={180} />}
        {mp3 ? (
          <>
            <div className={canPlay ? style.audioDisk : style.disk} />
            <audio src={mp3} preload="auto" controls ref={audioRef} onCanPlayThroughCapture={() => setCanPlay(true)}>
              <track
                default
                kind="captions"
              />
            </audio>
          </>
        ) : <div className={style.noSound} />}
      </div>
      <strong>{artist}</strong>
      <span>{name}</span>
    </div>
  );
};

export default TrackCard;
