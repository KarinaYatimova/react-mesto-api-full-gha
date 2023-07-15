import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      job: description,
    });
  }

  return (
    <PopupWithForm
      name="popup_edit_profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={name || ""}
        onChange={handleNameChange}
        name="name"
        id="name-input"
        placeholder="Имя"
        className="popup__input popup__input_profilename"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        type="text"
        value={description || ""}
        onChange={handleDescriptionChange}
        name="job"
        id="job-input"
        placeholder="О себе"
        className="popup__input popup__input_profilejob"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
