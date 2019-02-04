export interface Feed {
  id: number,
  author: string,
  content: string,
  createdAt: Date,
  status: FeedStatus
}

export enum FeedStatus{
  ACTIVE, DELETED
}
