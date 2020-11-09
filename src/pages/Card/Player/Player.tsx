import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SimpleBarReact from 'simplebar-react';
import { Link } from 'react-router-dom';
import { TracksByArtist } from '../../../redux';
import style from './Player.module.scss';
import spotify from '../../../style/media/spotify.png';
import { tracksSelector } from '../../../redux/modules/search/selectors';

export const Player: React.FC<object> = () => {
  const tracks = useSelector(tracksSelector);
  const audioNode = useRef<HTMLAudioElement | null>(null);
  const scrollNodeRef = useRef<HTMLElement | null>(null);
  const [currentTrack, setTrack] = useState<{[key: string]: string}>({});
  const [isPlaying, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  const pause = () => {
    setPlaying(false);
    const audioElement: HTMLAudioElement = audioNode.current as HTMLAudioElement;
    audioElement.pause();
    audioElement.currentTime = 0;
    setTrack({});
    setCanPlay(false);
  };

  const handleClick = (newName: string, newUrl: string) => {
    if (!newUrl) return;
    if (isPlaying) { pause(); }
    if (currentTrack.name !== newName) {
      setTrack({ name: newName, url: newUrl });
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    (audioNode.current as HTMLAudioElement).play();
  }, [canPlay, isPlaying]);

  const getLiClassName = (track: TracksByArtist) => {
    const className: string = isPlaying && currentTrack.name === track.name ? 'play' : 'stop';
    return track.url ? className : '';
  };

  return (
    <div className={tracks.length ? style.container : style.noDisplay}>
      <div className={style.player}>
        <div className={isPlaying ? style.diskRotated : style.disk} />
        <div
          className={isPlaying ? style.playerPlay : style.playerStop}
        />
        <audio
          src={currentTrack.url}
          controls
          ref={audioNode}
          onCanPlayThroughCapture={() => setCanPlay(true)}
          onPauseCapture={pause}
        >
          <track
            default
            kind="captions"
          />
        </audio>
      </div>
      <SimpleBarReact style={{ width: '100%', maxHeight: '300px' }} scrollableNodeProps={{ ref: scrollNodeRef }}>
        <ul className={style.content}>
          {tracks.length > 0 && tracks.map((track) => (
            <div
              role="button"
              tabIndex={0}
              className={style.track}
              key={track.name}
              onKeyDown={() => handleClick(track.name, track.url)}
              onClick={() => handleClick(track.name, track.url)}
            >
              <li className={style[getLiClassName(track)]}>
                <span>
                  {track.name}
                </span>
                <Link to={{ pathname: track.spotify }} target="_blank" onClick={(e) => e.stopPropagation()}>
                  <img src={spotify} alt="spotify link" width={18} height={18} />
                </Link>
              </li>
            </div>
          ))}
        </ul>

      </SimpleBarReact>
    </div>
  );
};

export default Player;
