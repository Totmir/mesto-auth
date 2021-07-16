import Authentication from './Authentication'
import failureImage from '../images/popup/failure.svg'
import { authApi } from '../utils/authApi'

export default function Login(props) {
  const submitHandler = userSignInData => {
    authApi.signInUser(userSignInData).then(res => {
      if (res.token) {
        props.history.push('/')
        localStorage.setItem('token', res.token)
        props.setUserEmail(userSignInData.email)
      } else {
        props.onSubmit({ imgPath: failureImage, text: 'Что-то пошло не так! Попробуйте ещё раз.' })
      }
    })
  }
  return (
    <Authentication
      onSubmit={userSignInData => {
        submitHandler(userSignInData)
      }}
      title='Вход'
      name='Login'
      submitBtnText='Войти'></Authentication>
  )
}
