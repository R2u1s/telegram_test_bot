import { FC, useContext } from 'react';
import styles from './theme.module.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../services/store_context';
import { PATH_COURSE, PATH_PLAYER } from '../app/app';
import { initBackButton } from '@telegram-apps/sdk';
import pathImgCourse_5 from '../../images/image5.jpg'
import { ThemeElement } from '../theme-element/theme-element';
import { mockCourses } from '../../utils/mock';
import Progress from '../progress/progress';

/* const pathImgCourse_5 = require('../../images/course_picture_5.jpg'); */

const Theme: FC = () => {

  const { store, setStore } = useContext(StoreContext);

  const navigate = useNavigate();
  const onClick = () => {
    setTimeout(() => { navigate(PATH_PLAYER) }, 100);
  }

  const [backButton] = initBackButton();

  backButton.on('click', () => {
    navigate(PATH_COURSE);
  });

  return (
    <>
      <div className={styles["theme"]}>
        <div className={styles["theme__cover"]} >
          <img src={pathImgCourse_5} alt="" className={styles["theme__bg-image"]}></img>
          <img src={pathImgCourse_5} alt="" className={styles["theme__image"]}></img>
          <div className={styles["theme__cover-flex"]}>
            <div className={styles["theme__cover-info"]}>
              <h2 className={`${styles["theme__title"]} text text_size_xl text_weight_regular text_color_main`}>Название темы</h2>
              <Progress type='time' time={117360} />
            </div>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="60" rx="30" fill="#818181" fill-opacity="0.4" />
              <path d="M40.5 29.1037C41.1667 29.502 41.1667 30.498 40.5 30.8963L25.5 39.8598C24.8333 40.2582 24 39.7602 24 38.9634L24 21.0366C24 20.2398 24.8333 19.7418 25.5 20.1402L40.5 29.1037Z" fill="white" />
            </svg>
          </div>
        </div>
        <ul className={styles["theme__list"]}>
          {mockCourses[0].chapters[0].tracks.map((item, index) => {
            return <ThemeElement id={item.id} index={index + 1} name={item.name} duration={item.duration} done={item.done} callBack={onClick} />
          })}
        </ul>
      </div>
    </>

  )
}

export default Theme;
