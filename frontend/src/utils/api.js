// Контроллер запросов
class Api {
  constructor(data) {
    this._url = data.url
  }
  // Получает карточки
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      },
      credentials: 'include'
    }).then(response => {
      return this._checkResponce(response)
    })
  }
  // Получает данные пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      },
      credentials: 'include'
    }).then(response => this._checkResponce(response))
  }
  // Отправляет новую карточку
  addCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.url
      }),
      credentials: 'include'
    })
      .then(response => {
        return response
      })
      .then(response => this._checkResponce(response))
  }
  // Удаляет карточку
  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
      credentials: 'include'
    }).then(response => this._checkResponce(response))
  }
  // Обновляет данные пользователя
  updUserData(profileData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about
      }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(response => {
        return response
      })
      .then(response => this._checkResponce(response))
  }
  // Меняет состояние лайка
  switchLike(isLiked, cardId) {
    if (isLiked) {
      // Уже лайкнут? Удаляет лайк!
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(response => this._checkResponce(response))
    } else {
      // Ещё нет лайка? Добавит лайк
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(response => this._checkResponce(response))
    }
  }
  // Меняет аватар на новый
  updAvatar(newAvatarUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: newAvatarUrl
      }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(response => {
        return response
      })
      .then(response => this._checkResponce(response))
  }
  _checkResponce = response => {
    if (response.ok) {
      return response.json()
    } else {
      return `Ошибка ${response.status}`
    }
  }
}
// export const api = new Api({ url: 'http://api.totfront.nomoredomains.rocks' })
export const api = new Api({ url: 'http://localhost:3001' })
