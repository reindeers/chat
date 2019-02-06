export interface User {
  id: number,
  name: string,
  group: UserGroup,
  counter: number,
}

export enum UserGroup {
  USER, ADMIN
}
