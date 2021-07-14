import React from 'react'
import closeBtnImage from '../images/popup/close-btn.svg'
import selectors from '../utils/selectors'

function InfoTooltip(props) {
  const handleOverlayClick = e => {
    if (e.target.classList.contains(selectors.openedPopup)) {
      props.onClose()
    }
  }
  console.log('props============')
  console.log(props)
  const popupClassName = `popup popup_type_${props.name} ${props.isOpen && selectors.openedPopup} appearance`
  return (
    <div onClick={handleOverlayClick} className={popupClassName}>
      <div className='popup__container popup__container_info-tooltip'>
        <img className='popup__result-pic' src={props.popupData && props.popupData.imgPath} />
        <h2 className='popup__title popup__title_margin_none popup__title_text-align-center'>{props.popupData && props.popupData.text}</h2>
        <button onClick={props.onClose} type='button' className='popup__close-btn'>
          <img className='popup__close-pic' src={closeBtnImage} alt='Кнопка закрыть' />
        </button>
      </div>
    </div>
  )
}
export default InfoTooltip
