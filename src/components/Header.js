import { Link } from 'react-router-dom'
import headerLogo from '../images/header/header__logo.svg'
export default function Header(props) {
  return (
    <header className='header'>
      <img src={headerLogo} alt='Логотип Места' className='header__logo' />
      <div className='header__verification-container'>
        <span className='header__user-email'>{props.userEmail}</span>
        <Link to='/signin' onClick={() => {}} className='header__btn-signin'>
          Выйти
        </Link>
      </div>
      )
    </header>
  )
}
