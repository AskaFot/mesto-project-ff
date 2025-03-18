// в файле card.js описаны функции для работы с карточками: 
// функция создания карточки, функции-обработчики 
// событий удаления и лайка карточки;

import { deleteCardFromServer} from './API.js';
import {elementCard} from "./variables.js";



// Функция создания карточки
export function createCard(detailsCard, currentUser, likeCard, openFoto) {
  const templateContainer = document.querySelector("#card-template").content;
  const containerElement = templateContainer.querySelector(".card").cloneNode(true);

  containerElement.setAttribute("data-created-by", detailsCard.owner ? detailsCard.owner._id : ""); 
  containerElement.id = detailsCard._id;

  const titleElement = containerElement.querySelector(".card__title");
  const imageElement = containerElement.querySelector(".card__image");
  const buttonDelete = containerElement.querySelector(".card__delete-button");
  const buttonLike = containerElement.querySelector(".card__like-button");
  const likeCount = containerElement.querySelector(".card__like-count");

  imageElement.src = detailsCard.link;
  imageElement.alt = detailsCard.name;
  titleElement.textContent = detailsCard.name;
  likeCount.textContent = detailsCard.likes.length;

  console.log(`Создание карточки: ${detailsCard.name}, Владелец: ${detailsCard.owner ? detailsCard.owner._id : "неизвестно"}`);

  if (detailsCard.owner && detailsCard.owner._id === currentUser) {
    buttonDelete.style.display = "block";
  } else {
    buttonDelete.style.display = "none";
  }
  buttonDelete.addEventListener("click", () => {
    removeCard(containerElement); // Передаем конкретный DOM-элемент
  });
  buttonLike.addEventListener("click", () => likeCard(buttonLike, likeCount));
  // buttonDelete.addEventListener("click", () => removeCard(containerElement));
  imageElement.addEventListener("click", openFoto);

  return containerElement;
}



// Функция удаления карточки
export function removeCard(elementCard) {
  if (elementCard instanceof HTMLElement) {
    console.log(`🗑 Удаление карточки ID: ${elementCard.id}`);
    elementCard.remove();
  } else {
    console.error("❌ removeCard получил не DOM-элемент!", elementCard);
  }
}



// Функция удаления карточки с подтверждением
let currentCardId = null;  // Глобальная переменная для хранения ID карточки
let currentCardElement = null;  // Глобальная переменная для хранения самого элемента карточки

// Функция обработки клика по кнопке корзины
export function openDeletePopup(cardId, cardElement) {
  currentCardId = cardId;  // Сохраняем ID карточки
  currentCardElement = cardElement;  // Сохраняем сам элемент карточки
  
  const deletePopup = document.getElementById("delete-popup");
  deletePopup.style.display = "block";  // Показываем модалку
}

// Функция обработки отправки формы подтверждения удаления
export function handleDeleteCardSubmit(event) {
  event.preventDefault();  // Отменяем стандартное поведение формы (перезагрузку страницы)

  // Если нет ID карточки, не делаем ничего
  if (!currentCardId) {
    console.error("Нет информации о карточке для удаления!");
    return;
  }

  // Отправляем запрос на удаление карточки
  deleteCardFromServer(currentCardId)
    .then(() => {
      // Удаляем карточку со страницы, если удаление с сервера прошло успешно
      if (currentCardElement) {
        currentCardElement.remove();  // Удаляем карточку с DOM
      }

      // Закрываем модалку
      const deletePopup = document.getElementById("delete-popup");
      deletePopup.style.display = "none";

      // Очищаем глобальные переменные
      currentCardId = null;
      currentCardElement = null;
    })
    .catch(err => {
      console.error("Ошибка при удалении карточки:", err);
    });
}


//потом в API

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = "1c551ff6-00cc-40b7-b844-b0d2f447e9fe"; // ID текущего пользователя
  const cards = document.querySelectorAll('.card');
  const deletePopup = document.getElementById('delete-popup');
  const confirmDeleteButton = document.querySelector('.confirm-delete');
  const cancelDeleteButton = document.querySelector('.cancel-delete');

  if (!deletePopup || !confirmDeleteButton || !cancelDeleteButton) {
    console.error("Ошибка: Попап удаления или его кнопки не найдены в DOM!");
    return;
  }

  // Обработчик подтверждения удаления
  confirmDeleteButton.addEventListener('click', () => {
    const cardId = deletePopup.getAttribute('data-card-id');
    if (!cardId) return;
  
    fetch(`https://nomoreparties.co/v1/wff-cohort-34/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer token",
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        const cardElement = document.getElementById(cardId);
        if (cardElement) {
          cardElement.remove(); // Удаляем карточку из DOM
        }
        deletePopup.style.display = 'none';
      })
      .catch(err => console.error(err));
  });
})
  


// Функция лайка карточки
export function likeCard(elementLike, likeCount) {
  // Переключаем класс активности лайка (добавляем или убираем "закрашенный" стиль)
  elementLike.classList.toggle("card__like-button_is-active");

  // Получаем текущее количество лайков из элемента, преобразуем в число
  let currentLikes = parseInt(likeCount.textContent, 10); // '10' означает десятичную систему счисления

  // Проверяем, активен ли класс "лайкнутой" кнопки
  if (elementLike.classList.contains("card__like-button_is-active")) {
    // Если кнопка активна (лайк поставлен), увеличиваем количество лайков на 1
    likeCount.textContent = currentLikes + 1;
  } else {
    // Если кнопка не активна (лайк убран), уменьшаем количество лайков на 1
    likeCount.textContent = currentLikes - 1;
  }
}