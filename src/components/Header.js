import { Link } from 'react-router-dom'
import headerLogo from '../images/header/header__logo.svg'
import React, { useEffect } from 'react'
export default function Header(props) {
  const signUpBtnData = {
    handler: function () {},
    historyPath: '/signup',
    text: 'Регистрация'
  }
  const signInBtnData = {
    handler: function () {},
    historyPath: '/signin',
    text: 'Войти'
  }
  const signedInBtnData = {
    handler: function () {
      localStorage.removeItem('token')
    },
    historyPath: '/signin',
    text: 'Выйти'
  }
  useEffect(() => {
    if (props.history.location.pathname == '/') {
      props.setHeaderBtnData(signedInBtnData)
    }
    if (props.history.location.pathname == '/signin') {
      props.setHeaderBtnData(signUpBtnData)
    }
    if (props.history.location.pathname == '/signup') {
      props.setHeaderBtnData(signInBtnData)
    }
  }, [])

  return (
    <header className='header'>
      <img src={headerLogo} alt='Логотип Места' className='header__logo' />
      <div className='header__verification-container'>
        {props.headerBtnData && (
          <>
            <span className='header__user-email'>{props.userEmail.email}</span>
            <Link
              to={props.headerBtnData.historyPath}
              onClick={() => {
                props.headerBtnData.handler()
                props.userEmail.setUserEmail(null)
              }}
              className='header__btn-signin'>
              {props.headerBtnData && props.headerBtnData.text}
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
