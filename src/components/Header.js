import { Link } from 'react-router-dom'
import headerLogo from '../images/header/header__logo.svg'
export default function Header(props) {
  return (
    <header className='header'>
      <img src={headerLogo} alt='Логотип Места' className='header__logo' />
      {props.loggedIn && (
        <Link
          to='/register'
          onClick={() => {
            props.setLoggining(!props.isLoggining)
          }}
          className='header__btn-signin'>
          {props.isLoggining ? 'Регистрация' : 'Войти'}
        </Link>
      )}
    </header>
  )
}
