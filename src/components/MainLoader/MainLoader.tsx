import { FC, ReactElement } from 'react';
import styles from './MainLoader.module.scss';

const Loader: FC = (): ReactElement => {
  return (
    <div className={styles['loader__container']}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
