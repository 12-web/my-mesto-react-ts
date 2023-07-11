import { useContext, FC, ReactElement } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardType, User } from '../typings/types';

type CardProps = {
  onCardClick: ({ name, link }: CardType) => void;
  onCardLike: (card: CardType) => void;
  onCardDelete: (id: string) => void;
  card: CardType;
};

const Card: FC<CardProps> = ({
  onCardClick,
  onCardLike,
  onCardDelete,
  card,
}): ReactElement => {
  const { _id } = useContext<User>(CurrentUserContext);
  const isLiked = card.likes.some(like => like._id === _id);
  const isOwner = card.owner._id === _id;

  /**
   * функция нажатия на карточку с открытием попапа просмотра карточки
   */
  const handleCardClick = () => onCardClick(card);

  /**
   * функция нажатия на кнопку лайка
   */
  const handleLikeClick = () => onCardLike(card);

  /**
   * функция нажатия на кнопку удаления
   */
  const handleDeleteClick = () => onCardDelete(card._id);

  return (
    <li className='journey__item'>
      <button
        type='button'
        className='journey__img-btn btn'
        title='Посмотреть фото'
        onClick={handleCardClick}
      >
        <img className='journey__img' src={card.link} alt={card.name} />
      </button>
      {isOwner && (
        <button
          onClick={handleDeleteClick}
          type='button'
          className='journey__delete-btn btn'
          title='Удалить'
        />
      )}
      <div className='journey__description'>
        <h2 className='journey__title'>{card.name}</h2>
        <div className='journey__like-container'>
          <button
            onClick={handleLikeClick}
            type='button'
            className={`journey__like-btn ${
              isLiked && 'journey__like-btn_active'
            } btn`}
            title='Оценить'
          />
          <span className='journey__like-digit'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
