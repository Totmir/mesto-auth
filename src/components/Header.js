import headerLogo from '../images/header/header__logo.svg'

export default function Header() {
  return (
    <header className='header'>
      <img src={headerLogo} alt='Логотип Места' className='header__logo' />
      {/* TODO: 1. Передать пропсом имя кнопки */}
      <button className='header__btn-signin'>Регистрация</button>
    </header>
  )
}
