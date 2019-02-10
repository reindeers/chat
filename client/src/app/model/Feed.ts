export interface Feed {
  id: number,
  author: string,
  authorId: number,
  content: string,
  createdAt: Date,
  status: FeedStatus
}

export enum FeedStatus {
  ACTIVE = "ACTIVE", DELETED = "DELETED"
}
