type Headers = {
  authorization: string;
  'Content-Type': string;
};

type Res = {
  ok: boolean;
  status: number;
  json: () => Object;
};
class Api {
  protected _baseUrl: string;
  protected _headers: Headers;

  constructor({ baseUrl, headers }: { baseUrl: string; headers: Headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  // получение овтета на запрос
  _getResponseData<T>(res: Res): Promise<T> {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json() as Promise<T>;
  }

  //отправка запроса и обработка ответа
  async _request<T>(url: string, options: Object): Promise<T> {
    const res = await fetch(`${this._baseUrl}/${url}`, options);
    return res.json() as Promise<T>;
  }

  // получение карточек
  async getInitialCards<Array>(): Promise<Array> {
    return await this._request('cards', {
      headers: {
        authorization: this._headers.authorization,
      },
    });
  }
  // получение информации пользователя
  async getUserInformation<T>(): Promise<T> {
    return await this._request('users/me', {
      headers: {
        authorization: this._headers.authorization,
      },
    });
  }
  // изменение информации пользователя
  async editProfileData<T>(name: string, about: string): Promise<T> {
    return await this._request(`users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  // изменение аватара пользователя
  async editUserAvatar<T>(avatar: string): Promise<T> {
    return await this._request('users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }
  // добавление новой карточки
  async addNewCard<T>(name: string, link: string): Promise<T> {
    return await this._request('cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }
  // удаление карточки
  async deleteCard<T>(id: string): Promise<T> {
    return await this._request(`cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      },
    });
  }
  // изменение статуса лайка
  async changeLikeCardStatus<T>(id: string, isLiked: boolean): Promise<T> {
    const response = await this._request(`cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      },
    });
    return response as Promise<T>;
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '14b13473-1b56-4228-afac-2edb4b448b71',
    'Content-Type': 'application/json',
  },
});

export default api;
