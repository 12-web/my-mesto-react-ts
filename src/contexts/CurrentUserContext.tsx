import { createContext } from 'react';
import { User } from '../typings/types';

export const CurrentUserContext = createContext<User>({ name: '', about: '' });
