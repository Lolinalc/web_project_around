const profileEditButton = document.querySelector(".profile__edit-button");
const popupNameTitle = document.querySelector(".popup_type_edit");
const popupNameAdd = document.querySelector(".popup_type_add");
const popupAddButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const inputName = document.querySelector("#nombre");
const editForm = document.querySelector(".popup_type_edit .popup__form");
const profileDescription = document.querySelector(".profile__description");
const inputDescription = document.querySelector("#descripcion");
const addForm = document.querySelector(".popup_type_add .popup__form");
const inputTitle = document.querySelector("#title");
const inputLink = document.querySelector("#link");
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
const popupImage = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");

function handleOpenPopup() {
  popupNameTitle.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  document.addEventListener("keydown", escCloseListener);
}

function handleOpenAddPopup() {
  popupNameAdd.classList.add("popup_opened");
  document.addEventListener("keydown", escCloseListener);
}

function handleClosePopup(popup) {
  popup.classList.remove("popup_opened");
  document.addEventListener("keydown", escCloseListener);
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
  cardImage.addEventListener("click", () => {
    popupImage.classList.add("popup_opened");
    const popupImageContent = document.querySelector(".popup__image");
    const popupImageCaption = document.querySelector(".popup__image-title");
    document.addEventListener("keydown", escCloseListener);
    popupImageContent.src = card.link;
    popupImageCaption.textContent = card.name;
  });

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("places__info");

  const cardDescription = document.createElement("p");
  cardDescription.classList.add("places__description");
  cardDescription.textContent = card.name;

  const likeButton = document.createElement("button");
  likeButton.classList.add("places__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("places__like_active");
  });

  cardInfo.append(cardDescription, likeButton);
  cardElement.append(trashButton, cardImage, cardInfo);

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  placesContainer.prepend(cardElement);
}

initialCards.forEach((card) => {
  addCard(card);
});

profileEditButton.addEventListener("click", handleOpenPopup);
popupAddButton.addEventListener("click", handleOpenAddPopup);

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    handleClosePopup(popup);
  });
});

function escCloseListener(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    if (popupOpened) {
      handleClosePopup(popupOpened);
    }
  }
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      handleClosePopup(popup);
    }
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
  const newCard = {
    name: inputTitle.value,
    link: inputLink.value,
  };
  addCard(newCard);
  addForm.reset();
  handleClosePopup(popupNameAdd);
});
