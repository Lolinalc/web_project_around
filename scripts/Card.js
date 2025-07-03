const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

class Card {
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
      const popupImage = document.querySelector(".popup__image-container");
      popupImage.style.display = "flex";
    });
  }
}

initialCards.forEach(function ({ name, link }) {
  const card = new Card(name, link, "#places__template");
  const cardElement = card.generateCard();
  const places = document.querySelector(".places");
  places.prepend(cardElement);
});
