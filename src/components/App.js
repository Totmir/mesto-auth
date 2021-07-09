import React, { useState, useEffect } from 'react'
import '../index.css'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import { api } from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

const initialPopupState = { isEditAvatarPopupOpen: false, isEditProfilePopupOpen: false, isAddPlacePopupOpen: false, isOverviewPopupOpen: false }

function App() {
  const [popupState, setPopupState] = useState(initialPopupState)
  const [selectedCard, setSelectedCard] = useState(null)
  const [userData, setUserData] = useState(null)
  const [cardsData, setCardsData] = useState([])
  // const currentUser = React.useContext(CurrentUserContext)

  useEffect(() => {
    Promise.all([api.getUserData(), api.getCards()])
      .then(([userData, cardsData]) => {
        setUserData(userData)
        setCardsData(cardsData)
      })
      .catch(err => {
        console.log(err + ' && Ошибка при получении данных пользователя / Ошибка при получении карточек')
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === userData._id)
    api
      .switchLike(card._id, isLiked)
      .then(newCard => {
        const newCards = cardsData.map(c => (c._id === card._id ? newCard : c))
        setCardsData(newCards)
      })
      .catch(err => {
        console.log(err + ' && Ошибка при изменении лайка')
      })
  }
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const getDeletedCard = item => {
          return item._id !== card._id
        }
        setCardsData(cardsData.filter(getDeletedCard))
      })
      .catch(err => {
        console.log(err + ' && Ошибка при удалении карточки')
      })
  }
  const handleCardClick = cardData => {
    setSelectedCard(cardData)
  }
  const closeAllPopups = () => {
    setPopupState(initialPopupState)
    setSelectedCard(null)
  }
  const handleUpdateUser = newUserData => {
    api
      .updUserData({ name: newUserData.userName, about: newUserData.userDescription })
      .then(newUserData => {
        setUserData(newUserData)
        closeAllPopups()
      })
      .catch(err => {
        console.log(err + ' && Ошибка при изменении данных пользователя')
      })
  }
  const handleUpdateAvatar = avatarUrl => {
    api
      .updAvatar(avatarUrl)
      .then(newUserData => {
        setUserData(newUserData)
        closeAllPopups()
      })
      .catch(err => {
        console.log(err + ' && Ошибка при изменении аватара пользователя')
      })
  }
  const handleAddPlaceSubmit = newPlace => {
    api
      .addCard(newPlace)
      .then(newCardData => {
        setCardsData([newCardData, ...cardsData])
        closeAllPopups()
      })
      .catch(err => {
        console.log(err + ' && Ошибка при добавления нового места')
      })
  }
  return (
    <CurrentUserContext.Provider value={userData}>
      <div>
        <Header />
        <Main
          updCardsData={newCardsData => {
            setCardsData(newCardsData)
          }}
          handleCardLike={card => handleCardLike(card)}
          handleCardDelete={card => handleCardDelete(card)}
          cardsData={cardsData}
          onEditAvatar={() => {
            setPopupState({ ...popupState, isEditAvatarPopupOpen: true })
          }}
          onEditProfile={() => {
            setPopupState({ ...popupState, isEditProfilePopupOpen: true })
          }}
          onAddPlace={() => {
            setPopupState({ ...popupState, isAddPlacePopupOpen: true })
          }}
          onOverviewPopup={() => {
            setPopupState({ ...popupState, isOverviewPopupOpen: true })
          }}
          onCardClick={handleCardClick}
        />
        <Footer />
        {/* <PopupWithForm title='Вы уверены?' name='delete-card' /> */}
        <EditAvatarPopup onUpdateAvatar={avatarUrl => handleUpdateAvatar(avatarUrl)} isOpen={popupState.isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup
          onUpdateUser={newUserData => {
            handleUpdateUser(newUserData)
          }}
          isOpen={popupState.isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup isOpen={popupState.isAddPlacePopupOpen} onClose={closeAllPopups} handleAddPlaceSubmit={newPlace => handleAddPlaceSubmit(newPlace)} />
        <ImagePopup card={selectedCard} isOpen={popupState.isOverviewPopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
