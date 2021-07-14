class AuthApi {
  constructor(data) {
    this._url = data.url
  }
  // Регистрирует нового пользователя
  // Получает параметрами объект из строк {почта, пароль}
  registerNewUser(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email, password)
    }).then(response => this._checkResponce(response))
  }
  _checkResponce = response => {
    if (response.ok) {
      return response.json()
    } else {
      return `Ошибка ${response.status}`
    }
  }
}
export const authApi = new AuthApi({ token: '5e559c15-de0a-4477-8c57-88e7261a19c8', url: 'https://auth.nomoreparties.co' })
