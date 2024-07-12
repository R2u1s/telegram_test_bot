import { FC, useContext } from 'react';
import styles from './progress.module.css';
import { TProgress } from '../../types/types';

const Progress: FC<TProgress> = ({ type, progress, time }) => {

  function convertSeconds(seconds: number | undefined) {

    let minutess: number = 0;
    let hours: number = 0;

    if (seconds) {
      minutess = Math.floor(seconds / 60);
      hours = Math.floor(minutess / 60);
      minutess = minutess % 60;
    }

    return {
      hours: hours,
      minutes: minutess
    };
  }

  return (
    <>
      {type === 'done' &&
        <div className={styles["progress__flex-flow_row"]}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1827 3.32544C14.6058 3.75935 14.6058 4.46287 14.1827 4.89679L6.59937 12.6746C6.1763 13.1085 5.49037 13.1085 5.0673 12.6746L1.8173 9.34123C1.39423 8.90731 1.39423 8.2038 1.8173 7.76988C2.24037 7.33597 2.9263 7.33597 3.34937 7.76988L5.83333 10.3175L12.6506 3.32544C13.0737 2.89152 13.7596 2.89152 14.1827 3.32544Z" fill="#007AFF" />
          </svg>
          <span className={`text text_size_xs text_weight_regular text_color_hint`}>Пройден</span>
        </div>
      }
      {type === 'progress' &&
        <div className={styles["progress__flex-flow_row"]}>
          <svg className={`text_color_hint`} width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M11 2L6.55556 5.42857H4V10.5714H6.55556L11 14V2Z" fill="currentColor" />
            </g>
          </svg>
          <span className={`text text_size_xs text_weight_regular text_color_hint`}>{`${progress}% прослушано`}</span>
        </div>
      }
      {type === 'time' &&
        <div className={styles["progress__flex-flow_row"]}>
          <svg className={`text_color_hint`} width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M11 2L6.55556 5.42857H4V10.5714H6.55556L11 14V2Z" fill="currentColor" />
            </g>
          </svg>
          <span className={`text text_size_xs text_weight_regular text_color_hint`}>{convertSeconds(time).hours > 0 && convertSeconds(time).hours} ч {convertSeconds(time).minutes} м</span>
        </div>
      }
    </>

  )
}

export default Progress;
