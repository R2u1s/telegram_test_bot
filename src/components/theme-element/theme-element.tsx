import { FC } from "react";
import styles from './theme-element.module.css';

export const ThemeElement: FC<{
  id: string,
  index: number,
  name: string,
  duration: number,
  done: boolean
  callBack: () => void
}> = ({ id, name, index, duration, done, callBack }) => {

  function convertSeconds(totalSeconds: number | undefined) {

    let minutess: number = 0;
    let seconds: number = 0;

    if (totalSeconds) {
      minutess = Math.floor(totalSeconds / 60);
      seconds = totalSeconds % 60;
    }

    return {
      minutes: minutess,
      seconds: seconds
    };
  }

  return (
    <li key={id} className={styles["theme__theme"]} onClick={callBack}>
      <div className={styles["theme__islistened"]}>
        {done && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1827 3.32544C14.6058 3.75935 14.6058 4.46287 14.1827 4.89679L6.59937 12.6746C6.1763 13.1085 5.49037 13.1085 5.0673 12.6746L1.8173 9.34123C1.39423 8.90731 1.39423 8.2038 1.8173 7.76988C2.24037 7.33597 2.9263 7.33597 3.34937 7.76988L5.83333 10.3175L12.6506 3.32544C13.0737 2.89152 13.7596 2.89152 14.1827 3.32544Z" fill="#007AFF" />
        </svg>}
      </div>
      <div className={`${styles["theme__number"]}`}>
        <span className={`text text_size_xs text_weight_regular text_color_hint`}>{index}</span>
      </div>
      <h3 className={`${styles["theme__track-name"]} text text_size_m text_weight_regular text_color_main`}>{name}</h3>
      <span className={`text text_size_xs text_weight_regular text_color_hint`}>{convertSeconds(duration).minutes}:{convertSeconds(duration).seconds}</span>
    </li>
  )
}