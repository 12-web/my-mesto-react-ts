import { useState, useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCard from './ConfirmDeleteCard';
import MainLoader from './MainLoader/MainLoader';
import { CardType, User } from '../typings/types';

import '../index.css';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState<boolean>(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] =
    useState<boolean>(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState<boolean>(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<{
    name: string;
    link: string;
  }>({ name: '', link: '' });
  const [selectedDeleteCardId, setSelectedDeleteCardId] = useState<string>('');
  const [cards, setCards] = useState<Array<CardType>>([]);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [isFormLoading, setFormIsLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>({
    name: '',
    about: '',
    avatar: '',
    _id: '',
  });

  /**
   * функция получения данных для страницы (данные пользователя и карточки)
   */

  const getPageInfo = async (): Promise<void> => {
    setIsPageLoading(true);
    try {
      const userData: {
        name: '';
        about: '';
        avatar: '';
        _id: '';
      } = await api.getUserInformation();
      const cardsList: Array<CardType> = await api.getInitialCards();
      setCurrentUser(userData);
      setCards(cardsList);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPageLoading(false);
    }
  };

  /** добавление данных пользователя и карточек при загрузке страницы */
  useEffect(() => {
    getPageInfo();
  }, []);

  /**
   * функция добавления новой картчочки
   * @param {string} name - название карточки
   * @param {string} link - ссылка на картинку карточки
   */

  const handleAddPlaceSubmit = async ({
    title: name,
    link,
  }: {
    link: string;
    title: string;
  }): Promise<void> => {
    setFormIsLoading(true);
    try {
      const newCard: CardType = await api.addNewCard(name, link);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.error(error);
    } finally {
      setFormIsLoading(false);
    }
  };

  /**
   * изменение данных пользователя и закрытие модального окна
   * @param {string} name - имя пользователя
   * @param {string} about - род деятельности пользователя
   */
  const handleUpdateUser = async ({
    name,
    about,
  }: {
    name: string;
    about: string;
  }): Promise<void> => {
    setFormIsLoading(true);
    try {
      const userData: User = await api.editProfileData(name, about);
      setCurrentUser(userData);
      closeAllPopups();
    } catch (error) {
      console.error(error);
    } finally {
      setFormIsLoading(false);
    }
  };

  /**
   * изменение аватара и закрытие модального окна
   * @param {string} avatar - ссылка на картинку (аватар пользователя)
   */
  const handleUpdateAvatar = async (avatar: string): Promise<void> => {
    setFormIsLoading(true);
    try {
      const userData: User = await api.editUserAvatar(avatar);
      setCurrentUser(userData);
      closeAllPopups();
    } catch (error) {
      console.error(error);
    } finally {
      setFormIsLoading(false);
    }
  };

  /**
   * изменение статуса лайка и количества лайков
   * @param {Array} card.likes - массив лайков карточки
   * @param {string} card._id - идентификатор карточки
   */
  const handleCardLike = async (card: CardType): Promise<void> => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    try {
      const newCard = await api.changeLikeCardStatus<CardType>(
        card._id,
        !isLiked
      );
      setCards(cards => cards.map(c => (c._id === card._id ? newCard : c)));
      closeAllPopups();
    } catch (error) {
      console.error(error);
    } finally {
      setFormIsLoading(false);
    }
  };

  /**
   * открытие попапа редактирования аватара
   */
  const handleEditAvatarClick = (): void => setIsEditAvatarPopupOpen(true);

  /**
   * открытие попапа редактирования профиля
   */
  const handleEditProfileClick = (): void => setIsEditProfilePopupOpen(true);

  /**
   * открытие попапа редактирования профиля
   */
  const handleAddPlaceClick = (): void => setIsAddPlacePopupOpen(true);

  /**
   * открытие модального окна подтверждения удаления карточки
   * @param {string} id
   */
  const handleCardDeleteClick = (id: string): void => {
    setIsDeleteCardPopupOpen(true);
    setSelectedDeleteCardId(id);
  };

  /**
   * удаление карточки и закрытие модального окна
   * @param {string} id - идентификатор карточки
   */
  const handleCardDelete = async (id: string): Promise<void> => {
    setFormIsLoading(true);
    try {
      await api.deleteCard(id);
      setCards(cards => cards.filter(card => card._id !== id));
      closeAllPopups();
    } catch (error) {
      console.error(error);
    } finally {
      setFormIsLoading(false);
    }
  };

  /**
   * функция закрытия всех модальных окон и обнуление значения выбранной карточки
   */
  const closeAllPopups = (): void => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  };

  /**
   * нажатие на карточку с открытие модального окна просмотра карточки
   * @param {string} name - имя карточки
   * @param {string} link - ссылка на картинку карточки
   */
  const handleCardClick = ({ name, link }: CardType): void =>
    setSelectedCard({ name: name, link: link });

  return (
    <div className='root'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        {isPageLoading ? (
          <MainLoader />
        ) : (
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
            cards={cards}
          />
        )}
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup
          isFormLoading={isFormLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isFormLoading={isFormLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isFormLoading={isFormLoading}
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmDeleteCard
          isFormLoading={isFormLoading}
          cardId={selectedDeleteCardId}
          onConfirmDelete={handleCardDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
