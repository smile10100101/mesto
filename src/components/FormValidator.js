export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;

        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._inputErrorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = ''; 
        errorElement.classList.remove(this._errorClass);
    };

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
         this._hideInputError(inputElement);
        } else {
          this._showInputError(inputElement);
        };
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
          this._buttonElement.classList.remove(this._submitButtonSelector);
          this._buttonElement.classList.add(this._inactiveButtonClass);
          this._buttonElement.disabled = true;
        } else {
          this._buttonElement.classList.add(this._submitButtonSelector);
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.disabled = false;
        };
    };
    
    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
       });
    };

    resetForm() {
        this._toggleButtonState();
    };
    
    enableValidation() {
        this._setEventListeners();
    };
};