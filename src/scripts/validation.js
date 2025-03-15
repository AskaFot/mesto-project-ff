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
  } else {
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
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach(input => hideInputError(formElement, input, settings));
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}



// export const clearValidation = (formSelector, settings) => {
//   const inputElements = Array.from(formSelector.querySelectorAll(settings.inputSelector));
//   const submitButton = formSelector.querySelector(settings.submitButtonSelector);

//   inputElements.forEach(input => hideInputError(formSelector, input));
  
//   if (submitButton) {
//     submitButton.classList.add(settings.inactiveButtonClass);
//     submitButton.setAttribute("disabled", true);
//   }
// };



// // Функция, которая добавляет класс с ошибкой
// export const showInputError = (formSelector, formInput, errorMessage) => {
//   const errorElement = formSelector.querySelector(`.${formInput.id}-error`);
//   formInput.classList.add("popup__input_type_error");
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add("form__input-error_active");
// };
// // export const showInputError = (formElement, inputErrorClass, errorMessage) => {
// //   const errorClass = document.querySelector(`.${inputSelector.id}-error`);
// //   inputErrorClass.classList.add("popup__input_type_error");
// //   errorClass.textContent = errorMessage;
// //   errorClass.classList.add("form__input-error_active");
// // };

// // Функция, которая удаляет класс с ошибкой
// export const hideInputError = (formSelector, inputElement) => {
//   const errorElement = formSelector.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove("popup__input_type_error");
//   errorElement.textContent = "";
//   errorElement.classList.remove("form__input-error_active");
// };

// // export const hideInputError = (formElement, inputErrorClass) => {
// //   const errorClass = document.querySelector(`.${inputErrorClass.id}-error`);
// //   inputErrorClass.classList.remove("popup__input_type_error");
// //   errorClass.textContent = "";
// //   errorClass.classList.remove("form__input-error_active");
// // };

// // Функция, которая проверяет валидность поля
// export const isValid = (formSelector, inputElement) => {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//     inputElement.setCustomValidity("");
//   }
//   if (!inputElement.checkValidity()) {
//     showInputError(formSelector, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formSelector, inputElement);
//   }
// };

// // export const isValid = (formElement, inputSelector) => {
// //   if (inputSelector.validity.patternMismatch) {
// //     // встроенный метод setCustomValidity принимает на вход строку
// //     // и заменяет ею стандартное сообщение об ошибке
// //     // formInput.setCustomValidity("Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы");
// //     inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
// //   } else {
// //     // если передать пустую строку, то будут доступны
// //     // стандартные браузерные сообщения
// //     inputSelector.setCustomValidity("");
// //   }
// //   if (!inputSelector.checkValidity()) {
// //     showInputError(formElement, inputSelector, inputSelector.validationMessage);
// //   } else {
// //     hideInputError(formElement, inputSelector);
// //   }
// // };

// export function setEventListeners(formSelector) {
//   const inputSelector = Array.from(formSelector.querySelectorAll(".popup__input"));
//   const submitButtonSelector = formSelector.querySelector(".popup__button");
//   if (submitButtonSelector) {
//     toggleButtonState(inputSelector, submitButtonSelector);
//   }
//   inputSelector.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       isValid(formSelector, inputElement);
//       if (submitButtonSelector) {
//         toggleButtonState(inputSelector, submitButtonSelector);
//       }
//     });
//   });
// }

// export function enableValidation(formSelector) {
//   var formElements = Array.from(document.querySelectorAll(".popup__form"));
  
//   formElements.forEach(function (formElement) {  
//     formElement.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });

//     setEventListeners(formElement); // Передаём один элемент формы
//   });
// }


// // Если поле не валидно, колбэк вернёт true
// // Обход массива прекратится и вся функция
// // hasInvalidInput вернёт true
// export function hasInvalidInput(inputSelector) {
//   return inputSelector.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// export function toggleButtonState(inputSelector, submitButtonSelector) {
//   if (hasInvalidInput(inputSelector)) {
//     submitButtonSelector.classList.add("button_inactive");
//     submitButtonSelector.setAttribute("disabled", true);
//   } else {
//     submitButtonSelector.classList.remove("button_inactive");
//     submitButtonSelector.removeAttribute("disabled");
//   }
// }

// // export const clearValidation = (formElement, settings) => {
// //   const inputSelector = Array.from(document.querySelectorAll(settings.inputSelector));
// //   const submitButtonSelector = document.querySelector(settings.submitButtonSelector);

// //   inputSelector.forEach(input => hideInputError(formElement, input, settings));
// //   submitButtonSelector.classList.add(settings.inactiveButtonClass);
// //   submitButtonSelector.setAttribute('disabled', true);
// // };
// export const clearValidation = (formSelector, settings) => {
//   const inputElements = Array.from(formSelector.querySelectorAll(settings.inputSelector));
//   const submitButton = formSelector.querySelector(settings.submitButtonSelector);

//   inputElements.forEach(input => hideInputError(formSelector, input));
  
//   if (submitButton) {
//     submitButton.classList.add(settings.inactiveButtonClass);
//     submitButton.setAttribute("disabled", true);
//   }
// };