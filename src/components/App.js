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
import Login from './Login'
import { Route, Switch, withRouter, useHistory } from 'react-router-dom'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import { authApi } from '../utils/authApi'

const initialPopupState = { isEditAvatarPopupOpen: false, isEditProfilePopupOpen: false, isAddPlacePopupOpen: false, isOverviewPopupOpen: false, isInfoTooltipPopupOpen: false }

function App(props) {
  const [popupState, setPopupState] = useState(initialPopupState)
  const [infoTooltipData, setInfoTooltipData] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)
  const [userData, setUserData] = useState(null)
  const [cardsData, setCardsData] = useState([])
  // isSignedIn можно оптимизировать. Сейчас используется только для условного отображения футера
  const [isSignedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState(null)
  const [headerBtnData, setHeaderBtnData] = useState(null)

  let history = useHistory()
  // TODO:
  // 1. Переделать, когда будет автоматическая верификация

  useEffect(() => {
    const jwt = localStorage.getItem('token')
    Promise.all([api.getUserData(), api.getCards()])
      .then(([userData, cardsData]) => {
        setUserData(userData)
        setCardsData(cardsData)
      })
      .catch(err => {
        console.log(err + ' && Ошибка при получении данных пользователя / Ошибка при получении карточек')
      })
    authApi
      .checkToken(jwt)
      .then(res => {
        if (res.data) {
          console.log('Верифицирован!')
          setUserEmail(res.data.email)
          history.push('/')
        } else {
          history.push('signin')
        }
      })
      .catch(err => {
        console.warn(err + ' && Ошибка при проверке токена пользователя')
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
        <Header
          setHeaderBtnData={newHeaderBtnData => {
            setHeaderBtnData(newHeaderBtnData)
          }}
          headerBtnData={headerBtnData}
          history={history}
          userEmail={{ email: userEmail, setUserEmail: setUserEmail }}
        />
        <Switch>
          <Route path='/signin'>
            <Login
              history={history}
              onSubmit={popupData => {
                setPopupState({ ...popupState, isInfoTooltipPopupOpen: true })
                setInfoTooltipData(popupData)
              }}
              setHeaderBtnData={btnData => {
                setUserEmail(btnData.email)
                setHeaderBtnData(btnData)
              }}
              setUserEmail={email => {
                setUserEmail(email)
              }}
              setSignedIn={userEmail => {
                setUserEmail(userEmail)
                setLoggedIn(true)
              }}
            />
          </Route>
          <Route path='/signup'>
            <Register
              history={history}
              onSubmit={popupData => {
                setPopupState({ ...popupState, isInfoTooltipPopupOpen: true })
                setInfoTooltipData(popupData)
              }}
              setHeaderBtnData={() => {
                setHeaderBtnData()
              }}
            />
          </Route>
          <Route path='*'>
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
          </Route>
        </Switch>
        {/* <PopupWithForm title='Вы уверены?' name='delete-card' /> */}
        {isSignedIn && <Footer />}
        <InfoTooltip popupData={infoTooltipData} isOpen={popupState.isInfoTooltipPopupOpen} onClose={closeAllPopups} />
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

export default withRouter(App)
