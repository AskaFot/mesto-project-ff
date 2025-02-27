// // В файле index.js должны остаться:
// // объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// // обработчики событий (при открытии и закрытии попапов; при отправке форм; 
// //   обработчик, открывающий попап при клике по изображению карточки);
// // вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать 
// // объявленные здесь переменные и обработчики.


import "../pages/index.css";
import "./card.js";
import { createCard, removeCard } from './card.js';
import {initialCards} from "./cards.js";
// import {buttonEdit} from "./modal.js";
import { openModal, closeModal } from "./modal.js";


// @todo: Темплейт карточки
export const templateContainer = document.querySelector("#card-template").content; // создает карточку

// @todo: DOM узлы
export const popupElement = document.querySelector('.popup'); // div opup
export const formElement = popupElement.querySelector('.popup__form'); // форма 
export const buttonEdit = document.querySelector('.profile button');
export const container = document.querySelector(".content"); // главный контейнер
export const cardContainer = container.querySelector(".places__list"); // список куда будут добавляться карточки
export const buttonAdd = document.querySelector(".profile__add-button"); // кнопка добавить карту
// export const buttonDelete = document.querySelector(".card__delete-button"); // кнопка удалить песню
export const buttonLike = cardContainer.querySelector(".card__like-button"); // кнопка лайкнуть карту
export const buttonClose = popupElement.querySelector('.popup__close');


// @todo: Вывести карточки на страницу
initialCards.forEach((detailsCard) => {
  const cardElement = createCard(detailsCard, removeCard);
  cardContainer.append(cardElement);
});



