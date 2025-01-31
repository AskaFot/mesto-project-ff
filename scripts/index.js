// @todo: Темплейт карточки
const templateContainer = document.querySelector("#card-template").content; // создает карточку

// @todo: DOM узлы
const container = document.querySelector(".content"); // главный контейнер
const cardContainer = container.querySelector(".places__list"); // список куда будут добавляться карточки
const buttonAdd = document.querySelector(".profile__add-button"); // кнопка добавить песню
const buttonDelete = document.querySelector(".card__delete-button"); // кнопка удалить песню
const buttonLike = cardContainer.querySelector(".card__like-button"); // кнопка лайкнуть песню

// @todo: Функция создания карточки
function createCard(detailsCard,removeCard) {
  const containerElement = templateContainer
    .querySelector(".card")
    .cloneNode(true); // создает клон карточки
  const titleElement = containerElement.querySelector(".card__title");
  const imageElement = containerElement.querySelector(".card__image");

  imageElement.src = detailsCard.link;
  imageElement.alt = detailsCard.name;
  titleElement.textContent = detailsCard.name;
  const buttonDelete = containerElement.querySelector(".card__delete-button"); // кнопка удалить песню
  buttonDelete.addEventListener("click", () => removeCard(containerElement));
  cardContainer.append(containerElement); // Добавляем карточку в контейнер
  return containerElement;
}
// @todo: Функция удаления карточки
function removeCard(element) {
  element.remove(); // Удаляем ТОЛЬКО эту карточку
}

// @todo: Вывести карточки на страницу
initialCards.forEach((detailsCard) => {
  const cardElement = createCard(detailsCard, removeCard);
  cardContainer.append(cardElement);
});