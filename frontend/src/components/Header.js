import { Link, Switch, Route, BrowserRouter } from 'react-router-dom'
import { authApi } from '../utils/authApi'
import headerLogo from '../images/header/header__logo.svg'
import React from 'react'
export default function Header(props) {
  return (
    <header className='header'>
      <img src={headerLogo} alt='Логотип Места' className='header__logo' />
      <div className='header__verification-container'>
        <Switch>
          <Route path='/signup'>
            <Link className='header__btn-signin' to='/signin'>
              Вход
            </Link>
          </Route>
          <Route path='/signin'>
            <Link className='header__btn-signin' to='/signup'>
              Регистрация
            </Link>
          </Route>
          <Route path='/'>
            <span className='header__user-email'>{props.userEmail.email}</span>
            <Link
              className='header__btn-signin'
              onClick={() => {
                authApi.signOutUser()
              }}
              to='/signin'>
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  )
}
