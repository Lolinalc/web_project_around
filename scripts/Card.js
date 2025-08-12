export default class Card {
  constructor(
    name,
    link,
    handleCardClick,
    id,
    _isLiked,
    ownerId,
    cardTemplate
  ) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._id = id;
    this._isLiked = false;
    this._ownerId = ownerId;
    this._createdAt = createdAt;
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
      this._handleCardClick(this._name, this._link);
    });
  }
}
