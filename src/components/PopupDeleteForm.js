import { Popup } from "../components/Popup.js";

export class PopupDeleteForm extends Popup {
    constructor (popup, handleFormDeleteSubmit) {
        super(popup);
        this._handleFormDeleteSubmit = handleFormDeleteSubmit.bind(this);
        this._form =  popup.querySelector('.popup__form');
        this._button = popup.querySelector('.popup__submit-button');
    }

    setButtonText(text) {
        this._button.textContent = text;
    }

    open(card, cardID) {
        super.open();
        this._card = card; 
        this._cardID = cardID;
    }

    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormDeleteSubmit(this._card);   
          super.close();
        });
        super.setEventListeners();
    }
}