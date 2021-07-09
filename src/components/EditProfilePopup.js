import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
function EditProfilePopup(props) {
  const submitBtnText = 'Сохранить'
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name)
      setDescription(currentUser.about)
    }
  }, [currentUser])
  function handleChangeName(e) {
    setName(e.target.value)
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }
  function submitHandler(userName, userDescription) {
    props.onUpdateUser({ userName, userDescription })
    setName(userName)
    setDescription(userDescription)
  }
  return (
    <PopupWithForm
      onSubmit={e => {
        e.preventDefault()
        submitHandler(name, description)
      }}
      title='Редактировать профиль'
      name='profile-editor'
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitBtnText={submitBtnText}>
      <div className='popup__input-wrapper'>
        <input className='popup__input popup__input_data_name' value={name} onChange={handleChangeName} id='profile-name' name='name' placeholder='Имя' type='text' minLength='2' maxLength='40' autoComplete='off' required />
        <span className='popup__input-error' id='profile-name-error'>
          Вы пропустили это поле.
        </span>
      </div>
      <div className='popup__input-wrapper'>
        <input className='popup__input popup__input_data_description' value={description} onChange={handleChangeDescription} id='profile-job' name='description' placeholder='Вид деятельности' type='text' minLength='2' maxLength='200' autoComplete='off' required />
        <span className='popup__input-error' id='profile-job-error'>
          Вы пропустили это поле.
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup
