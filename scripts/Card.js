import { openPopup } from "./utils.js";

export default class Card {
  constructor(name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this.cardTemplate = cardTemplate;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this.cardTemplate)
      .content.querySelector(".places__cards")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this.cardElement = this._getCardElement();
    this.trashButton = this.cardElement.querySelector(".places__trash");
    this.cardImage = this.cardElement.querySelector(".places__image");
    this.cardDescription = this.cardElement.querySelector(
      ".places__description"
    );
    this.likeButton = this.cardElement.querySelector(".places__like");

    this.cardDescription.textContent = this._name;
    this.cardImage.src = this._link;
    this._setEventListeners();

    return this.cardElement;
  }

  _setEventListeners() {
    this.trashButton.addEventListener("click", () => {
      this.cardElement.remove();
    });

    this.likeButton.addEventListener("click", () => {
      this.likeButton.classList.toggle("places__like_active");
    });

    this.cardImage.addEventListener("click", () => {
      const popupImage = document.querySelector(".popup_type_image");
      const popupImageContent = popupImage.querySelector(".popup__image");
      const popupImageCaption = popupImage.querySelector(".popup__image-title");

      popupImageContent.src = this._link;
      popupImageContent.alt = this._name;
      popupImageCaption.textContent = this._name;

      openPopup(popupImage);
    });
  }
}
