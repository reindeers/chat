export interface User {
  id: number,
  name: string,
  group: UserGroup
}

export enum UserGroup {
  USER, ADMIN
}
