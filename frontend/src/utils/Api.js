class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  //проверка запроса
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //запрос информации о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //запрос на редактирование данных
  editUserInfo({ name, job }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //запрос на редактированиe аватара
  editUserAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //запрос карточек
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //запрос на добавление новой карточки
  addNewCard({ placeName, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: placeName,
        link: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //запрос на удаление карточки
  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //запрос на лайк
  addLikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //запрос на удаление лайка
  removeLikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //запрос на статус
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLikeCard(id);
    } else {
      return this.removeLikeCard(id);
    }
  }
}

const api = new Api({
  baseUrl: "http://localhost:4000",
});

export default api;
