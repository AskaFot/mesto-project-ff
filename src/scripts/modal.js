// в файле modal.js описаны функции для работы 
// с модальными окнами: функция открытия модального окна,
//  функция закрытия модального окна, функция-обработчик 
//  события нажатия Esc и 
// функция-обработчик события клика по оверлею;


import {createCard,removeCard, likeCard} from "./card.js";
import { editElement, formEdit, popupType, popupImage, popupCaption, cardContainer} from "./variables.js";


// Функция отправки формы
export function handleFormSubmit(evt) {
  evt.preventDefault();

  // Получаем данные формы
  const nameInput = formEdit.querySelector('input[name="popup_name"]');
  const jobInput = formEdit.querySelector('input[name="description"]');

  // Обновляем профиль
  const nameInsert = document.querySelector('.profile__title');
  const descriptionInsert = document.querySelector('.profile__description');

  nameInsert.textContent = nameInput.value;
  descriptionInsert.textContent = jobInput.value;

  closeModal(editElement); // Закрываем нужный попап
}

export function handleForm(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  const nameCard = evt.target.querySelector('input[name="place-name"]');
  const fotoCard = evt.target.querySelector('input[name="link"]');

  // Создаём карточку
  const newCard = createCard(
    { name: nameCard.value, link: fotoCard.value },
    removeCard,
    likeCard
  );
  // Добавляем карточку в контейнер
    cardContainer.prepend(newCard); // prepend - добавляет в начало, append - в конец

  // Очищаем форму
  nameCard.value = "";
  fotoCard.value = "";

  // Закрываем модальное окно
  const popup = document.querySelector(".popup_is-opened");
  closeModal(popup);
}


export function openFoto(evt) {
  const clickedImage = evt.target; // Определяем, куда кликнули

  if (clickedImage.classList.contains('card__image')) {

    // Находим карточку, к которой относится изображение
    const card = clickedImage.closest('.card'); // Ищем родителя `.card`
    const cardTitle = card ? card.querySelector('.card__title') : null; // Заголовок карточки

    // Устанавливаем картинку и подпись
    popupImage.src = clickedImage.src;
    popupImage.alt = cardTitle.textContent; // "Фотография";
    popupCaption.textContent = cardTitle.textContent //"Без описания";
    // Показываем попап
    popupType.classList.add('popup_is-opened');
  }
};


// Функции открытия/закрытия модального окна для всего 
// если клик по кнопке крестик или по любой
//  другой области не равной div 

document.addEventListener('click', function (event) {
  const modals = document.querySelectorAll('.popup'); // Получаем все модальные окна
  // Проверяем, был ли клик сделан по кнопке открытия
  if (
    event.target.closest('.profile__edit-button') || // Кнопка "Редактировать"
    event.target.closest('.profile__add-button') ||  // Кнопка "Добавить"
    event.target.closest('.card__image') || // Клик по изображению 
    event.target.closest('.popup__content') // Клик внутри 
  ) {
    return; // Не закрываем окно
  }

  modals.forEach((modal) => {
    if (modal.classList.contains('popup_is-opened')) {
      closeModal(modal);
    }
  
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".popup_is-opened"); // Найти открытый popup
    if (openModal) {
      closeModal(openModal);
    }
  }
});

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  setTimeout(() => {
    popup.classList.add('popup_is-animated');
  }, 200);}


export function closeModal(popup) {
  popup.classList.remove('popup_is-animated');

  setTimeout(() => {
    popup.classList.remove('popup_is-opened');
  }, 300);
}