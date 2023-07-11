export interface CardType {
  likes: Array<User>;
  owner: User;
  name: string;
  link: string;
  _id: string;
}

export interface User {
  name: string;
  about: string;
  _id?: string;
  avatar?: string;
}
