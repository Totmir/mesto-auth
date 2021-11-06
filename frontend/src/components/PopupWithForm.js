import React from 'react'
import closeBtnImage from '../images/popup/close-btn.svg'
import selectors from '../utils/selectors'

function PopupWithForm(props) {
  const handleOverlayClick = e => {
    if (e.target.classList.contains(selectors.openedPopup)) {
      props.onClose()
    }
  }
  const popupClassName = `popup popup_type_${props.name} ${props.isOpen && selectors.openedPopup} appearance`
  return (
    <div onClick={handleOverlayClick} className={popupClassName}>
      <div className='popup__container'>
        <h2 className='popup__title'>{props.title}</h2>
        <form onSubmit={props.onSubmit} className='popup__form' id={props.name} name={props.name} action='#' method='post'>
          {props.children}
          <button name='submitBtn' className='popup__save-btn' type='submit'>
            {props.submitBtnText}
          </button>
        </form>
        <button onClick={props.onClose} type='button' className='popup__close-btn'>
          <img className='popup__close-pic' src={closeBtnImage} alt='Кнопка закрыть' />
        </button>
      </div>
    </div>
  )
}
export default PopupWithForm
