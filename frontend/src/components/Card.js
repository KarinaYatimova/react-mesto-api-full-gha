import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((id) => id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element__item item">
      {isOwn && (
        <button
          className="element__remove-button"
          type="reset"
          onClick={handleDeleteClick}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__info">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-counters">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
