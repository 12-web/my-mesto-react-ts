import { FC, ReactElement, FormEvent } from 'react';

interface PopupWithFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  name: string;
  title: string;
  buttonText: string;
  children?: JSX.Element | JSX.Element[];
}

const PopupWithForm: FC<PopupWithFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  buttonText,
  children,
}): ReactElement => {
  return (
    <div className={`popup ${isOpen && 'popup_opened'} popup_type_${name}`}>
      <div className='popup__container'>
        <h2 className='popup__title'>{title}</h2>
        <button
          className='popup__close-btn btn'
          aria-label='Закрыть окно'
          type='button'
          onClick={onClose}
        />
        <form
          onSubmit={onSubmit}
          className='popup__form'
          id={name}
          action='#'
          name={name}
        >
          {children}
          <button
            className='popup__button btn'
            type='submit'
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
