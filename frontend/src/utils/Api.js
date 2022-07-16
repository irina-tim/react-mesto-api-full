class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._options.baseUrl + "/cards", {
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse).then(({data}) => data);
  }

  getUserData() {
    return fetch(this._options.baseUrl + "/users/me", {
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse).then(({data}) => data);
  }

  updateUserInfo(userName, userAbout) {
    return fetch(this._options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    }).then(this._checkResponse).then(({data}) => data);
  }

  updateUserAvatar(url) {
    return fetch(this._options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse).then(({data}) => data);
  }

  _addLike(cardId) {
    return fetch(this._options.baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse).then(({data}) => data);
  }

  _removeLike(cardId) {
    return fetch(this._options.baseUrl + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse).then(({data}) => data);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._addLike(cardId) : this._removeLike(cardId);
  }

  addNewCard(cardName, cardLink) {
    return fetch(this._options.baseUrl + "/cards", {
      method: "POST",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._checkResponse).then(({data}) => data);
  }

  deleteCard(cardId) {
    return fetch(this._options.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._options.headers,
      credentials: 'include',
    }).then(this._checkResponse).then(({data}) => data);
  }

  updateToken(token) {
    this._options.headers['Authorization'] = `Bearer ${token}`;
  }
}

const token = localStorage.getItem('jwt');

export const api = new Api({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  credentials: 'include',
});
