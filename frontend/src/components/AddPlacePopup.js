import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardPlaceName, setCardPlaceName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  React.useEffect(() => {
    setCardPlaceName("");
    setCardLink("");
  }, [isOpen]);

  function handleCardNameChange(e) {
    setCardPlaceName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      placeName: cardPlaceName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="popup_add_card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={cardPlaceName || ""}
        onChange={handleCardNameChange}
        name="placename"
        id="placename-input"
        placeholder="Название"
        className="popup__input popup__input_cardname"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error placename-input-error"></span>
      <input
        type="url"
        value={cardLink || ""}
        onChange={handleCardLinkChange}
        name="link"
        id="card-link-input"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_cardlink"
        required
      />
      <span className="popup__input-error card-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
