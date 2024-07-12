import { FC } from 'react';
import styles from './player.module.css';
import mockImage from '../../images/image5.jpg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { initBackButton } from '@telegram-apps/sdk';
import { PATH_THEME } from '../app/app';
import { speedValues } from '../../types/types';
const path = require('../../audio/audioFile.mp3');
const pathIOS = 'http://sndup.net/d99zr/d';
const pathAndroid = "https://ia803205.us.archive.org/30/items/The_Offspring_Youre_Gonna_Go_Far_Kid_/The%20Offspring_Youre%20Gonna%20Go%20Far%20Kid%20.ogv";

const track = {
  url: path,
  image: mockImage,
  name: "Название трека",
  theme: "Название темы",
  length: "2:57"
}

const Player: FC = () => {

  const navigate = useNavigate();

  const [backButton] = initBackButton();

  backButton.on('click', () => {
    navigate(PATH_THEME);
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isTrackLoaded, setIsTrackLoaded] = useState(false);
  const [speed, setSpeed] = useState<number>(3);
  const [progress, setProgress] = useState<number>(50);

  const audioElem = useRef<any>();
  /*   const audioElem = useRef(new Audio(path)); */

  const onCanPlayCallback = useCallback(() => {
    setIsTrackLoaded(true);
  }, [isPlaying, track]);

  useEffect(() => {
    if (isTrackLoaded && audioElem.current) {
      if (isPlaying) {
        audioElem.current.play();
      }
      else {
        audioElem.current.pause();
      }
    }
  }, [isPlaying, track, isTrackLoaded]);

  const onPlayClick = () => {
    setIsPlaying(!isPlaying);
  }

  const onSpeedClick = () => {
    if (speed === speedValues.length - 1) {
      setSpeed(0);
    } else {
      setSpeed(speed + 1);
    }
  }

  // Используем useRef для получения ссылки на полосу прокрутки
  const progressBarRef = useRef(null);

  // Функция обработки кликов по полосе прокрутки
  const handleProgressBarClick = (event: any) => {
    // Получаем ширину полосы
    const progressBar: any = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left; // Определяем смещение клика относительно полосы
    const newTime = (clickX / rect.width) * 100;
    setProgress(newTime);
  };

  const content = useMemo(
    () => {
      return (
        <div className={styles["player"]}>
          <audio onCanPlay={onCanPlayCallback} ref={audioElem} preload='auto'>
            <source src={track.url} />
            Your browser does not support the audio tag.
          </audio>
          <img src={track.image} alt="Фото альбома" className={styles["player__item-image"]}></img>
          <div className={styles["player__flex-row"]}>
            <div className={styles["player__text"]}>
              <div className={`${styles["player__name"]} text text_size_l text_weight_regular text_color_main`}>{track.name}</div>
              <div className={`${styles["player__theme"]} text text_size_s text_weight_regular text_color_hint`}>{track.theme}</div>
            </div>
            <button type='button' className={styles["player__speed"]} onClick={onSpeedClick}>
              <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.16677 3.42561C6.02822 2.92823 7.00543 2.66638 8.00016 2.66638C8.99489 2.66638 9.9721 2.92823 10.8336 3.42561C11.695 3.92298 12.4104 4.63836 12.9077 5.49984C13.4051 6.36132 13.6669 7.33853 13.6668 8.33326C13.6668 9.328 13.4049 10.3052 12.9075 11.1666C12.6313 11.6449 12.7952 12.2565 13.2735 12.5327C13.7517 12.8088 14.3633 12.645 14.6395 12.1667C15.3125 11.0012 15.6668 9.67915 15.6668 8.33334C15.6669 6.98753 15.3127 5.66541 14.6398 4.49988C13.9669 3.33436 12.9991 2.36649 11.8336 1.69357C10.6681 1.02065 9.34598 0.666382 8.00016 0.666382C6.65435 0.666382 5.33225 1.02065 4.16674 1.69357C3.00124 2.36649 2.03341 3.33436 1.36054 4.49988C0.68766 5.66541 0.333445 6.98753 0.333496 8.33334C0.333547 9.67915 0.687863 11.0012 1.36083 12.1667C1.637 12.645 2.24859 12.8088 2.72687 12.5327C3.20515 12.2565 3.369 11.6449 3.09283 11.1666C2.59542 10.3052 2.33353 9.328 2.3335 8.33326C2.33346 7.33853 2.59527 6.36132 3.09261 5.49984C3.58996 4.63836 4.30531 3.92298 5.16677 3.42561Z" fill="#007AFF" />
                <path d="M11.3739 6.37377C11.7645 5.98325 11.7645 5.35008 11.3739 4.95956C10.9834 4.56904 10.3502 4.56904 9.95972 4.95956L7.29306 7.62623C6.90253 8.01675 6.90253 8.64992 7.29306 9.04044C7.68358 9.43096 8.31675 9.43096 8.70727 9.04044L11.3739 6.37377Z" fill="#007AFF" />
              </svg>
              <span className={`text text_size_xs text_weight_regular text_color_main`}>{speedValues[speed]}</span>
            </button>
          </div>
          <div className={styles["player__seekbar"]} >
            <div className={styles["player__bar"]} ref={progressBarRef} onClick={handleProgressBarClick}>
              <div className={styles["player__progress"]} style={{ width: `${(progress / 100) * 100}%` }} >
              </div>
            </div>
            <div className={styles["player__seekbar-flex"]}>
              <span className={`text text_size_xxs text_weight_medium text_color_hint`}>00:00</span>
              <span className={`text text_size_xxs text_weight_medium text_color_hint`}>-00:00</span>
            </div>
          </div>
          <div className={styles["player__player-buttons"]}>
            <svg className={styles["player__player-button"]} width="64" height="64" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.3965 33.7275C11.0735 32.9558 11.0735 31.0442 12.3965 30.2724L29.5295 20.2781C30.8629 19.5005 32.5373 20.4621 32.5373 22.0056V31.9028C32.5682 30.9294 33.0638 29.9687 34.0242 29.4087L49.0703 20.6316C51.0703 19.4651 53.5818 20.9077 53.5818 23.2231V40.7768C53.5818 43.0923 51.0703 44.5346 49.0703 43.3681L34.0242 34.5913C33.0638 34.031 32.5682 33.0703 32.5373 32.0969V41.9941C32.5373 43.5378 30.8629 44.4995 29.5295 43.7217L12.3965 33.7275Z" fill="currentColor" />
            </svg>
            {isPlaying ?
              <svg onClick={onPlayClick} className={styles["player__player-button"]} width="64" height="64" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 13C18.7909 13 17 14.7909 17 17V47C17 49.2091 18.7909 51 21 51H25C27.2091 51 29 49.2091 29 47V17C29 14.7909 27.2091 13 25 13H21Z" fill="currentColor" />
                <path d="M39 13C36.7909 13 35 14.7909 35 17V47C35 49.2091 36.7909 51 39 51H43C45.2091 51 47 49.2091 47 47V17C47 14.7909 45.2091 13 43 13H39Z" fill="currentColor" />
              </svg>
              :
              <svg onClick={onPlayClick} className={styles["player__player-button"]} width="64" height="64" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M51.381 29.2153C53.5397 30.453 53.5397 33.547 51.381 34.7847L23.8571 50.5644C21.6984 51.802 19 50.255 19 47.7797L19 16.2202C19 13.745 21.6984 12.198 23.8571 13.4356L51.381 29.2153Z" fill="currentColor" />
              </svg>}

            <svg className={styles["player__player-button"]} width="64" height="64" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M52.5896 33.7275C53.9126 32.9558 53.9126 31.0442 52.5896 30.2724L35.4566 20.2781C34.1233 19.5005 32.4489 20.4621 32.4489 22.0056V31.9028C32.418 30.9294 31.9223 29.9687 30.962 29.4087L15.9159 20.6316C13.9159 19.4651 11.4043 20.9077 11.4043 23.2231V40.7768C11.4043 43.0923 13.9159 44.5346 15.9159 43.3681L30.962 34.5913C31.9223 34.031 32.418 33.0703 32.4489 32.0969V41.9941C32.4489 43.5378 34.1233 44.4995 35.4566 43.7217L52.5896 33.7275Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      )
    },
    [track, isPlaying, speed, progress]
  );

  return (
    <>{content}</>
  );
}

export default Player;
