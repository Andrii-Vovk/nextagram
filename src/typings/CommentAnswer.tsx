import { Person } from "./PostAnswer"

export interface CommentAnswer {
    id: number;
    commenter: Person;
    createdAt: string;
    message: string;
}