import Authentication from './Authentication'
import failureImage from '../images/popup/failure.svg'

export default function Login(props) {
  return (
    <Authentication
      onSubmit={userSignInData => {
        props.onSubmit({ imgPath: failureImage, text: 'Wrong login/password' }, userSignInData)
      }}
      title='Sign In'
      name='Login'
      submitBtnText='Sign In'></Authentication>
  )
}
