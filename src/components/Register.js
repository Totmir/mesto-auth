import Authentication from './Authentication'

export default function Register(props) {
  return (
    <Authentication
      onSubmit={userSignUpData => {
        props.onSubmit(userSignUpData)
      }}
      title='Sign Up'
      name='Register'
      submitBtnText='Зарегистрироваться'></Authentication>
  )
}
