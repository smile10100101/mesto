import { popupImage, popupImageLink, popupImageName } from './constants.js';
import { openPopup } from './utils.js';


export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            this._handleDelete();
        });

        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._handleLike();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleImagePopup();
        });
    }

    _handleDelete() {
        this._element.remove();
        this._element = null;
    }

    _handleLike() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _handleImagePopup() {
        popupImageLink.src = this._link;
        popupImageLink.alt = this._name;
        popupImageName.textContent = this._name;

        openPopup(popupImage);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__subtitle').textContent = this._name;

        return this._element;
    }
};