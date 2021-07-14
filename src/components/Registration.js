import Authentication from './Authentication'
import { authApi } from '../utils/authApi'
import successImage from '../images/popup/success.svg'
import failureImage from '../images/popup/failure.svg'

export default function Registration(props) {
  const handleSubmit = userSignUpData => {
    authApi.registerNewUser(userSignUpData).then(res => {
      if (res !== 'Ошибка 400') {
        props.onSubmit({ imgPath: successImage, text: 'Вы успешно зарегистрировались!' })
      } else {
        props.onSubmit({ imgPath: failureImage, text: 'Что-то пошло не так! Попробуйте ещё раз.' })
      }
    })
  }
  return (
    <Authentication
      onSubmit={userSignUpData => {
        //создает запрос и обрабатывает ответ с сервера
        handleSubmit(userSignUpData)
      }}
      title='Регистрация'
      name='Registration'
      submitBtnText='Зарегистрироваться'></Authentication>
  )
}
