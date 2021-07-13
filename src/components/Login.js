import Authentication from './Authentication'

export default function Login(props) {
  const handleChange = e => {
    console.log('============')
    console.log(e.target.value)
  }

  return (
    <Authentication title='Вход' name='Login' submitBtnText='Войти'>
      <div className='authentication__input-wrapper'>
        <input id='avatar-upd-input' onChange={handleChange} className='authentication__input' placeholder='Email' type='text' name='email' autoComplete='on' required />
        <input id='avatar-upd-input' onChange={handleChange} className='authentication__input' placeholder='Пароль' type='text' name='password' autoComplete='on' required />
      </div>
    </Authentication>
  )
}
