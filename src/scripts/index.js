// // В файле index.js должны остаться:
// // объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// // обработчики событий (при открытии и закрытии попапов; при отправке форм;
// //   обработчик, открывающий попап при клике по изображению карточки);
// // вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать
// // объявленные здесь переменные и обработчики.

import "../pages/index.css";

import { openPopup, closePopup, clickOvarlay } from "./modal.js";

import {
  editElement,
  formEdit,
  buttonEdit,
  editClose,
  jobtofil,
  namePtofil,
  cardElement,
  buttonAdd,
  cardClose,
  popupType,
  nameInput,
  imgClose,
  cardContainer,
  popupImage,
  popupCaption,
  jobInput,
  profileForm,
  cardForm
} from "./variables.js";

import { initialCards } from "./cards.js";
import { createCard, removeCard, likeCard } from "./card.js";
import {
   showInputError,
  hideInputError,
  isValid,
  setEventListeners,
  enableValidation,
  hasInvalidInput,
  toggleButtonState,
  clearValidation
 } from "validation.js";



// Открытие и закрытие формы редактирования профиля
buttonEdit.addEventListener("click", () => {
  nameInput.value = namePtofil.textContent; // Заполняем инпуты текущими данными
  jobInput.value = jobtofil.textContent;
  openPopup(editElement);
});

editClose.addEventListener("click", () => closePopup(editElement));

// Открытие и закрытие формы создания карточки
buttonAdd.addEventListener("click", () => openPopup(cardElement));
cardClose.addEventListener("click", () => closePopup(cardElement));

// Открытие и закрытие картинки
imgClose.addEventListener("click", () => closePopup(popupType));
// cardContainer.addEventListener('click', openFoto);

// Обработчики форм
formEdit.addEventListener("submit", handleProfileFormSubmit);
cardElement.addEventListener("submit", processesCardCreation);

// @todo: Вывести карточки на страницу
initialCards.forEach((detailsCard) => {
  const cardElement = createCard(detailsCard, removeCard, likeCard, openFoto);
  cardContainer.append(cardElement);
});

// Функция отправки формы
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  namePtofil.textContent = nameInput.value;
  jobtofil.textContent = jobInput.value;

  closePopup(editElement); // Закрываем нужный попап
}

// Функция отправки поста
export function processesCardCreation(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы
  const nameCard = evt.target.querySelector('input[name="place-name"]');
  const fotoCard = evt.target.querySelector('input[name="link"]');

  // Создаём карточку
  const newCard = createCard(
    { name: nameCard.value, link: fotoCard.value },
    removeCard,
    likeCard,
    openFoto
  );
  // Добавляем карточку в контейнер
  cardContainer.prepend(newCard); // prepend - добавляет в начало, append - в конец
  evt.target.reset();
  // Закрываем модальное окно
  const popup = document.querySelector(".popup_is-opened");
  closePopup(popup);
}

// Функция открытия фото
export function openFoto(evt) {
  const clickedImage = evt.target; // Определяем, куда кликнули

  if (clickedImage.classList.contains("card__image")) {
    // Находим карточку, к которой относится изображение
    const card = clickedImage.closest(".card"); // Ищем родителя `.card`
    const cardTitle = card ? card.querySelector(".card__title") : null; // Заголовок карточки

    // Устанавливаем картинку и подпись
    popupImage.src = clickedImage.src;
    popupImage.alt = cardTitle.textContent; // "Фотография";
    popupCaption.textContent = cardTitle.textContent; //"Без описания";
    // Показываем попап
    openPopup(popupType);
  }
}

document.addEventListener("click", clickOvarlay);



// Объект настроек
const validationConfig = {
  formSelector: '.popup__form', // Селектор для форм
  inputSelector: '.popup__input', // Селектор для полей ввода
  submitButtonSelector: '.popup__button', // Селектор для кнопки отправки
  inactiveButtonClass: 'popup__button_disabled', // Класс для неактивной кнопки
  inputErrorClass: 'popup__input_type_error', // Класс для полей с ошибками
  errorClass: 'popup__error_visible' // Класс для сообщения об ошибке
};

// // Включаем валидацию
// enableValidation(validationConfig);

// При открытии формы профиля
clearValidation(profileForm, validationConfig);

// При открытии формы добавления карточки
clearValidation(cardForm, validationConfig);
