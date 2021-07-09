import React from 'react'
import editBtnImage from '../images/profile/profile__edit-btn.svg'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)
  return (
    <main>
      <section className='profile'>
        <button
          onClick={props.onEditAvatar}
          className='profile__avatar-btn'
          style={
            currentUser
              ? {
                  backgroundImage: `url(${currentUser.avatar})`
                }
              : null
          }></button>
        <div className='profile__info'>
          <h1 className='profile__name'>{currentUser ? currentUser.name : 'Имя пользователя'}</h1>
          <button onClick={props.onEditProfile} type='button' className='profile__edit-btn'>
            <img className='profile__edit-pic' src={editBtnImage} alt='Редактировать' />
          </button>
          <p className='profile__description'>{currentUser ? currentUser.about : 'Описание'}</p>
        </div>
        <button onClick={props.onAddPlace} type='button' className='profile__add-btn'></button>
      </section>
      <section className='cards'>
        {props.cardsData
          ? props.cardsData.map((card, idx) => {
              return (
                <Card
                  onCardClick={cardData => {
                    props.onCardClick(cardData)
                    props.onOverviewPopup()
                  }}
                  onCardLike={() => {
                    props.handleCardLike(card)
                  }}
                  onCardDelete={() => {
                    props.handleCardDelete(card)
                  }}
                  cardData={card}
                  key={card._id}
                />
              )
            })
          : null}
      </section>
    </main>
  )
}

export default Main
