import React from 'react';
import styles from './loader.module.css';

export const Loader: React.FC = () => {
  return (
    <>
      <div className={`${styles['loader__content']}`}><i></i></div>
    </>
  );
}

