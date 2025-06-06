const profileEditButton = document.querySelector(".profile__edit-button");
const popupNameTitle = document.querySelector(".popup_type_edit");
const popupNameAdd = document.querySelector(".popup_type_add");
const popupAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const inputName = document.querySelector(".popup__input-name");
const editForm = document.querySelector(".popup_type_edit .popup__form");
const profileDescription = document.querySelector(".profile__description");
const inputDescription = document.querySelector(".popup__input-description");
const addForm = document.querySelector(".popup_type_add .popup__form");
const inputTitle = document.querySelector(".popup__input-title");
const inputLink = document.querySelector(".popup__input-link");
const placesContainer = document.querySelector(".places");

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

function handleOpenPopup() {
  popupNameTitle.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function handleOpenAddPopup() {
  popupNameAdd.classList.add("popup_opened");
}

function handleClosePopup(popup) {
  popup.classList.remove("popup_opened");
}

function toggleLike(button) {
  button.classList.toggle("places__like_active");
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function addCard(card) {
  const cardElement = document.createElement("article");
  cardElement.classList.add("places__cards");

  const trashButton = document.createElement("img");
  trashButton.src = "/images/Trash.svg";
  trashButton.classList.add("places__trash");
  trashButton.alt = "Icono de eliminar";

  const cardImage = document.createElement("img");
  cardImage.src = card.link;
  cardImage.classList.add("places__image");
  cardImage.alt = card.name;

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("places__info");

  const cardDescription = document.createElement("p");
  cardDescription.classList.add("places__description");
  cardDescription.textContent = card.name;

  const likeButton = document.createElement("img");
  likeButton.src = "/images/heart.svg";
  likeButton.classList.add("places__like");
  likeButton.alt = "Botón de me gusta";

  cardInfo.append(cardDescription, likeButton);
  cardElement.append(trashButton, cardImage, cardInfo);

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    toggleLike(likeButton);
    likeButton.setAttribute(
      likeButton.classList.contains("places__like_active")
    );
  });

  placesContainer.prepend(cardElement);
}

// Renderizar tarjetas iniciales
initialCards.forEach((card) => {
  addCard(card);
});

// Eventos
profileEditButton.addEventListener("click", handleOpenPopup);
popupAddButton.addEventListener("click", handleOpenAddPopup);

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    handleClosePopup(popup);
  });
});

editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  handleClosePopup(popupNameTitle);
});

addForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!isValidUrl(inputLink.value)) {
    alert("Por favor, introduce un enlace válido para la imagen.");
    return;
  }
  const newCard = {
    name: inputTitle.value,
    link: inputLink.value,
  };
  addCard(newCard);
  addForm.reset();
  handleClosePopup(popupNameAdd);
});
