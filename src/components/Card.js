export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._trushButton.addEventListener('click', () => {
            this._handleDelete();
        });

        this._likeButton.addEventListener('click', () => {
            this._handleLike();
        });
     
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name)
        });
    }

    _handleDelete() {
        this._element.remove();
        this._element = null;
    }

    _handleLike() {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardName = this._element.querySelector('.element__subtitle');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._trushButton = this._element.querySelector('.element__trash-button');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
};

