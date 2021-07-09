import headerLogo from '../images/header/header__logo.svg'

export default function Header() {
  return (
    <header className='header'>
      <img src={headerLogo} alt='Логотип Места' className='header__logo' />
    </header>
  )
}
