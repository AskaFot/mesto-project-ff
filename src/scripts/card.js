// в файле card.js описаны функции для работы с карточками:
// функция создания карточки, функции-обработчики
// событий удаления и лайка карточки;

import { deleteCardFromServer } from "./API.js";
import { elementCard } from "./variables.js";
import { closePopup } from "./modal.js";

// Функция создания карточки
export function createCard(detailsCard, elementLike, likeCard, openFoto) {
  const currentUser = localStorage.getItem("currentUser"); // Загружаем ID пользователя из локального хранилища
  const templateContainer = document.querySelector("#card-template").content;
  const containerElement = templateContainer
    .querySelector(".card")
    .cloneNode(true);

  containerElement.setAttribute(
    "data-created-by",
    detailsCard.owner ? detailsCard.owner._id : ""
  );
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
  console.log(
    `Создание карточки: ${detailsCard.name}, Владелец: ${
      detailsCard.owner ? detailsCard.owner._id : "неизвестно"
    }`
  );

  // удаление Проверяем, является ли пользователь владельцем карточки

  if (
    detailsCard.owner &&
    String(detailsCard.owner._id).trim() === String(currentUser).trim()
  ) {
    buttonDelete.style.display = "block";
    console.log(`✅ Кнопка удаления показана для карточки ${detailsCard._id}`);
  } else {
    buttonDelete.style.display = "none";
    console.warn(
      `⛔ Кнопка удаления скрыта. ID владельца: ${
        detailsCard.owner ? detailsCard.owner._id : "не найден"
      }, ID текущего пользователя: ${currentUser}`
    );
  }

  buttonDelete.addEventListener("click", (event) => {
    const currentUser = localStorage.getItem("currentUser"); // Загружаем ID текущего пользователя
    handleDeleteCardSubmit(event, detailsCard._id, detailsCard, currentUser);
  });

  // лайк

  // Проверка, поставил ли текущий пользователь лайк
  if (detailsCard.likes.some((like) => like._id === currentUser)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  // Обработчик клика по лайку
  buttonLike.addEventListener("click", () =>
    likeCard(buttonLike, likeCount, detailsCard._id)
  );

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
let currentCardId = null; // Глобальная переменная для хранения ID карточки
let currentCardElement = null; // Глобальная переменная для хранения самого элемента карточки

// Функция обработки клика по кнопке корзины
export function openDeletePopup(cardId, cardElement) {
  currentCardId = cardId; // Сохраняем ID карточки
  currentCardElement = cardElement; // Сохраняем сам элемент карточки

  const deletePopup = document.getElementById("delete-popup");
  deletePopup.style.display = "block"; // Показываем модалку
}

// Функция обработки отправки формы подтверждения удаления
// export  function handleDeleteCardSubmit(event, cardId) {
//   if (event && typeof event.preventDefault === "function") {
//     event.preventDefault();
//   } else {
//     console.error("Ошибка: event не определён");
//     return;
//   }

//   if (!cardId) {
//     console.error("Нет ID карточки для удаления!");
//     return;
//   }

//   deleteCardFromServer(cardId)
//     .then(() => {
//       const cardElement = document.getElementById(cardId);
//       if (cardElement) {
//         cardElement.remove();
//       }
//       // closePopup(document.getElementById("delete-popup"));
//     })
//     .catch(err => console.error("Ошибка при удалении карточки:", err));
// }
// export function handleDeleteCardSubmit(event, cardId, detailsCard) {
//   const currentUser = localStorage.getItem("currentUser"); // Загружаем ID текущего пользователя из localStorage

//   if (event && typeof event.preventDefault === "function") {
//     event.preventDefault();
//   } else {
//     console.error("Ошибка: event не определён");
//     return;
//   }

//   if (!cardId) {
//     console.error("Нет ID карточки для удаления!");
//     return;
//   }

//   // Проверка на существование detailsCard
//   if (!detailsCard || !detailsCard.owner) {
//     console.error("Не удалось найти владельца карточки!");
//     return;
//   }

//   // Проверяем, является ли текущий пользователь владельцем карточки
//   if (detailsCard.owner._id !== currentUser) {
//     console.error("У вас нет прав на удаление этой карточки.");
//     return;
//   }

//   // Если проверка пройдена, отправляем запрос на удаление
//   deleteCardFromServer(cardId)
//     .then(() => {
//       const cardElement = document.getElementById(cardId);
//       if (cardElement) {
//         cardElement.remove(); // Удаляем карточку из DOM
//       }
//       closePopup(document.getElementById("delete-popup"));
//     })
//     .catch(err => console.error("Ошибка при удалении карточки:", err));
// }
export function handleDeleteCardSubmit(event, cardId, detailsCard) {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  } else {
    console.error("Ошибка: event не определён");
    return;
  }

  if (!cardId) {
    console.error("Нет ID карточки для удаления!");
    return;
  }

  const token = localStorage.getItem("authToken"); // Получаем токен из localStorage
  if (!token) {
    console.error("Токен не найден");
    return;
  }

  // Проверка на существование detailsCard
  if (!detailsCard || !detailsCard.owner) {
    console.error("Не удалось найти владельца карточки!");
    return;
  }

  // Проверяем, является ли текущий пользователь владельцем карточки
  const currentUser = localStorage.getItem("currentUser");
  if (detailsCard.owner._id !== currentUser) {
    console.error("У вас нет прав на удаление этой карточки.");
    return;
  }

  // Если проверка пройдена, отправляем запрос на удаление
  fetch(`https://nomoreparties.co/v1/wff-cohort-34/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        const cardElement = document.getElementById(cardId);
        if (cardElement) {
          cardElement.remove(); // Удаляем карточку из DOM
        }
        closePopup(document.getElementById("delete-popup"));
      } else {
        throw new Error("Ошибка при удалении карточки");
      }
    })
    .catch((err) => console.error("Ошибка при удалении карточки:", err));
}

const confirmDeleteButton = document.querySelector(".confirm-delete");
// const currentUser = "1c551ff6-00cc-40b7-b844-b0d2f447e9fe"; // ID текущего пользователя
const cards = document.querySelectorAll(".card");
const deletePopup = document.getElementById("delete-popup");
// const confirmDeleteButton = document.querySelector('.confirm-delete');
const cancelDeleteButton = document.querySelector(".cancel-delete");
//потом в API

document.addEventListener("DOMContentLoaded", () => {
  if (!deletePopup || !confirmDeleteButton || !cancelDeleteButton) {
    console.error("Ошибка: Попап удаления или его кнопки не найдены в DOM!");
    return;
  }

  // Обработчик подтверждения удаления
  confirmDeleteButton.addEventListener("click", () => {
    const cardId = deletePopup.getAttribute("data-card-id");
    if (!cardId) return;

    fetch(`https://nomoreparties.co/v1/wff-cohort-34/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: "1c551ff6-00cc-40b7-b844-b0d2f447e9fe",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
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
        deletePopup.style.display = "none";
      })
      .catch((err) => console.error(err));
  });
});

