import classNames from "classnames";
import React, { useEffect, useState } from "react";

import {
  removeLike,
  setLike,
} from "../../../../core/services/requests";
import { useAppDispatch, useAppSelector } from "../../../../core/store/hooks";
import {
  changeStatus,
} from "../../../../core/store/postPopUpSlice/postPopUpSlice";
import { addComment } from "../../../../core/store/postPopUpSlice/thunks";
import ImageRotator from "../../ImageRotator/ImageRotator";
import { PostProps } from "../../Post/Post";
import Avatar from "../../StoriesAvatar/StoriesAvatar";
import PostComment, { CommentProps } from "../comment/PostComment";
import thousandstoK from "../functions";

import styles from "./PostPopUp.module.scss";

const PostPopUp: React.FC<PostProps> = ({ post }) => {
  const [postState, setPostState] = useState(post);
  const [liked, setLiked] = useState(post.isliked);
  const [likes, setLikes] = useState(post.likes);

  const [comment, setComment] = useState("");

  const token = useAppSelector((state) => state.auth.authToken);
  const comments = useAppSelector((state) => state.popUp.post?.comments)


  useEffect(() => {
    setPostState(post);
    setLiked(post.isliked);
    setLikes(post.likes);
  }, [post, postState]);

  async function handleLikeClick() {
    if (!liked && token) {
      const response = await setLike(post.id, token);
      if (response) {
        setLiked(!liked);
        setLikes(likes + 1);
      }
    } else if (liked && token) {
      const response = await removeLike(post.id, token);
      if (response) {
        setLiked(!liked);
        setLikes(likes - 1);
      }
    }
  }

  const dispatch = useAppDispatch();

  function closeFunc() {
    dispatch(changeStatus());
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    dispatch(addComment(comment))
    setComment('');
  }

  return (
    <>
      <div className={styles.popupWrapper}>
        <div
          onClick={() => closeFunc()}
          className={styles.grayOverlay}
          onKeyDown={() => closeFunc()}
          tabIndex={0}
          role="button"
        />
        <div className={styles.postPopUpWrapper}>
          <span className={styles.postPhoto}>
            <ImageRotator post={postState} />
          </span>
          <div className={styles.titleGridCell}>
            <div className={styles.titleWrapper}>
              <Avatar
                url={postState.avatar}
                style={{ width: 40, height: 40 }}
              />
              <h3>{postState.name}</h3>
            </div>
            <span
              onClick={() => closeFunc()}
              className={styles.crossButton}
              onKeyDown={() => closeFunc()}
              tabIndex={0}
              role="button"
            />
          </div>
          <div className={styles.commentsGridCell}>
            {comments &&
              comments.map((item: CommentProps) => (
                <PostComment
                  id={item.id}
                  key={item.id}
                  text={item.text}
                  avatar={item.avatar}
                  likes={item.likes}
                  time={item.time}
                  isLiked={item.isLiked}
                  isPending={item.isPending}
                  isError={item.isError}
                  username={item.username}
                />
              ))}
          </div>
          <div className={styles.likesGridCell}>
            <div className={styles.centered}>
              <button
                className={styles.flexBtn}
                type="button"
                onClick={handleLikeClick}
              >
                <i
                  className={classNames([
                    "fas",
                    "fa-heart",
                    styles.heartMargin,
                    { [styles.redHeart]: liked },
                  ])}
                  role="button"
                />
                <div role="button" className={styles.likeCounter}>
                  <h3>{thousandstoK(likes)}</h3>
                </div>
              </button>
            </div>
          </div>
          <div className={styles.inputsGridCell}>
            <form action="" onSubmit={handleSubmit}>
              <input
                className={styles.commentInput}
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit" className="pseudolink">
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPopUp;
