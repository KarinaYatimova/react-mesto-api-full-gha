import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(avatarRef.current.value);
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup_edit_avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_cardlink"
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
