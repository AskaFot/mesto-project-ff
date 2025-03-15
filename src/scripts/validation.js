

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, formInput, errorMessage) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, formInput) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove("form__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, formInput) => {
  if (formInput.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    // formInput.setCustomValidity("Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы");
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } 
  else if (formInput.validity.tooShort) {
    formInput.setCustomValidity(``);
  }
  else if (formInput.validity.tooLong) {
    formInput.setCustomValidity(``);
  } 
  else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    formInput.setCustomValidity("");
  }
  if (!formInput.checkValidity()) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  if (buttonElement) {
    toggleButtonState(inputList, buttonElement);
  }
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      if (buttonElement) {
        toggleButtonState(inputList, buttonElement);
      }
    });
  });
}

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

// enableValidation();

// Если поле не валидно, колбэк вернёт true
// Обход массива прекратится и вся функция
// hasInvalidInput вернёт true
export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.removeAttribute("disabled");
  }
}

  export function clearValidation (formElement, settings){
  const inputList = Array.from(formElement.querySelectorAll(settings.formInput));
  // const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach(input => {
    input.value = ''; // очищаем значение каждого поля
    hideInputError(formElement, input, settings); // скрываем ошибку
  });
}