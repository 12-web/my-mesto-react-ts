import {
  useState,
  useEffect,
  useContext,
  FormEvent,
  ChangeEvent,
  FC,
  ReactElement,
} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { User } from '../typings/types';

type EditProfilePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  isFormLoading: boolean;
  onUpdateUser: (userData: User) => void;
};

const EditProfilePopup: FC<EditProfilePopupProps> = ({
  isOpen,
  onClose,
  onUpdateUser,
  isFormLoading,
}): ReactElement => {
  const [userData, setUserData] = useState({ name: '', about: '' });

  const currentUser = useContext<User>(CurrentUserContext);

  /**
   * добавление данных пользователя при загрузке страницы
   */
  useEffect(() => {
    setUserData({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, isOpen]);

  /**
   * функция отправки формы при которой обновляются данные в профиле
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onUpdateUser(userData);
  };

  /**
   * функция получения данных из формы
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title='Редактировать профиль'
      name='edit'
      buttonText={isFormLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        className='popup__input popup__input_value_name'
        id='edit-name'
        type='text'
        name='name'
        placeholder='Имя'
        minLength={2}
        maxLength={40}
        value={userData.name}
        onChange={handleChange}
        required
      />
      <span className='popup__error edit-name-error'></span>
      <input
        className='popup__input popup__input_value_profession'
        id='edit-profession'
        type='text'
        name='about'
        placeholder='Род деятельности'
        minLength={2}
        maxLength={200}
        value={userData.about}
        onChange={handleChange}
        required
      />
      <span className='popup__error edit-name-error'></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
