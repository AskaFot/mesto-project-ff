import "../pages/index.css";
import { openPopup, closePopup } from "./modal.js";
import {
  fetchUserProfile,
  fetchCards,
  updateUserProfile,
  addNewCard,
  updateAvatar,
  deleteCard
} from "./api.js";
import { enableValidation, clearValidation } from "./validation.js";
import { createCard,openDeletePopup } from "./card.js";
import {
  nameInput,
  avatarInput,
  avatarForm,
  jobInput,
  buttonEdit,
  placeInput,
  formCard,
  avatarPopup,
  buttonAdd,
  validationConfig,
  profilePopup,
  cardPopup,
  imagePopup,
  popupImage,
  namePtofil,
  aboutPtofil,
  popupCaption,
  avatarImage,
  linkInput,
  cardContainer,
} from "./variables.js";

// Проверяем, найдены ли все элементы
if (!namePtofil || !aboutPtofil || !avatarImage || !cardContainer) {
  console.error(
    "Ошибка: один или несколько элементов профиля/карточек не найдены в DOM!"
  );
}

//  Включаем валидацию
enableValidation(validationConfig);

export function setLoading(btn, isLoading) {
  if (isLoading) {
    btn.textContent = "Сохранить...";
  } else {
    btn.textContent = "Сохранить";
  }
}

/// Добавление новой карточки
cardPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();

  setLoading(evt.submitter, true);
  console.log(" Форма отправлена!"); // Проверяем, вызывается ли `submit` дважды
  const name = placeInput.value;
  const link = linkInput.value;  
  // console.log(btn.innerText)

  addNewCard(name, link)
    .then((cardData) => {
      if (cardData) {
        console.log(" Добавляем карточку:", cardData);

        const newCard = createCard(cardData, cardData.owner._id,openDeletePopup);
        if (newCard) {
          cardContainer.prepend(newCard);
        }
        closePopup(cardPopup);
      }
    })
    
    .catch(console.error)
    .finally(() => {
      setLoading(evt.submitter, false);
    });
  });
  

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

buttonAdd.addEventListener("click", () => {
  clearValidation(formCard,validationConfig); // Очистка формы перед открытием попапа
  openPopup(cardPopup); // Открытие попапа
});


avatarImage.addEventListener("click", () => {
  clearValidation(avatarForm,validationConfig); // Очистка формы перед открытием попапа
  openPopup(avatarPopup); // Открытие попапа
});

// Обновление профиля
profilePopup.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");
  setLoading(evt.submitter, true);

  try {
    const userData = await updateUserProfile(nameInput.value, jobInput.value);
    namePtofil.textContent = userData.name;
    aboutPtofil.textContent = userData.about;
    closePopup(profilePopup);
  } catch (error) {
    console.error(" Ошибка обновления профиля:", error);
  } finally {
    setLoading(evt.submitter, false);
  }
});

  //загружает данные и сразу создаёт карточки
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
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;
    cards.forEach((card) => {
      const cardEl = createCard(card, userId);
      if (cardEl) cardContainer.append(cardEl);
    });
  })
  .catch((err) => console.error("Ошибка загрузки данных:", err));


  // Обработчик смены аваара
  avatarForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const avatarUrl = avatarInput.value.trim();
    setLoading(event.submitter, true);
    event.target.reset();
    updateAvatar(avatarUrl)
      .then((data) => {
        if (data && data.avatar) {
          avatarImage.src = data.avatar; // Меняем аватар на странице
          avatarImage.style.backgroundImage = `url("${data.avatar}")`;
        }
        closePopup(avatarPopup);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(event.submitter, false);
      });
  });


// Обработчик формы редактирования профиля
profilePopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.querySelector(nameInput).value;
  const about = evt.target.querySelector(jobInput).value;
  updateUserProfile(name, about);
});

//  Обработчик кнопки подтверждения удаления
let currentCardId = null; // Предполагаем, что ID хранится в data-id
let currentCardElement = null;

document.getElementById("confirmDeleteButton").addEventListener("click", () => {
  console.log("🔎 Проверяем перед удалением:");
  console.log("window.currentCardId:", window.currentCardId);
  console.log("window.currentCardElement:", window.currentCardElement);

  if (!window.currentCardId || !window.currentCardElement) {
    console.error("❌ Ошибка: нет ID или элемента карточки для удаления!");
    return;
  }

  deleteCard(window.currentCardId)
    .then(() => {
      window.currentCardElement.remove();
      closePopup(document.getElementById("delete-popup"));

      // Сброс переменных после удаления
      window.currentCardId = null;
      window.currentCardElement = null;
    })
    .catch((err) => console.error("Ошибка удаления карточки:", err));
});


//Если интересно, посмотрите, как можно избавиться от дублирования изменения текста кнопки сабмита, отлов ошибок и очистку формы в каждом запросе  Пример оптимизации обработчика сабмита формы профиля
// вот это действительно интересно, после сдачи работы посмотрю