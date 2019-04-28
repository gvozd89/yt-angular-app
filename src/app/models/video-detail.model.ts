export class VideoDetail {
    public id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    channelTitle: string;
    channelId: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.description = obj && obj.description || null;
        this.thumbnailUrl = obj && obj.thumbnailUrl || null;
        this.channelTitle = obj && obj.channelTitle || null;
        this.channelId = obj && obj.channelId || null;
    }
}