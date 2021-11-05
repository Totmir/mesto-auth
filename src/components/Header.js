import { Link, Switch, Route, BrowserRouter } from 'react-router-dom'
import headerLogo from '../images/header/header__logo.svg'
import React from 'react'
export default function Header(props) {
  // function setCookie(name, value, days) {
  //   var d = new Date()
  //   d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  //   document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
  // }

  // function deleteCookie(name) {
  //   setCookie(name, '', -1)
  // }

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
                // Удалить куки на сервере
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
