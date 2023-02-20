import { Popup } from '../components/Popup.js';


export class PopupWithImage extends Popup {

    constructor(popup) {
        super(popup);
        this._link = popup.querySelector('.popup__place-img');
        this._name = popup.querySelector('.popup__title-img');
    }
    
    open(link, name) { 
        this._link.src = link;
        this._link.alt = name;
        this._name.textContent = name;

        super.open();
        super.setEventListeners();
    }
}

