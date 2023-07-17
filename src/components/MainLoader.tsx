import { FC, ReactElement } from 'react';
import './MainLoader.scss';

const Loader: FC = (): ReactElement => {
  return (
    <div className='loader__container'>
      <div className='loader'></div>
    </div>
  );
};

export default Loader;
