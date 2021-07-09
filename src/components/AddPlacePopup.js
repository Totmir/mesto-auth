import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
  const [placeName, setPlacename] = React.useState('')
  const [placeUrl, setPlaceUrl] = React.useState('')
  function handleNameChange(e) {
    setPlacename(e.target.value)
  }
  function handleUrlChange(e) {
    setPlaceUrl(e.target.value)
  }
  return (
    <PopupWithForm
      title='Новое место'
      name='card-renderer'
      isOpen={props.isOpen}
      onSubmit={e => {
        e.preventDefault()
        props.handleAddPlaceSubmit({ name: placeName, url: placeUrl })
      }}
      onClose={props.onClose}
      submitBtnText='Сохранить'>
      <div className='popup__input-wrapper'>
        <input className='popup__input popup__input_data_name' onChange={handleNameChange} value={placeName} placeholder='Название' id='pic-name' name='name' type='text' minLength='2' maxLength='30' autoComplete='off' required />
        <span className='popup__input-error' id='pic-name-error'>
          Вы пропустили это поле.
        </span>
      </div>
      <div className='popup__input-wrapper'>
        <input className='popup__input popup__input_data_description' onChange={handleUrlChange} value={placeUrl} placeholder='Ссылка на картинку' id='url' type='url' name='url' autoComplete='on' required />
        <span className='popup__input-error popup__input-error_description' id='url-error'>
          Введите адрес сайта.
        </span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
