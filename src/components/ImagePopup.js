import React from 'react'
import closeBtnImage from '../images/popup/close-btn.svg'
import selectors from '../utils/selectors'

function ImagePopup(props) {
  const closePopup = () => {
    props.onClose()
  }
  const handleOverlayClick = e => {
    if (e.target.classList.contains(selectors.openedPopup)) {
      closePopup()
    }
  }
  const handleClosePopupBtnClick = () => {
    closePopup()
  }
  const popupClassName = `popup overview ${props.isOpen && selectors.openedPopup} appearance`
  return (
    <div onClick={handleOverlayClick} className={popupClassName} id='overview'>
      <div className='overview__container'>
        <img className='overview__pic' src={props.card && props.card.link} alt='Фото пейзажа' />
        <figcaption className='overview__caption'>{props.card && props.card.name}</figcaption>
        <button onClick={handleClosePopupBtnClick} type='button' className='popup__close-btn'>
          <img className='popup__close-pic' src={closeBtnImage} alt='Кнопка закрыть' />
        </button>
      </div>
    </div>
  )
}

export default ImagePopup
