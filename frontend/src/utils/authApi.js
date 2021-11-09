class AuthApi {
  constructor(data) {
    this._url = data.url
  }
  registerNewUser(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email, password)
    }).then(response => this._checkResponce(response))
  }
  signInUser(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email, password)
    }).then(response => this._checkResponce(response))
  }
  signOutUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(response => this._checkResponce(response))
  }
  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then(response => {
      return this._checkResponce(response)
    })
  }
  _checkResponce = response => {
    if (response.ok) {
      return response.json()
    } else {
      return `Ошибка ${response.status}`
    }
  }
}
export const authApi = new AuthApi({ url: 'https://api.totfront.nomoredomains.rocks' })
// FOR LOCAL TESTING:
// export const authApi = new AuthApi({ url: 'http://localhost:3001' })
