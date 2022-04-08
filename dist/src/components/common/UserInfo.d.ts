export default class UserInfo {
    userId: string;
    displayName: string;
    email: string;
    UserActiveDirectoryID: string;
    UserDisplayName: string;
    Email: string;
    constructor(userId: string, displayName: string, email: string);
    getUserDisplayName(): string;
    getUserEmail(): string;
}
