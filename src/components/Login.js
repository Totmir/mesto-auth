import Authentication from './Authentication'

export default function Login(props) {
  const handleChange = () => {
    console.log('123============')
    console.log(123)
  }

  return (
    <Authentication onClose={props.onClose} title='Вход' name='Login' submitBtnText='Войти'>
      <div className='authentication__input-wrapper'>
        <input id='avatar-upd-input' onChange={handleChange} value='Email' className='authentication__input authentication__input_data_name' placeholder='Ссылка на картинку' type='url' name='url' autoComplete='on' required />
        <span id='avatar-upd-input-error' className='authentication__input-error authentication__input-error_description'>
          Введите адрес электронной почты.
        </span>
        <input id='avatar-upd-input' onChange={handleChange} value='Пароль' className='authentication__input authentication__input_data_description' placeholder='Ссылка на картинку' type='url' name='url' autoComplete='on' required />
        <span id='avatar-upd-input-error' className='authentication__input-error authentication__input-error_description'>
          Введите пароль.
        </span>
      </div>
    </Authentication>
  )
}
