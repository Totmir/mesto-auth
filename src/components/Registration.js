import Authentication from './Authentication'

export default function Registration(props) {
  const handleChange = () => {
    console.log('123============')
    console.log(123)
  }

  return (
    <Authentication title='Регистрация' name='Registration' submitBtnText='Зарегистрироваться'>
      <div className='authentication__input-wrapper'>
        <input onChange={handleChange} placeholder='Email' className='authentication__input' type='text' name='emal' autoComplete='on' required />
        <input onChange={handleChange} placeholder='Пароль' value='Пароль' className='authentication__input' type='text' name='password' autoComplete='on' required />
      </div>
    </Authentication>
  )
}
