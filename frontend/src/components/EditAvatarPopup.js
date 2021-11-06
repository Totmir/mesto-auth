import React from 'react'
import PopupWithForm from './PopupWithForm'
function EditAvatarPopup(props) {
  const [url, setUrl] = React.useState('')
  function handleChange(e) {
    setUrl(e.target.value)
  }
  return (
    <PopupWithForm
      onSubmit={e => {
        e.preventDefault()
        props.onUpdateAvatar(url)
      }}
      title='Обновить аватар'
      name='avatar-updater'
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitBtnText='Сохранить'>
      <div className='popup__input-wrapper'>
        <input id='avatar-upd-input' onChange={handleChange} value={url} className='popup__input popup__input_avatar popup__input_data_description' placeholder='Ссылка на картинку' type='url' name='url' autoComplete='on' required />
        <span id='avatar-upd-input-error' className='popup__input-error popup__input-error_description popup__input-error_avatar'>
          Введите адрес картинки.
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
