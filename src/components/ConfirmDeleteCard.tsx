import PopupWithForm from './PopupWithForm';
import { FC, FormEvent, ReactElement } from 'react';
import { PopupWithFormType } from '../typings/types';

interface ConfirmDeleteCardProps extends PopupWithFormType {
  onConfirmDelete: (cardId: string) => void;
  cardId: string;
}

const ConfirmDeleteCard: FC<ConfirmDeleteCardProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  cardId,
  isFormLoading,
}): ReactElement => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onConfirmDelete(cardId);
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      title='Вы уверены?'
      name='delete-confirm'
      buttonText={isFormLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default ConfirmDeleteCard;
