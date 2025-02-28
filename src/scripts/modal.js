// в файле modal.js описаны функции для работы 
// с модальными окнами: функция открытия модального окна,
//  функция закрытия модального окна, функция-обработчик 
//  события нажатия Esc и 
// функция-обработчик события клика по оверлею;


import {createCard} from "./card.js";
import { editElement, formEdit,editSave, buttonEdit, editClose, cardElement, formCard, buttonAdd, cardClose, popupType, popupImage, popupCaption, imgClose, cardContainer} from "./variables.js";


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

/// создание карточки 
function handleForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей 
  // const formPlace = evt.target;
  
  // что вставляем
  const nameCard = formCard.querySelector('input[name="place-name"]');
  const fotoCard = formCard.querySelector('input[name="link"]');
  
  // куда вставляем
  const cardInsert = document.querySelector('.card__title');
  const fotoInsert = document.querySelector('.card__image');

  // Вставьте новые значения с помощью textContent
  cardInsert.textContent = nameCard.value;
  fotoInsert.textContent = fotoCard.value;
  // jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
//   cardSave.addEventListener("click", () =>
//      createCard(cardSave),
//   // addCard(cardSave)
// );
  closeModal(cardElement);
}


  // function addCard(cardInsert, fotoInsert) {
  //   cardItem.insertAdjacentHTML('beforestart', `
  //       <li class="places__item card">
  //   <img class="card__image" src="${fotoInsert /* это тоже данные от пользователя */}"/>
  //   <button type="button" class="card__delete-button"></button>
  //   <div class="card__description">
  //     <h2 class="card__title"> ${cardInsert /* это тоже данные от пользователя */}
  //     </h2>
  //     <button type="button" class="card__like-button"></button>
  //   </div>
  // </li>
  //   `);
  // }


function openFoto(evt) {
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
//  другой области не равной div то 


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


// Открытие и закрытие формы редактирования профиля
buttonEdit.addEventListener('click', () => openModal(editElement));
editClose.addEventListener('click', () => closeModal(editElement));

// Открытие и закрытие формы создания карточки
buttonAdd.addEventListener('click', () => openModal(cardElement));
cardClose.addEventListener('click', () => closeModal(cardElement));

// Открытие и закрытие картинки
imgClose.addEventListener('click', () => closeModal(popupType));


// Обработчики форм
formEdit.addEventListener('submit', handleFormSubmit);
cardElement.addEventListener('submit', handleForm);
cardContainer.addEventListener('click', openFoto);


