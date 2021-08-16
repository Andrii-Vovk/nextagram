import { PostAnswer } from "../../typings/PostAnswer";
import { PostPropsType } from "../../ui/components/Post/Post";

function ApiPostToPropsPost(post: PostAnswer): PostPropsType {
  return {
    username: post.author.username,
    id: post.id,
    avatar: post.author.profilePhotoUrl,
    name: `${post.author.firstName} ${post.author.lastName}`,
    imageUrl: post.photos.map((entry) => entry.url),
    about: post.description,
    likes: post.likesCount,
    isliked: post.isLiked,
    time: post.createdAt ? `${post.createdAt.slice(0, -4)}+00:00` : "00:00",
    comments: []
  };
}

export default ApiPostToPropsPost;
