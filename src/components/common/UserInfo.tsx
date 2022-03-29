export default class UserInfo {
    UserActiveDirectoryID: string;
    UserDisplayName: string;
    Email: string;

    constructor(public userId: string, public displayName: string, public email: string) {
        this.UserActiveDirectoryID = userId;
        this.UserDisplayName = displayName;
        this.Email = email;
    }

    getUserDisplayName() {
        return this.UserDisplayName;
    }

    getUserEmail() {
        return this.Email;
    }
}