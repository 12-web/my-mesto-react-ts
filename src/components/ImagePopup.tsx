import { FC, ReactElement } from 'react';

interface ImagePopupProps {
  card: { name: string; link: string };
  onClose: () => void;
}

const ImagePopup: FC<ImagePopupProps> = ({ card, onClose }): ReactElement => {
  return (
    <div className={`popup ${card.link && 'popup_opened'} popup_type_show`}>
      <div className='popup__show-content'>
        <button
          className='popup__close-btn btn'
          type='button'
          title='Закрыть окно'
          onClick={onClose}
        />
        <figure className='popup__img-container'>
          <img className='popup__img' src={card.link} alt={card.name} />
          <figcaption className='popup__caption'>{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
