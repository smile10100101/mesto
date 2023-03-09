export class Card {
    constructor(data, templateSelector, handleCardClick, handleCardDelete, handleCardLike, userId) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleCardLike = handleCardLike;
        this._userId = userId;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._isLike = false;
        this._likes = data.likes;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._trashButton.addEventListener('click', () => {
            this._handleCardDelete(this, this._cardId);
        });

        this._likeButton.addEventListener('click', () => {
            this._handleCardLike(this, this._cardId);
        });
     
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._link, this._name)
        });
    }

    _clickLikeButton() {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    get isLike() {
        return this._isLike;
    }

    getLikes(likes) {
        this._likes = likes;
        this._likesBox.textContent = this._likes.length;
    }

    toggleLike() {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    toggleIsLike(){
        this._isLike = !this._isLike;
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardName = this._element.querySelector('.element__subtitle');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._trashButton = this._element.querySelector('.element__trash-button');
        this._likesBox = this._element.querySelector('.element__like-box');
        
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;
        this._likesBox.textContent = this._likes.length;

        if (this._userId !== this._ownerId) {
            this._trashButton.remove();
        }

        if (this._likes.some(item => item._id === this._userId)) {
            this._likeButton.classList.add('element__like-button_active');
            this._isLike = true;
        }

        this._setEventListeners();

        return this._element;
    }
};

