export interface Tweet {
    userId: number;
    id: number;
    title: string;
    body: string;
    fakeName: string;
}

export interface ResolvedPostDetails {
    value: Tweet;
    error: Error | null;
}
