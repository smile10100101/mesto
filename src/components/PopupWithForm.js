import { Popup } from "../components/Popup.js";


export class PopupWithForm extends Popup {

    constructor (popup, {handleFormSubmit} ) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm =  popup.querySelector('.popup__form');
        this._inputList = popup.querySelectorAll('.popup__input');
    }
    
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value; 
        });
        return this._inputValues;
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());   
            this.close();
        });
        super.setEventListeners();
    }
}