import Authentication from './Authentication'
import { authApi } from '../utils/authApi'

export default function Login(props) {
  const submitHandler = () => {
    console.log(123)
  }

  return (
    <Authentication
      onSubmit={() => {
        submitHandler()
      }}
      title='Вход'
      name='Login'
      submitBtnText='Войти'></Authentication>
  )
}
