import { ReactElement, FC, useRef, useContext, FormEvent } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupWithFormType, User } from '../typings/types';

interface EditAvatarPopupProps extends PopupWithFormType {
  onUpdateAvatar: (avatar: string) => void;
}

const EditAvatarPopup: FC<EditAvatarPopupProps> = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  isFormLoading,
}): ReactElement => {
  const { avatar } = useContext<User>(CurrentUserContext);
  const avatarInput = useRef<HTMLInputElement>(null!);

  /** изменение аватара пользователя */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onUpdateAvatar(avatarInput.current.value);
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
        ref={avatarInput}
        defaultValue={avatar}
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
