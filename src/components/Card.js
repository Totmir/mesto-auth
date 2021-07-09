import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = props.cardData.owner._id === currentUser._id
  const isLiked = props.cardData.likes.some(like => like._id === currentUser._id)

  function handleCardClick() {
    props.onCardClick(props.cardData)
  }
  return (
    <article className='card'>
      <div className='card__pic' onClick={handleCardClick} style={{ backgroundImage: `url(${props.cardData.link})` }}></div>
      <div className='card__inner'>
        <h3 className='card__heading'>{props.cardData.name}</h3>
        <div className='card__like'>
          <button className={isLiked ? 'card__like-btn card__like-btn_active' : 'card__like-btn'} onClick={props.onCardLike}></button>
          <p className='card__like-counter'>{props.cardData.likes.length}</p>
        </div>
      </div>
      <button onClick={props.onCardDelete} className={isOwn ? 'card__trash-btn card__trash-btn_visible' : 'card__trash-btn card__trash-btn_hidden'}></button>
    </article>
  )
}
