import { CommentAnswer } from "../../typings/CommentAnswer";
import { CommentProps } from "../../ui/components/common/comment/PostComment";

export default function ApiCommentsToPropsComments(
  comment: CommentAnswer
): CommentProps {
    return {
        id: comment.id,
        username: comment.commenter.username,
        avatar: comment.commenter.profilePhotoUrl,
        isLiked: false,
        likes: 0,
        text: comment.message,
        time: new Date(comment.createdAt ? `${comment.createdAt.slice(0, -4)}+00:00` : 0),
    }
  }

