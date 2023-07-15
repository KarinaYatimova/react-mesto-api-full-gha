function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_watch_image ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__content">
        <button
          type="button"
          className="popup__close popup__close-image"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__image-placename">
            {card.name}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
