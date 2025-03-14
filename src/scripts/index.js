// // В файле index.js должны остаться:
// // объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// // обработчики событий (при открытии и закрытии попапов; при отправке форм; 
// //   обработчик, открывающий попап при клике по изображению карточки);
// // вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать 
// // объявленные здесь переменные и обработчики.


import "../pages/index.css";

import { 
  openPopup, closePopup,clickOvarlay
} from "./modal.js";

import { 
  editElement, formEdit, buttonEdit, editClose, jobtofil, namePtofil,
  cardElement, buttonAdd, cardClose, popupType,  nameInput,
  imgClose, cardContainer, popupImage, popupCaption, jobInput 
} from "./variables.js";

import { initialCards } from "./cards.js";

import { createCard, removeCard, likeCard } from "./card.js";


// Открытие и закрытие формы редактирования профиля
buttonEdit.addEventListener('click', () => {
  nameInput.value = namePtofil.textContent; // Заполняем инпуты текущими данными
  jobInput.value = jobtofil.textContent;
  openPopup (editElement)
});

editClose.addEventListener('click', () => closePopup(editElement));

// Открытие и закрытие формы создания карточки
buttonAdd.addEventListener('click', () => openPopup(cardElement));
cardClose.addEventListener('click', () => closePopup(cardElement));

// Открытие и закрытие картинки
imgClose.addEventListener('click', () => closePopup(popupType));
// cardContainer.addEventListener('click', openFoto);


// Обработчики форм
formEdit.addEventListener('submit', handleProfileFormSubmit);
cardElement.addEventListener('submit', processesCardCreation);

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
};

// Функция отправки поста
export function  processesCardCreation(evt) {
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
  evt.target.reset()
  // Закрываем модальное окно
  const popup = document.querySelector('.popup_is-opened');
  closePopup(popup);
};

// Функция открытия фото
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
    openPopup (popupType)  }
};

document.addEventListener('click', clickOvarlay);

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement,formInput,errorMessage) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement,formInput) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove('form__input_type_error');
  errorElement.textContent = ('');
  errorElement.classList.remove('form__input-error_active');
};

// Функция, которая проверяет валидность поля
const isValid = (formElement,formInput) => {
  if (formInput.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    // formInput.setCustomValidity("Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы");
    formInput.setCustomValidity(formInput.dataset.errorMessage);

  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    formInput.setCustomValidity("");
}
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement,formInput);
  }
};

function setEventListeners(formElement){
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  if (buttonElement) {
    toggleButtonState(inputList, buttonElement);
  }
    inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    isValid(formElement, inputElement);
    if (buttonElement) {
      toggleButtonState(inputList, buttonElement);
    }
    
  });
});

}

function enableValidation  (){
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
// const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

setEventListeners(formElement);

  });
};

enableValidation()

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};


function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

// очистка ошибок валидации вызовом clearValidation

clearValidation(profileForm, validationConfig);
  
// Вызовем функцию isValid на каждый ввод символа
// formInput.addEventListener('input', function () {
//   isValid(form, formInput);
// });

// setEventListeners(form);