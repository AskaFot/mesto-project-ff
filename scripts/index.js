// @todo: Темплейт карточки
const templateContainer = document.querySelector("#card-template").content; // создает карточку

// @todo: DOM узлы
const container = document.querySelector(".content"); // главный контейнер
const cardContainer = container.querySelector(".places__list"); // список куда будут добавляться карточки
const addButton = document.querySelector(".profile__add-button"); // кнопка добавить песню
const resetButton = document.querySelector(".card__delete-button"); // кнопка удалить песню
const likeButton = cardContainer.querySelector(".card__like-button"); // кнопка лайкнуть песню

// @todo: Функция создания карточки
function addCard(initialCard) {
  const containerElement = templateContainer
    .querySelector(".card")
    .cloneNode(true); // создает клон карточки
  const titleElement = containerElement.querySelector(".card__title");
  const imageElement = containerElement.querySelector(".card__image");

  imageElement.src = initialCard.link;
  imageElement.alt = initialCard.name;
  titleElement.textContent = initialCard.name;
  const resetButton = containerElement.querySelector(".card__delete-button"); // кнопка удалить песню
  resetButton.addEventListener("click", () => removeCard(containerElement));
  cardContainer.append(containerElement); // Добавляем карточку в контейнер
}
// @todo: Функция удаления карточки

function removeCard(element) {
  element.remove(); // Удаляем ТОЛЬКО эту карточку
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => addCard(card)); // Добавляем все карточки
