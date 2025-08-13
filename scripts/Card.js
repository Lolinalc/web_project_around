export default class Card {
  constructor(
    data,
    cardTemplate,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this.cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this.cardTemplate)
      .content.querySelector(".places__cards")
      .cloneNode(true);
    return cardElement;
  }

  getId() {
    return this._id;
  }

  updateLikes() {
    if (this._isLiked) {
      this.likeButton.classList.add("places__like_active");
    } else {
      this.likeButton.classList.remove("places__like_active");
    }
  }

  removeCard() {
    this.cardElement.remove();
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
    this.cardImage.alt = this._name;
    this._setEventListeners();

    this.updateLikes(this._likes);

    return this.cardElement;
  }

  _setEventListeners() {
    this.trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this);
    });

    this.likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked, this);
    });

    this.cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
