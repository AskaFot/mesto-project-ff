// // В файле index.js должны остаться:
// // объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// // обработчики событий (при открытии и закрытии попапов; при отправке форм;
// //   обработчик, открывающий попап при клике по изображению карточки);
// // вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать
// // объявленные здесь переменные и обработчики.

import "../pages/index.css";

import { openPopup, closePopup, clickOvarlay, handleEscape } from "./modal.js";

import {
  editElement,
  formEdit,
  buttonEdit,
  editClose,
  aboutPtofil,
  namePtofil,
  cardElement,
  buttonAdd,
  cardClose,
  popupType,
  nameInput,
  imgClose,
  cardContainer,
  popupImage,
  placeInput,
  linkInput,
  placePtofil,
  linkPtofil,
  popupCaption,
  jobInput,
  profileForm,
  formCard,
  cardForm,
  popupValidation,
} from "./variables.js";

// import { initialCards } from "./cards.js";
import {
  createCard,
  handleDeleteCardSubmit,
  fetchCards,
  removeCard,
  likeCard,
  openDeletePopup,
} from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserData,
  getCards,
  createCardsApi,
  editingProfileApi,
} from "./API.js";

// Открытие и закрытие формы редактирования профиля
buttonEdit.addEventListener("click", () => {
  nameInput.value = namePtofil.textContent; // Заполняем инпуты текущими данными
  jobInput.value = aboutPtofil.textContent;
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
// initialCards.forEach((detailsCard) => {
//   const cardElement = createCard(detailsCard, removeCard, likeCard, openFoto);
//   cardContainer.append(cardElement);
// });

// Функция отправки формы
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  namePtofil.textContent = nameInput.value;
  aboutPtofil.textContent = jobInput.value;

  closePopup(editElement); // Закрываем нужный попап
}

// Функция отправки поста
export function processesCardCreation(evt) {
  evt.preventDefault();
  const nameCard = evt.target.querySelector('input[name="place-name"]').value;
  const fotoCard = evt.target.querySelector('input[name="link"]').value;

  // Отправляем данные на сервер
  createCardsApi(nameCard, fotoCard)
    .then((cardData) => {
      const newCard = createCard(
        card,
        handleDeleteCardSubmit,
        likeCard,
        openFoto
      ); // Используем данные с сервера
      cardContainer.prepend(newCard); // Добавляем в начало
      evt.target.reset();
      closePopup(document.querySelector(".popup_is-opened"));
    })
    .catch((err) => console.error("Ошибка создания карточки:", err));
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

// // Объект настроек
const validationConfig = {
  formSelector: ".popup__form", // Селектор для форм
  inputSelector: ".popup__input", // Селектор для полей ввода
  submitButtonSelector: ".popup__button", // Селектор для кнопки отправки
  inactiveButtonClass: "popup__button_disabled", // Класс для неактивной кнопки
  inputErrorClass: "popup__input_type_error", // Класс для полей с ошибками
  errorClass: "popup__error_visible", // Класс для сообщения об ошибке
};

//  Включаем валидацию
enableValidation(validationConfig);

popupValidation.addEventListener("submit", function (evt) {
  evt.preventDefault(); // предотвратить перезагрузку страницы

  // Очищаем значения в полях
  placeInput.value = "";
  linkInput.value = "";

  // Очищаем ошибки валидации
  clearValidation(formCard, validationConfig);
});

//редактирование профиля API
editElement.addEventListener("submit", function (evt) {
  evt.preventDefault(); // Предотвращаем перезагрузку страницы

  const newName = nameInput.value;
  const newAbout = jobInput.value;

  // Отправляем запрос на обновление профиля
  editingProfileApi(newName, newAbout)
    .then((userData) => {
      // Обновляем интерфейс
      namePtofil.textContent = userData.name;
      aboutPtofil.textContent = userData.about;
    })
    .catch((err) => console.error("Ошибка обновления профиля:", err));
});

document.addEventListener("DOMContentLoaded", () => {
  getUserData()
    .then((userData) => {
      namePtofil.textContent = userData.name;
      aboutPtofil.textContent = userData.about;
    })
    .catch((err) => console.error("Ошибка загрузки профиля:", err));
});

//6. Добавление новой карточки

//Грузим данные и карточки вместе
Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    console.log("Данные пользователя:", userData);
    console.log("Карточки:", cards);

    // Отображаем данные пользователя
    document.querySelector(".popup__input_type_name").textContent =
      userData.name;
    document.querySelector(".popup__input_type_description").textContent =
      userData.about;
    document.querySelector(".profile__image").src = userData.avatar;

    // Передаём _id пользователя для рендера карточек
    renderCards(cards, userData._id);
  })
  .catch((err) => {
    console.error("Ошибка загрузки данных:", err);
  });

