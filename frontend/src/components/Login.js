import Authentication from './Authentication'
import failureImage from '../images/popup/failure.svg'

export default function Login(props) {
  return (
    <Authentication
      onSubmit={userSignInData => {
        props.onSubmit({ imgPath: failureImage, text: 'Что-то пошло не так! Попробуйте ещё раз.' }, userSignInData)
      }}
      title='Вход'
      name='Login'
      submitBtnText='Войти'></Authentication>
  )
}
