import { FC, ReactElement } from 'react';
import styles from './Header.module.scss';
// import headerLogo from '../images/logo-light.svg';

const Header: FC = (): ReactElement => {
  return (
    <header className={styles.header}>
      <img src='' alt='Логотип Местро' className={styles.logo} />
    </header>
  );
};

export default Header;
