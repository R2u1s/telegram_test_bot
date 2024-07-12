import { FC } from "react";
import styles from './card-vertical.module.css';
import Progress from '../progress/progress';

export const CardVertical: FC<{
  id: string,
  img: string,
  name: string,
  duration: number,
  description: string,
  done: boolean
  callBack: () => void
}> = ({ id, img, name, duration, description, done, callBack }) => {

  return (
    done ?
      <li key={id} className={styles["list__card_type_vertical_done"]} onClick={callBack}>
        <div className={styles["list__image-layout"]}>
          <img src={img} alt="" className={styles["list__theme-icon"]}></img>
        </div>
        <div className={styles["list__course-text"]}>
          <h3 className={`${styles["list__theme-title"]} text text_size_m text_weight_medium text_color_main text_overflow_two`}>{name}</h3>
          <div className={styles["list__progress-background"]}>
            {done ? <Progress type='done' /> : <Progress type='time' time={duration} />}
          </div>
        </div>
      </li>
      :
      <li key={id} className={styles["list__card_type_vertical"]} onClick={callBack}>
        <img src={img} alt="" className={styles["list__image-fullwidth"]}></img>
        <div className={styles["list__text-vertical-card"]}>
          <h3 className={`${styles["list_text-vertical-card-title"]} text text_size_m text_weight_medium text_color_main text_overflow_one`}>{name}</h3>
          <p className={`${styles["list_text-vertical-card-description"]} text text_size_s text_weight_regular text_color_hint text_overflow_two`}>{description}</p>
          {done ? <Progress type='done' /> : <Progress type='time' time={duration} />}
        </div>
      </li>
  )
}