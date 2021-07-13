import headerLogo from '../images/header/header__logo.svg'
export default function Header(props) {
  const checkForHeaderBtn = () => {
    if (!props.loggedIn) {
      return (
        <button
          onClick={() => {
            props.setLoggining(!props.isLoggining)
          }}
          className='header__btn-signin'>
          {props.isLoggining ? 'Регистрация' : 'Войти'}
        </button>
      )
    }
  }
  return (
    <header className='header'>
      <img src={headerLogo} alt='Логотип Места' className='header__logo' />
      {checkForHeaderBtn()}
    </header>
  )
}
