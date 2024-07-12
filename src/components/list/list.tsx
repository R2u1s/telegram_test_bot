import { FC, useContext, useCallback } from 'react';
import styles from './list.module.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../services/store_context';
import { PATH_COURSE, PATH_MAIN } from '../app/app';
import { mockCourses } from '../../utils/mock';
import { CardHorizontal } from '../card-horizontal/card-horizontal';
import { CardVertical } from '../card-vertical/card-vertical';
import { initBackButton } from '@telegram-apps/sdk';
const pathImgCourse_1 = require('../../images/image3.jpg');
const pathImgCourse_2 = require('../../images/image2.jpg');
const pathImgCourse_3 = require('../../images/image4.jpg');
const pathImgCourse_4 = require('../../images/image1.jpg');

const List: FC = () => {

  const { store, setStore } = useContext(StoreContext);

  const navigate = useNavigate();

  const onCardClick = useCallback(() => {
    setTimeout(()=>{navigate(PATH_COURSE);},100);
  }, []);

  const [backButton] = initBackButton();

  backButton.on('click',()=>{
    navigate(-1);
  });

  return (
    <>
      <div className={styles["list"]}>
        <h2 className={`${styles["list__title"]} text text_size_sm text_weight_medium text_color_main`}>Продолжить</h2>
        <ul className={styles["list__slider_type_horizontal"]}>
          {mockCourses.filter(item => item.progress !== '0').map((item) => {
            return <CardHorizontal id={item.id} img={pathImgCourse_1} name={item.name} progress={item.progress} callBack={onCardClick} />
          })}
        </ul>
        <h2 className={`${styles["list__title"]} text text_size_sm text_weight_medium text_color_main`}>Продолжить</h2>
        <ul className={styles["list__slider_type_vertical"]}>
          {mockCourses.filter(item => item.progress === '0' || item.done).map((item) => {
            return <CardVertical id={item.id} img={pathImgCourse_4} name={item.name} description={item.description} duration={item.duration} done={item.done} callBack={onCardClick}  />
          })}

        </ul>
      </div>
    </>

  )
}

export default List;
