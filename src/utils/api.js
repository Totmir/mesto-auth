// Контроллер запросов
class Api {
  constructor(data) {
    this._url = data.url
    this._token = data.token
  }
  // Получает карточки
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
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
      }
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
      })
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
      }
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
      }
    })
      .then(response => {
        return response
      })
      .then(response => this._checkResponce(response))
  }
  // Меняет состояние лайка
  switchLike(cardId, isLiked) {
    if (isLiked) {
      // Уже лайкнут? Удаляет лайк!
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      }).then(response => this._checkResponce(response))
    } else {
      // Ещё нет лайка? Добавит лайк
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
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
      }
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
export const api = new Api({ token: 'f470df2e-c67b-482b-ae5d-65b776a618c9', url: 'https://mesto.nomoreparties.co/v1/cohort-23' })
