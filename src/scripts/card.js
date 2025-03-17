// в файле card.js описаны функции для работы с карточками: 
// функция создания карточки, функции-обработчики 
// событий удаления и лайка карточки;

import { removeCardApi, token} from './API.js';


//Карточка должна знать, принадлежит ли она текущему пользователю. Это нужно для отображения кнопки удаления.
export function cardAffiliation(detailsCard, removeCard, likeCard, openFoto) {
   const templateContainer = document.querySelector("#card-template").content; // создает карточку
  const containerElement = templateContainer
    .querySelector(".card")
    .cloneNode(true); // создает клон карточки
  const titleElement = containerElement.querySelector(".card__title");
  const imageElement = containerElement.querySelector(".card__image");
const buttonDelete = containerElement.querySelector(".card__delete-button"); // кнопка удалить песню
const buttonLike = containerElement.querySelector('.card__like-button');
const likeCount = containerElement.querySelector(".card__like-count");

imageElement.src = detailsCard.link;
  imageElement.alt = detailsCard.name;
  titleElement.textContent = detailsCard.name;
  likeCount.textContent = detailsCard.likes.length; // Устанавливаем количество лайков

  buttonLike.addEventListener("click", () => likeCard(buttonLike,likeCount));
  buttonDelete.addEventListener("click", () => removeCard(containerElement));
  imageElement.addEventListener("click", openFoto);

  return containerElement;
}

// Функция удаления карточки
// export function removeCard(element) {
//   element.remove();
// }

// // Предполагаем, что currentUser — это id текущего пользователя
// const currentUser = 'user123';  // Например, текущий пользователь

// // Находим все карточки на странице
// const cards = document.querySelectorAll('.card');
// const deletePopup = document.getElementById('delete-popup');
// const confirmDeleteButton = document.getElementById('confirm-delete');
// const cancelDeleteButton = document.getElementById('cancel-delete');

// // Для каждой карточки проверяем, кто её создал, и показываем иконку корзины
//  export function removeCard (cards,currentUser,buttonDelete){ 
//   cards.forEach(card => {
//   const createdBy = card.getAttribute('data-created-by');
//   // const buttonDelete = containerElement.querySelector(".card__delete-button"); // кнопка удалить

//   // Показываем кнопку удаления только если карточка создана текущим пользователем
//   if (createdBy === currentUser) {
//     buttonDelete.style.display = 'block'; // Показываем иконку корзины
//   } else {
//     ButtonDelete.style.display = 'none'; // Скрываем иконку корзины
//   }
// });

// // Добавляем обработчик событий на кнопки удаления
// deleteButtons.forEach(button => {
//   button.addEventListener('click', (event) => {
//     // Получаем карточку, к которой относится кнопка удаления
//     const card = event.target.closest('.card');
//     // Показываем попап
//     deletePopup.style.display = 'block';
//     // Сохраняем карточку, которую нужно удалить
//     deletePopup.setAttribute('data-card-id', card.id);
//   });
// });

// // Обработчик подтверждения удаления
// confirmDeleteButton.addEventListener('click', () => {
//   const cardId = deletePopup.getAttribute('data-card-id');
//   const cardToDelete = document.getElementById(cardId);
  
//   // Удаляем карточку
//   cardToDelete.remove();
  
//   // Закрываем попап
//   deletePopup.style.display = 'none';
// });

// // Обработчик отмены удаления
// cancelDeleteButton.addEventListener('click', () => {
//   // Закрываем попап без удаления
//   deletePopup.style.display = 'none';
// });
//  }



// const currentUser = 'user123'; // ID текущего пользователя
// const cards = document.querySelectorAll('.card');
// const deletePopup = document.getElementById('delete-popup');
// const confirmDeleteButton = document.querySelector('.confirm-delete');
// const cancelDeleteButton = document.querySelector('.cancel-delete');



// export function removeCard(cards, currentUser) {
//   cards.forEach(card => {
//     const createdBy = card.getAttribute('data-created-by');
//     const buttonDelete = card.querySelector('.card__delete-button');

//     if (createdBy === currentUser) {
//       buttonDelete.style.display = 'block'; // Показываем кнопку удаления
//     } else {
//       buttonDelete.style.display = 'none'; // Скрываем кнопку удаления
//     }

//     // Добавляем обработчик клика по кнопке удаления
//     buttonDelete.addEventListener('click', (event) => {
//       deletePopup.style.display = 'block';
//       deletePopup.setAttribute('data-card-id', card.id);
//     });
//   });
// }

// // Обработчик подтверждения удаления
// confirmDeleteButton.addEventListener('click', () => {
//   const cardId = deletePopup.getAttribute('data-card-id');
//   if (!cardId) return;

//   fetch(`https://nomoreparties.co/v1/wff-cohort-34/cards/${cardId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: "Bearer token",
//       "Content-Type": "application/json",
//     },
//   })
//     .then(res => {
//       if (!res.ok) {
//         return Promise.reject(`Ошибка: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then(() => {
//       document.getElementById(cardId).remove(); // Удаляем карточку из DOM
//       deletePopup.style.display = 'none';
//     })
//     .catch(err => console.error(err));
// });

// // Обработчик отмены удаления
// cancelDeleteButton.addEventListener('click', () => {
//   deletePopup.style.display = 'none';
// });


export function removeCard(cards, currentUser) {
  cards.forEach(card => {
    const createdBy = card.getAttribute('data-created-by');
    const buttonDelete = card.querySelector('.card__delete-button');

    if (createdBy === currentUser) {
      buttonDelete.style.display = 'block';
    } else {
      buttonDelete.style.display = 'none';
    }

    buttonDelete.addEventListener('click', (event) => {
      const deletePopup = document.getElementById('delete-popup');
      deletePopup.style.display = 'block';
      deletePopup.setAttribute('data-card-id', card.id);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = "1c551ff6-00cc-40b7-b844-b0d2f447e9fe";
  const cards = document.querySelectorAll('.card');
  const deletePopup = document.getElementById('delete-popup');
  const confirmDeleteButton = document.querySelector('.confirm-delete');
  const cancelDeleteButton = document.querySelector('.cancel-delete');

  if (!deletePopup || !confirmDeleteButton || !cancelDeleteButton) {
    console.error("Ошибка: Попап удаления или его кнопки не найдены в DOM!");
    return;
  }

  // Обработчики событий для попапа
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
        document.getElementById(cardId).remove();
        deletePopup.style.display = 'none';
      })
      .catch(err => console.error(err));
  });

  cancelDeleteButton.addEventListener('click', () => {
    deletePopup.style.display = 'none';
  });

  removeCard(cards, currentUser);
});


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