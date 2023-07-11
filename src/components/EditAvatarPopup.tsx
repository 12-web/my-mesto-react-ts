import { ReactElement, FC, useRef, useContext, FormEvent } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { User } from '../typings/types';

type EditAvatarPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdateAvatar: (avatar: string) => void;
  isFormLoading: boolean;
};

const EditAvatarPopup: FC<EditAvatarPopupProps> = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  isFormLoading,
}): ReactElement => {
  const userAvatar = useContext<User>(CurrentUserContext);
  const avatar = useRef<HTMLInputElement>(null!);

  /** изменение аватара пользователя */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onUpdateAvatar(avatar.current.value);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title='Обновить аватар'
      name='avatar'
      buttonText={isFormLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        ref={avatar}
        defaultValue={userAvatar.avatar}
        className='popup__input popup__input_value_avatar'
        id='avatar'
        type='url'
        name='avatar'
        placeholder='Ссылка на изображение'
        required
      />
      <span className='popup__error avatar-error'></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
