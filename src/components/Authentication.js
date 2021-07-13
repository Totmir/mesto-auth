import closeBtnImage from '../images/popup/close-btn.svg'

export default function Authentication(props) {
  return (
    <div className='authentication appearance'>
      <div className='authentication__container'>
        <h2 className='authentication__title'>{props.title}</h2>
        <form onSubmit={props.onSubmit} className='authentication__form' id={props.name} name={props.name} action='#' method='post'>
          {props.children}
          <button name='submitBtn' className='authentication__submit-btn' type='submit'>
            {props.submitBtnText}
          </button>
        </form>
      </div>
    </div>
  )
}
