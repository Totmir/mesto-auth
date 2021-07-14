import Authentication from './Authentication'
import { authApi } from '../utils/authApi'
import failureImage from '../images/popup/failure.svg'

export default function Login(props) {
  const submitHandler = userSignInData => {
    authApi.signInUser(userSignInData).then(res => {
      if (res.token) {
        console.log(props.history)
        props.setSignedIn(userSignInData.email)
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
