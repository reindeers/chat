export class User {
    public constructor(id: number,
                       public name: string,
                       public group: UserGroup,
                       public counter: number,
                       public lastLogin: Date) {
        this.name = name;
        this.group = group;
        this.counter = counter;
        this.lastLogin = lastLogin;
    }
}

export enum UserGroup {
    USER, ADMIN
}

//todo: вынести общие классы в shared модуль?
