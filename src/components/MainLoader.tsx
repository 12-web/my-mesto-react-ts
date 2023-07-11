import { FC, ReactElement } from 'react';
import './MainLoader.css';

const Loader: FC = (): ReactElement => {
  return (
    <div className='loader__container'>
      <div className='loader'></div>
    </div>
  );
};

export default Loader;
