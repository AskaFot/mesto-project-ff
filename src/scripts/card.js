// в файле card.js описаны функции для работы с карточками: 
// функция создания карточки, функции-обработчики 
// событий удаления и лайка карточки;
// import{templateContainer,buttonAdd,buttonLike}from "./index.js";
// import {initialCards} from "./cards.js";

import { templateContainer, cardContainer, editElement, formEdit, buttonEdit, editClose, cardElement, formCard, buttonAdd, cardClose, popupType, popupImage, popupCaption, imgClose, imgOpen} from "./variables.js";
import {initialCards} from "./cards.js";




// @todo: Вывести карточки на страницу
initialCards.forEach((detailsCard) => {
  const cardElement = createCard(detailsCard, removeCard);
  cardContainer.append(cardElement);
});


export function createCard(detailsCard, removeCard, likeCard ) {
   const templateContainer = document.querySelector("#card-template").content; // создает карточку
  const containerElement = templateContainer
    .querySelector(".card")
    .cloneNode(true); // создает клон карточки
  const titleElement = containerElement.querySelector(".card__title");
  const imageElement = containerElement.querySelector(".card__image");

  imageElement.src = detailsCard.link;
  imageElement.alt = detailsCard.name;
  titleElement.textContent = detailsCard.name;
  const buttonDelete = containerElement.querySelector(".card__delete-button"); // кнопка удалить песню
  const buttonLike = containerElement.querySelector('.card__like-button');
  buttonDelete.addEventListener("click", () => removeCard(containerElement));
  buttonLike.addEventListener("click", () => likeCard(buttonLike));
  return containerElement;
}




// @todo: Функция удаления карточки
export function removeCard(element) {
  element.remove(); // Удаляем ТОЛЬКО эту карточку
}

export function likeCard(elementLike) {
  elementLike.classList.toggle("card__like-button_is-active"); 
}