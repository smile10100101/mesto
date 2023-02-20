export class UserInfo {

    constructor({name, job}) {
        this._userName = name;
        this._userJob = job;
    }
    
    getUserInfo() {
        const userData = {
            name: this._userName.textContent,
            job: this._userJob.textContent
        }
        return userData;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about;
    }
}