// Обработчик подтверждения удаления
confirmDeleteButton.addEventListener("click", handleDeleteCardSubmit);

// // // Функция лайка карточки
// Функция для лайка карточки
export function likeCard(buttonLike, likeCount, cardId) {
  // Определяем, был ли лайк уже поставлен
  const isLiked = buttonLike.classList.contains("card__like-button_is-active");

  // Формируем URL для PUT или DELETE запроса
  const url = `https://nomoreparties.co/v1/wff-cohort-34/cards/likes/${cardId}`;

  // Отправляем запрос на сервер
  fetch(url, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      Authorization: "1c551ff6-00cc-40b7-b844-b0d2f447e9fe", // Замените на актуальный токен
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Обновляем количество лайков из ответа сервера
      likeCount.textContent = data.likes.length;
      console.log("Обновленное количество лайков:", likeCount.textContent);

      // Переключаем класс активности для кнопки лайка
      buttonLike.classList.toggle("card__like-button_is-active");

      // Обновляем интерфейс в зависимости от состояния лайка
      if (buttonLike.classList.contains("card__like-button_is-active")) {
        console.log("Лайк поставлен");
      } else {
        console.log("Лайк убран");
      }
    })
    .catch((error) => {
      console.error("Ошибка при обработке лайка:", error);
    });
}

// Получение карточек с сервера
export function fetchCards() {
  fetch("https://nomoreparties.co/v1/wff-cohort-34/cards", {
    method: "GET",
    headers: {
      Authorization: "1c551ff6-00cc-40b7-b844-b0d2f447e9fe",
    },
  })
    .then((res) => res.json())
    .then((cards) => {
      cards.forEach((card) => {
        // Создаем карточку для каждого элемента в списке
        const cardElement = createCard(card);
        document.querySelector(".places__list").append(cardElement);
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке карточек:", error);
    });
}
