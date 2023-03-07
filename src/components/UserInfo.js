export class UserInfo {

    constructor({name, job, avatar, _id}) {
        this._userName = name;
        this._userJob = job;
        this._avatar = avatar;
        this._id = _id;
    }
    
    getUserInfo() {
        const userData = {
            name: this._userName.textContent,
            job: this._userJob.textContent,
            avatar: this._avatar.src
        }
        return userData;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about;
    }

    getUserId() {
        return this._id;
    }
}

