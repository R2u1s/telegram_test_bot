import React from 'react';
import { FC,useContext,useEffect } from 'react';
import styles from './start.module.css';
import { useNavigate } from 'react-router-dom';
import { PATH_LIST } from '../app/app';
import { StoreContext } from '../../services/store_context';
import { Loader } from '../loader/loader';
import { URL } from '../../utils/constants';
import { TRes } from '../../types/types';
import { request } from '../../utils/api';
import { postEvent } from '@telegram-apps/sdk';

const Start: FC = () => {

  'Telegram' in window && postEvent('web_app_expand');  

  const { store, setStore } = useContext(StoreContext);

  const navigate = useNavigate();

  const onSubmitClick = () => {
    setStore({type:"authRequest"});

    request<TRes>('')
      .then(res => {
        if (res && res.hasOwnProperty("quote")) {
          setStore({type:"authSuccess", action: {user:res.quote}});
        } else {
          setStore({type:"authFailed"});
        }
      })
      .catch(error => {
        setStore({type:"authFailed"});
        console.log(error);
      });
/*     console.log(window.Telegram.WebApp.InitData); */
  }

  useEffect(()=>{
    if (!store.authRequest && !store.authFailed && store.authSuccess) {
      navigate(PATH_LIST);
    }
  },[store.user]);

  return (
    <div className={styles["start"]}>
      <img src={'https://s3-alpha-sig.figma.com/img/5b34/fe6b/2624437e4948c0bcd96201873478a9d5?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QZr7-p9-guWWJcY0ASFdSAis-0Nm1Mr7eEGv6Wzc4jUsZ6J6~UMBtYwIkE3fSYWCNG522wYXNXCXvf30tYBaMVnzHtYPSp8GvD6B5RZhaqghpueo7f-8O~z-8ssmsjAnZ1QA5iUf27Az8KeRUaFuspKYUkx1a-R74VxeiMcSp9sZxBbKyP7ohS9qiXTHgOspPG4EY0xHC5dabv7T8NK~XObvZbjsDfI5vAzeErCEfwq3pl~2SPQac9I323LGSgNp9Y8dcawIhQP~uAU5Lhx1R6KGSoIBCCWWP1utZvieS-tu-UYQuvXJhADI-zenYAKeXfHJpK1bhm-rLcDmyhq4Og__'} alt="картинка" className={styles["start__gif"]} />
      <div className={styles["start__text"]}>
        <h1 className={`${styles["start__title"]} text text_size_l text_weight_medium text_color_main`}>Title</h1>
        <h2 className={`${styles["start__description"]} text text_size_m text_weight_regular text_color_hint`}>Description</h2>
      </div>
      <button type="submit" onClick={onSubmitClick} className={styles['button']}>
        {store.authRequest? <Loader /> : 
         !store.authFailed ?
        <span className={`${styles['button__text']} text text_size_m text_weight_medium text_color_button`}>Action</span> 
        : <span className={`${styles['button__text']} text text_size_m text_weight_medium text_color_button`}>Error</span> 
        }
      </button>
    </div>
  )
}

export default Start;
