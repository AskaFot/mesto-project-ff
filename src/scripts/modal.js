// в файле modal.js описаны функции для работы 
// с модальными окнами: функция открытия модального окна,
//  функция закрытия модального окна, функция-обработчик 
//  события нажатия Esc и 
// функция-обработчик события клика по оверлею;

// Находим форму в DOM
import{templateContainer, formElement, container, cardContainer, buttonEdit,buttonClose, popupElement, buttonAdd,buttonLike}from "./index.js";


// export const templateContainer = document.querySelector("#card-template").content; // создает карточку

// const container = document.querySelector(".content"); // главный контейнер
// const cardContainer = container.querySelector(".places__list"); // список куда будут добавляться карточки
// Находим поля формы в DOM
// const nameInput = formElement.querySelector('input[name="popup_name"]');
// const jobInput = formElement.querySelector('input[name="description"]');
// export const buttonAdd = document.querySelector(".profile__add-button"); // кнопка добавить карту
// const imgOpen = cardContainer.querySelector(".card__image");
// const formImg = templateContainer.querySelector('.places__item')



// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей 
  const formElement = evt.target;
  
  // что вставляем
  const nameInput = formElement.querySelector('input[name="popup_name"]');
  const jobInput = formElement.querySelector('input[name="description"]');
  
  // куда вставляем
  const nameInsert = document.querySelector('.profile__title');
  const descriptionInsert = document.querySelector('.profile__description');

  // Вставьте новые значения с помощью textContent
  nameInsert.textContent = nameInput.value;
  descriptionInsert.textContent = jobInput.value;
  // jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  closeModal(popupElement);
}

// formElement.addEventListener('submit', handleFormSubmit);

export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
}

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

// Открытие формы при нажатии на кнопку "Редактировать"
buttonEdit.addEventListener('click', () => {
  openModal(popupElement);
});

// Закрытие формы при нажатии на кнопку "Закрыть"
buttonClose.addEventListener('click', () => {
  closeModal(popupElement);
});



function handleForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей 
  const formElement = evt.target;
  
  // что вставляем
  const nameCard = formElement.querySelector('input[name="place-name"]');
  const fotoCard = formElement.querySelector('input[name="link"]');
  
  // куда вставляем
  const cardInsert = document.querySelector('.card__title');
  const fotoInsert = document.querySelector('.card__image');

  // Вставьте новые значения с помощью textContent
  cardInsert.textContent = nameCard.value;
  fotoInsert.textContent = fotoCard.value;
  // jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  closeModal(popupElement);
}

// formElement.addEventListener('submit', handleForm);

buttonAdd.addEventListener('click', () => {
  openModal(popupElement);
});

function openFoto(evt) {
  const clickedImage = evt.target; // Определяем, куда кликнули

  if (clickedImage.classList.contains('card__image')) {
    const popup = document.querySelector('.popup_type_image'); // Находим попап
    const popupImage = popup.querySelector('.popup__image'); // Картинка в попапе
    const popupCaption = popup.querySelector('.popup__caption'); // Подпись в попапе
    // const popupOpened  = popup.querySelector('.popup_is-opened')

    // Находим карточку, к которой относится изображение
    const card = clickedImage.closest('.card'); // Ищем родителя `.card`
    const cardTitle = card ? card.querySelector('.card__title') : null; // Заголовок карточки

    // Устанавливаем картинку и подпись
    popupImage.src = clickedImage.src;
    popupImage.alt = cardTitle.textContent; // "Фотография";
    popupCaption.textContent = cardTitle.textContent //"Без описания";
    // Показываем попап
    popup.classList.add('popup_is-opened');
  }
};

function closePopup() {
  const popup = document.querySelector('.popup_type_image');
  popup.classList.remove('popup_is-opened');
}

// Назначаем обработчики
document.querySelector('.places__list').addEventListener('click', openFoto);

// Обработчик закрытия попапа
const closeButton = document.querySelector('.popup_type_image .popup__close');
closeButton.addEventListener('click', closePopup);