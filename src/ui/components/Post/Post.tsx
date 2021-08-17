import classNames from "classnames";
import { useEffect, useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactTimeAgo from "react-time-ago";

import {
  deletePostRequest,
  getCommentById,
  removeLike,
  setLike,
} from "../../../core/services/requests";
import { useAppDispatch, useAppSelector } from "../../../core/store/hooks";
import { changePopUp, changeStatus } from "../../../core/store/postPopUpSlice/postPopUpSlice";
import { removePost } from "../../../core/store/postsSlice/postsSlice";
import ApiCommentsToPropsComments from "../../../core/utils/ApiCommentsToPropsComments";
import ImageRotator from "../ImageRotator/ImageRotator";
import Avatar from "../StoriesAvatar/StoriesAvatar";
import DropDown from "../common/DropDown/DropDown";
import PostComment, { CommentProps } from "../common/comment/PostComment";
import thousandstoK from "../common/functions";

import styles from "./Post.module.scss";


export type PostPropsType = {
  username?: string;
  id: number;
  name: string;
  time: string;
  avatar: string;
  imageUrl: string[];
  about: string;
  likes: number;
  isliked: boolean;
  comments: CommentProps[];
};

export interface PostProps {
  post: PostPropsType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const [isLiked, setIsLiked] = useState(post.isliked);
  const [likes, setLikes] = useState(post.likes);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [showCommments, setShowComments] = useState(false);

  const author = useAppSelector((state) => state.profile.profile?.username);
  const token = useAppSelector((state) => state.auth.authToken);

  const [commentAnswer, setcommentAnswer] = useState<CommentProps[]>([]);

  const date = new Date(post.time);

  async function handleDelete() {
    if (post.id && token) {
      const res = await deletePostRequest(post.id, token);
      if (res) {
        dispatch(removePost(post.id));
      }
    }
  }


  const dropDownData =
    author === post.username
      ? [{ index: 0, text: "Delete", onClick: handleDelete }]
      : [];

  useEffect(() => {
    async function getAllCommentsUseEffect() {
      const apiComments = await getCommentById(post.id);
      if (apiComments && apiComments[0]) {
        setcommentAnswer(
          apiComments.map((item) => ApiCommentsToPropsComments(item))
        );
      }
    }
    
    getAllCommentsUseEffect();
  }, [post.id]);

  const convertedPostProps = {
    ...post,
    comments: commentAnswer,
  };

  async function handleLikeClick() {
    if (!isLiked && token) {
      const response = await setLike(post.id, token);
      if (response) {
        setIsLiked(!isLiked);
        setLikes(likes + 1);
      }
    } else if (isLiked && token) {
      const response = await removeLike(post.id, token);
      if (response) {
        setIsLiked(!isLiked);
        setLikes(likes - 1);
      }
    }
  }


  const [bufferVisible, setBufferVisible] = useState(false);

  function handleShare() {
    setBufferVisible(true);
    setTimeout(() => {
      setBufferVisible(false);
    }, 1500);
  }

  function togglePopUp() {
    setIsPopUpVisible(!isPopUpVisible);

    dispatch(changePopUp({...convertedPostProps, likes, isliked: isLiked}));
    dispatch(changeStatus());
  }

  return (
    <>
      <div className={styles.postWrapper}>
        <div className={styles.titleBar}>
          <div className={styles.titleBarLeft}>
            <Avatar url={post.avatar} style={{ width: 40, height: 40 }} />
            <div className={styles.titleText}>
              <h3>{post.name}</h3>
              <span className="subtext">
                <ReactTimeAgo date={date} locale="en-US" />
              </span>
            </div>
          </div>
          <div className={styles.titleBarRight}>
            <DropDown dropdown={dropDownData} />
          </div>
        </div>

        <div className={styles.rotator}>
          <div
            className={classNames([
              styles.bufferOverlay,
              { [styles.bufferVisible]: bufferVisible },
            ])}
          >
            <p>Copied to clipboard</p>
          </div>
          <ImageRotator post={post} imageClickFunc={togglePopUp} />
        </div>

        <p className={styles.postAbout}>{post.about}</p>

        <div className={styles.postFooter}>
          <div className={styles.leftFooterPart}>
            <div
              className={classNames([
                styles.likeWrapper,
                { [styles.hideLikes]: showCommments },
              ])}
            >
              <button className={styles.flexBtn} type="button" onClick={() => handleLikeClick()}>
                <i
                  className={classNames([
                    "fas",
                    "fa-heart",
                    styles.heartMargin,
                    { [styles.redHeart]: isLiked },
                  ])}
                  role="button"
                />
                <div role="button" className={styles.likeCounter}>
                  <h3>{thousandstoK(likes)}</h3>
                </div>
              </button>
            </div>
            <button
              className={classNames([styles.commentCountWrapper, styles.flexBtn])}
              onClick={() => setShowComments(!showCommments)}
              type="button"
            >
              <svg
                className={styles.commentSvg}
                width="16"
                height="19"
                viewBox="0 0 16 19"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.75 15.75C11.8921 15.75 15.25 12.3921 15.25 8.25C15.25 4.10786 11.8921 0.75 7.75 0.75C3.60786
                   0.75 0.25 4.10786 0.25 8.25V16.25C0.25 17.8981 2.13153 18.8389 3.45 17.85L5.71667 
                   16.15C6.06286 15.8904
                    6.48393 15.75 6.91667 15.75H7.75Z"
                  fill="currentColor"
                />
              </svg>
              <h3 className={styles.commentCounter}>
                {thousandstoK(
                  commentAnswer !== undefined ? commentAnswer.length : 0
                )}
              </h3>
            </button>
          </div>
          <div className={styles.rightFooterPart}>
            <CopyToClipboard text={`${window.location.host  }/#${  post.id}`}>
              <button
                type="button"
                onClick={handleShare}
                className={styles.shareLink}
              >
                Share
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div
          className={classNames([
            styles.postHiddenComments,
            { [styles.comeOut]: showCommments },
          ])}
        >
          {commentAnswer &&
            commentAnswer.map((item) => (
              <PostComment
                id={item.id}
                avatar={item.avatar}
                text={item.text}
                isLiked={item.isLiked}
                likes={item.likes}
                time={item.time}
                key={item.id}
                username={item.username}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Post;
