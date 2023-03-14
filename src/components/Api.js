export class Api {

    constructor(config) {
        this.headers = config.headers;
        this.baseURL = config.baseURL;
    }
    
    createItem (item) {
         return fetch(`${this.baseURL}/cards`, {
                 headers: this.headers,
                 method: 'POST',
                 body: JSON.stringify({
                         name: item.title,
                         link: item.link,
                 })
         })
        .then(res => this._checkServerResponse(res));
     }
    
    deleteItem(id) {
        return fetch(`${this.baseURL}/cards/${id}`, {
            headers: this.headers,
            method: 'DELETE',
        })
        .then(res => this._checkServerResponse(res));
    }

    getCardList() {
        return fetch(`${this.baseURL}/cards`, {
                headers: this.headers,
                method: 'GET',
        })
        .then(res => this._checkServerResponse(res));
    }

     _checkServerResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка в запросе: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this.baseURL}/users/me`, {
            headers: this.headers,
            method: 'GET',
        })
        .then(res => this._checkServerResponse(res));
    }

    setUserInfo(data) {
        return fetch(`${this.baseURL}/users/me`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name, 
                about: data.about
            })
        })
        .then(res => this._checkServerResponse(res));
    }

    setUserAvatar(data) {
        return fetch(`${this.baseURL}/users/me/avatar`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: data.avatar, 
            })
        })
        .then(res => this._checkServerResponse(res));
    }

    putLike(id) {
        return fetch(`${this.baseURL}/cards/${id}/likes`, {
            headers: this.headers,
            method: 'PUT',
        })
        .then(res => this._checkServerResponse(res));
    }

    deleteLike(id) {
        return fetch(`${this.baseURL}/cards/${id}/likes`, {
            headers: this.headers,
            method: 'DELETE',
        })
        .then(res => this._checkServerResponse(res));
    }

}