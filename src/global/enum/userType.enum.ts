const UserEnum = ['ADMIN', 'USER'];
class UserType {
    static ADMIN: string = 'ADMIN';
    static USER: string = 'USER';
    static COMPANIES: string = 'COMPANIES';

    static getStr(en: string): string {
        switch (en) {
            case UserType.ADMIN:
                return 'Admin';
                break;
            case UserType.USER:
                return 'User';
                break;
            default:
                return '';
                break;
        }
    }

    static getModel(en: string): string {
        switch (en) {
            case UserType.ADMIN:
                return 'Admin';
                break;
            case UserType.USER:
                return 'User';
                break;
            default:
                return '';
                break;
        }
    }
}

export { UserType, UserEnum };