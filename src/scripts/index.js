import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import {
  fetchUserProfile,
  fetchCards,
  updateUserProfile,
  addNewCard,
  updateAvatar,
} from "./api.js";
import { enableValidation, clearValidation } from "./validation.js";
import { createCard,closeDeletePopup,openDeletePopup } from "./card.js";
import {
  nameInput,
  popupValidation,
  jobInput,
  buttonEdit,
  buttonAdd,
  profilePopup,
  cardPopup,
  imagePopup,
  popupImage,
  namePtofil,
  aboutPtofil,
  popupCaption,
  placeInput,
  buttonAvatar,
  avatarImage,
  linkInput,
  cardForm,
  cardContainer,
} from "./variables.js";

// Проверяем, найдены ли все элементы
if (!namePtofil || !aboutPtofil || !avatarImage || !cardContainer) {
  console.error(
    "❌ Ошибка: один или несколько элементов профиля/карточек не найдены в DOM!"
  );
}






// Загрузка данных при старте
document.addEventListener("DOMContentLoaded", () => {
  fetchUserProfile();
  fetchCards();
});







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
  clearValidation(cardForm, validationConfig);
});


/// Добавление новой карточки
cardPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();

  setLoading(evt.target.querySelector(".popup__button"), true);
  console.log("🔄 Форма отправлена!"); // Проверяем, вызывается ли `submit` дважды

  const name = evt.target.querySelector('input[name="place-name"]').value;
  const link = evt.target.querySelector('input[name="link"]').value;

  // console.log(btn.innerText)
  evt.target.reset(); // Очищаем форму сразу

  addNewCard(name, link)
    .then((cardData) => {
      if (cardData) {
        console.log("🆕 Добавляем карточку:", cardData);

        const newCard = createCard(cardData, cardData.owner._id);
        if (newCard) {
          cardContainer.prepend(newCard);
        }
        setLoading(evt.target.querySelector(".popup__button"), false);
        closePopup(cardPopup);
      }
    })
    .catch(console.error);
  });
export function setLoading(btn, isLoading) {
  if (isLoading) {
    btn.textContent = "Сохранить...";
  } else {
    btn.textContent = "Сохранить";
  }
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
    openPopup(imagePopup);
  }
}

// Открытие попапов
buttonEdit.addEventListener("click", () => {
  nameInput.value = namePtofil.textContent;
  jobInput.value = aboutPtofil.textContent;
  openPopup(profilePopup);
});

buttonAdd.addEventListener("click", () => openPopup(cardPopup));

// Закрытие попапов
profilePopup.addEventListener("click", () => closePopup(profilePopup));
cardPopup .addEventListener("click", () => closePopup(cardPopup));
imagePopup.addEventListener("click", () => closePopup(imagePopup));

// Обновление профиля
profilePopup.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  setLoading(submitButton, true);

  try {
    const userData = await updateUserProfile(nameInput.value, jobInput.value);
    namePtofil.textContent = userData.name;
    aboutPtofil.textContent = userData.about;
    closePopup(profilePopup);
  } catch (error) {
    console.error("❌ Ошибка обновления профиля:", error);
  } finally {
    setLoading(submitButton, false);
  }
});



document.addEventListener("DOMContentLoaded", () => {
  Promise.all([fetchUserProfile(), fetchCards()])
    .then(([userData, cards]) => {
      if (!userData || !userData._id) {
        console.error("Ошибка: данные профиля загружены некорректно!");
        return;
      }
      cardContainer.addEventListener("click", openFoto);
      const userId = userData._id;
      namePtofil.textContent = userData.name;
      aboutPtofil.textContent = userData.about;
      avatarImage.style.backgroundImage = `url(${userData.avatar})`;//✅

      cardContainer.innerHTML = ""; // Очистка контейнера перед загрузкой новых карточек

      cards.forEach((card) => {
        const cardEl = createCard(card, userId);
        if (cardEl) cardContainer.append(cardEl);
      });
    })
    .catch(console.error);
});


//  Обработчик кнопки подтверждения удаления
document.getElementById("confirmDeleteButton").addEventListener("click", () => {
  if (!currentCardId || !currentCardPopup) {
    console.error(" Ошибка: нет ID или элемента карточки для удаления!");
    return;
  }

  deleteCard(currentCardId)
    .then(() => {
      currentCardPopup.remove(); // Удаляем карточку из DOM
      closeDeletePopup();
    })
    .catch((err) => console.error("Ошибка удаления карточки:", err));
});

  const avatarPopup = document.getElementById("avatar-popup");
  const avatarForm = document.getElementById("avatar-form");
  const avatarInput = document.getElementById("avatar-url");
  const submitAvatarButton = document.getElementById("submit-avatar");
  // avatarImage
  const closeAvatarPopup = document.getElementById("close-avatar-popup");

  // Открытие попапа
  document.querySelector(".profile__image").addEventListener("click", () => {
    avatarPopup.classList.add("popup_is-opened");
  });

  // Закрытие попапа
  closeAvatarPopup.addEventListener("click", () => {
    avatarPopup.classList.remove("popup_is-opened");
  });

  // Обработчик формы
  avatarForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const avatarUrl = avatarInput.value.trim();

    if (!avatarUrl) {
      alert("Введите URL аватара!"); // Минимальная валидация
      return;
    }

    submitAvatarButton.textContent = "Сохранение..."; // UI-блокировка кнопки
    event.target.reset();
    updateAvatar(avatarUrl)
      .then((data) => {
        if (data && data.avatar) {
          avatarImage.src = data.avatar; // Меняем аватар на странице
          avatarImage.style.backgroundImage = `url("${data.avatar}")`;
        }
        avatarPopup.classList.remove("popup_is-opened");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        submitAvatarButton.textContent = "Сохранить"; // Возвращаем кнопку в нормальный вид
      });
  });

// // Обработчик формы обновления аватара
// document.querySelector(".submit-avatar").addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const avatarUrl = evt.target.querySelector(".avatar-link").value;
//   updateAvatar(avatarUrl);
// });

// Загрузка данных при старте
document.addEventListener("DOMContentLoaded", () => {
  fetchUserProfile();
  fetchCards();
});

// Обработчик формы редактирования профиля
profilePopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.querySelector('input[name="popup_name"]').value;
  const about = evt.target.querySelector('input[name="description"]').value;
  updateUserProfile(name, about);
});

// Обработчик формы добавления карточки
cardPopup
  .addEventListener("submit", (evt) => {
    evt.preventDefault();
    const name = evt.target.querySelector('input[name="place-name"]').value;
    const link = evt.target.querySelector('input[name="link"]').value;
    // addNewCard(name, link);
  });

let currentCardId = null;
let currentCardPopup = null;

//  Обработчик кнопки подтверждения удаления
document.getElementById("confirmDeleteButton").addEventListener("click", () => {
  if (!currentCardId || !currentCardPopup) {
    console.error(" Ошибка: нет ID или элемента карточки для удаления!");
    return;
  }

  deleteCard(currentCardId)
    .then(() => {
      currentCardPopup.remove(); // Удаляем карточку из DOM
      closeDeletePopup();
    })
    .catch((err) => console.error("Ошибка удаления карточки:", err));
});