function renderCards(cards, userId) {
  const cardsContainer = document.querySelector(".places__list"); // Сюда добавляем карточки
  cardsContainer.innerHTML = ""; // Очищаем контейнер перед рендерингом

  cards.forEach((card) => {
    const cardElement = createCard(
      card,
      handleDeleteCardSubmit,
      likeCard,
      openFoto
    );
    cardsContainer.append(cardElement); // Добавляем в DOM
  });
}

// //УДАЛЕНИЕ КАРТЫ
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser"); // Загружаем ID текущего пользователя
  const deletePopup = document.getElementById("delete-popup");
  const confirmDeleteButton = document.querySelector(".confirm-delete");
  const cancelDeleteButton = document.querySelector(".cancel-delete");

  if (!deletePopup || !confirmDeleteButton || !cancelDeleteButton) {
    console.error("Ошибка: Попап удаления или его кнопки не найдены в DOM!");
    return;
  }

  let currentCardId = null;
  let currentCardElement = null;

  // Функция открытия попапа удаления
  function openDeletePopup(cardElement) {
    currentCardId = cardElement.id;
    currentCardElement = cardElement;
    deletePopup.style.display = "block";
    deletePopup.setAttribute("data-card-id", currentCardId);
  }

  // Обработчик на кнопку удаления
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("card__delete-button")) {
      const cardElement = event.target.closest(".card");
      if (cardElement) {
        openDeletePopup(cardElement);
      }
    }
  });

  // Подтверждение удаления карточки
  confirmDeleteButton.addEventListener("click", () => {
    if (!currentCardId) return;

    fetch(`https://nomoreparties.co/v1/wff-cohort-34/cards/${currentCardId}`, {
      method: "DELETE",
      headers: {
        Authorization: "1c551ff6-00cc-40b7-b844-b0d2f447e9fe",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
        return res.json();
      })
      .then(() => {
        if (currentCardElement) {
          currentCardElement.remove();
        }
        deletePopup.style.display = "none";
        currentCardId = null;
        currentCardElement = null;
      })
      .catch((err) => console.error("Ошибка при удалении:", err));
  });

  // Отмена удаления
  cancelDeleteButton.addEventListener("click", () => {
    deletePopup.style.display = "none";
    currentCardId = null;
    currentCardElement = null;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetchCards();
});

//аватар

document.addEventListener("DOMContentLoaded", function () {
  const avatarImage = document.querySelector(".profile__image");
  const editAvatarIcon = document.querySelector(".profile__edit-button"); // Исправлено на правильный класс
  const avatarPopup = document.getElementById("avatar-popup");
  const closePopupButton = document.getElementById("close-avatar-popup");
  const avatarUrlInput = document.getElementById("avatar-url");
  const submitButton = document.getElementById("submit-avatar");
  const avatarForm = document.getElementById("avatar-form");

  // Открыть попап при клике на иконку редактирования аватара
  if (editAvatarIcon) {
    editAvatarIcon.addEventListener("click", function () {
      avatarPopup.style.display = "flex";
    });
  }

  // Закрыть попап при клике на крестик
  if (closePopupButton) {
    closePopupButton.addEventListener("click", function () {
      avatarPopup.style.display = "none";
    });
  }

  // Обработчик отправки формы
  if (avatarForm) {
    avatarForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const newAvatarUrl = avatarUrlInput.value.trim();

      // Валидация URL
      if (!newAvatarUrl) {
        alert("Пожалуйста, введите корректный URL.");
        return;
      }

      try {
        // Отправка PATCH-запроса на сервер для обновления аватара
        const response = await fetch(
          "https://nomoreparties.co/v1/cohortId/users/me/avatar",
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatar: newAvatarUrl }),
          }
        );

        if (!response.ok) {
          throw new Error("Не удалось обновить аватар.");
        }

        // Обновление аватара на странице
        const data = await response.json();
        avatarImage.style.backgroundImage = `url(${data.avatar})`;

        // Закрытие попапа
        avatarPopup.style.display = "none";
      } catch (error) {
        alert(error.message);
      }
    });
  }
});
