import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupWithConfirmationOpen, setIsPopupWithConfirmationOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardDelete, setSelectedCardDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete() {
    api
      .removeCard(selectedCardDelete._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== selectedCardDelete._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, job }) {
    api
      .editUserInfo({ name, job })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editUserAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ placeName, link }) {
    api
      .addNewCard({ placeName, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDeleteClick(card) {
    setSelectedCardDelete(card);
    setIsPopupWithConfirmationOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsPopupWithConfirmationOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsInfoTooltip(true);
        navigate("/sign-in");
        handleInfoTooltipClick();
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip(false);
        handleInfoTooltipClick();
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setUserData(email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    auth
      .checkToken(jwt)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setUserData(data.email);
          navigate("/");
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  }

  useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header loggedIn={loggedIn} userData={userData} signOut={signOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                />
              }
            />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="*" element={<h2>Not found</h2>} />
          </Routes>

          <Footer />
        </div>

        <InfoTooltip
          status={isInfoTooltip}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithConfirmation
          isOpen={isPopupWithConfirmationOpen}
          onClose={closeAllPopups}
          onCardDeleteСonfirmation={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
