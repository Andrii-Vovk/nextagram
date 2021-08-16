import { CommentAnswer } from "./CommentAnswer";
import { PostAnswer } from "./PostAnswer";

export interface PostWithComment {
    post: PostAnswer;
    comments: CommentAnswer[];
}