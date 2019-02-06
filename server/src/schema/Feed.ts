export class Feed {
    constructor(
        public id: number,
        public author: string,
        public content: string,
        public createdAt: Date,
        public status: FeedStatus
    ) {
        this.content = content;
        this.createdAt = createdAt;
        this.id = id;
        this.author = author;
        this.status = status;
    }
}

export enum FeedStatus{
    ACTIVE, DELETED
}