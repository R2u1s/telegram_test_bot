import { FC } from "react";
import styles from './course-element.module.css';
import Progress from '../progress/progress';

export const CourseElement: FC<{
  id: string,
  img: string,
  name: string,
  duration: number,
  done: boolean
  callBack: () => void
}> = ({ id, img, name, duration, done, callBack }) => {

  return (
    <>
      <li key={id} className={styles["course__theme"]} onClick={callBack}>
        <div className={styles["course__image-layout"]}>
          <img src={img} alt="" className={styles["course__theme-icon"]}></img>
        </div>
        <div className={styles["course__theme-text"]}>
          <h4 className={`${styles["course__theme-title"]} text text_size_m text_weight_regular text_color_main text_overflow_one`}>{name}</h4>
          {done ? <Progress type='done' /> : <Progress type='time' time={duration} />}
        </div>
        <svg className={'course__divider'} width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2929 15.2929C21.6834 14.9024 22.3166 14.9024 22.7071 15.2929L27.7071 20.2929C28.0976 20.6834 28.0976 21.3166 27.7071 21.7071L22.7071 26.7071C22.3166 27.0976 21.6834 27.0976 21.2929 26.7071C20.9024 26.3166 20.9024 25.6834 21.2929 25.2929L25.5858 21L21.2929 16.7071C20.9024 16.3166 20.9024 15.6834 21.2929 15.2929Z" fill="#707579" />
        </svg>
      </li>
      <li className={styles["course__divider"]}></li>
    </>
  )
}