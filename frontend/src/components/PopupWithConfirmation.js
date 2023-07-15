import PopupWithForm from "./PopupWithForm";

function PopupWithСonfirmation({ isOpen, onClose, onCardDeleteСonfirmation }) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDeleteСonfirmation();
  }

  return (
    <PopupWithForm
      name="popup_remove_card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Да"
      onSubmit={handleSubmit}
    />
  );
}

export default PopupWithСonfirmation;
