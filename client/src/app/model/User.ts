export interface User {
  id: number,
  name: string,
  group: UserGroup,
  counter: number,
  lastLogin: Date
}

export enum UserGroup {
  USER, ADMIN
}
