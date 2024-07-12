import { FC, useContext } from 'react';
import styles from './course.module.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../services/store_context';
import { PATH_LIST, PATH_THEME } from '../app/app';
import { initBackButton } from '@telegram-apps/sdk';
import Progress from '../progress/progress';
import { CourseElement } from '../course-element/course-element';
import { mockCourses } from '../../utils/mock';
const pathImgCourse_1 = require('../../images/image3.jpg');
const pathImgCourse_2 = require('../../images/image2.jpg');
const pathImgCourse_3 = require('../../images/image4.jpg');
const pathImgCourse_4 = require('../../images/image1.jpg');
const pathImgCourse_5 = require('../../images/image5.jpg');

const Course: FC = () => {

  const { store, setStore } = useContext(StoreContext);

  const navigate = useNavigate();

  const onClick = () => {
    setTimeout(() => { navigate(PATH_THEME) }, 100);
  }

  const [backButton] = initBackButton();

  backButton.on('click', () => {
    navigate(PATH_LIST);
  });

  return (
    <>
      <div className={styles["course"]}>
        <img src={pathImgCourse_4} alt="" className={styles["course__image-fullwidth"]}></img>
        <div className={styles["course__text"]}>
          <h2 className={`${styles["course__title"]} text text_size_xl text_weight_bold text_color_main`}>Какое-то название курса например</h2>
          <Progress type='time' time={117360} />
          <h3 className={`${styles["course__section-title"]} text text_size_xs text_weight_regular text_color_hint text_style_uppercase`}>о курсе</h3>
          <p className={`${styles["course__section-description"]} text text_size_m text_weight_regular text_color_main`}>Описание курса. Создание покупателя охватывает процесс планирования и жизненный цикл продукции изменяет социометрический фактор коммунны. Рекламное сообщество допускает системный анализ, а лидерство продаж оценено позитивно.</p>
          <h3 className={`${styles["course__section-title"]} text text_size_xs text_weight_regular text_color_hint text_style_uppercase`}>главы</h3>
          <ul className={styles["course__theme-list"]}>
            {mockCourses[0].chapters.map((item) => {
              return <CourseElement id={item.id} img={pathImgCourse_4} name={item.name} duration={item.duration} done={item.done} callBack={onClick} />
            })}
          </ul>
        </div>
      </div>
    </>

  )
}

export default Course;
