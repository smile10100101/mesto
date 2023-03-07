import { Popup } from "../components/Popup.js";


export class PopupWithForm extends Popup {

    constructor (popup, {handleFormSubmit} ) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm =  popup.querySelector('.popup__form');
        this._inputList = popup.querySelectorAll('.popup__input');
        this._button = popup.querySelector('.popup__submit-button');
    }
    
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value; 
        });
        return this._inputValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        }) 
    }

    setButtonText(text) {
        this._button.textContent = text;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());   
        });
        super.setEventListeners();
    }
}