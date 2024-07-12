import { FC } from "react";
import styles from './card-horizontal.module.css';
import Progress from '../progress/progress';

export const CardHorizontal: FC<{
  id: string,
  img: string,
  name: string,
  progress: string,
  callBack: () => void
}> = ({ id,img,name,progress,callBack }) => {

  return (
    <li key={id} className={styles["list__card_type_horizontal"]} style={{ backgroundImage: `url(${img})` }} onClick={callBack}>
      <h3 className={`${styles["list__text-horizontal-card"]} text text_size_sm text_weight_medium text_color_white`}>{name}</h3>
      <Progress type='progress' progress={progress} />
    </li>
  )
}