export class User {
    public constructor(id: number,
                       public name: string,
                       public group: UserGroup,
                       public counter: number) {
        this.name = name;
        this.group = group;
        this.counter = counter;
    }
}

export enum UserGroup {
    USER, ADMIN
}

//todo: вынести общие классы в shared модуль?
