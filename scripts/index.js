import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, setPopupEventListeners } from "./utils.js";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Iniciar validación para cada formulario
const forms = document.querySelectorAll(settings.formSelector);
forms.forEach((formElement) => {
  const validator = new FormValidator(settings, formElement);
  validator.enableValidation();
});

// Tarjetas iniciales
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

// Crear y mostrar tarjetas
initialCards.forEach(({ name, link }) => {
  const card = new Card(name, link, "#places__template");
  const cardElement = card.generateCard();
  document.querySelector(".places").prepend(cardElement);
});

// Configurar eventos de los popups
setPopupEventListeners();

// Formularios de edición y adición
const editForm = document.querySelector(".popup_type_edit .popup__form");
const addForm = document.querySelector(".popup_type_add .popup__form");

// Controlar el envío del formulario de edición
editForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevenir recarga
  const nameInput = editForm.querySelector("#nombre");
  const descriptionInput = editForm.querySelector("#descripcion");

  document.querySelector(".profile__name").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent =
    descriptionInput.value;

  closePopup(document.querySelector(".popup_type_edit"));
});

// Controlar el envío del formulario de añadir lugar
addForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevenir recarga
  const titleInput = addForm.querySelector("#title");
  const linkInput = addForm.querySelector("#link");

  const card = new Card(titleInput.value, linkInput.value, "#places__template");
  const cardElement = card.generateCard();
  document.querySelector(".places").prepend(cardElement);

  closePopup(document.querySelector(".popup_type_add"));
  addForm.reset(); // Limpiar formulario después de usar
});
