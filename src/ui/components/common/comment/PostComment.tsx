import classNames from "classnames";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";

import { useAppDispatch, useAppSelector } from "../../../../core/store/hooks";
import Avatar from "../../StoriesAvatar/StoriesAvatar";
import Spinner from "../../spinner/Spinner";

import styles from "./PostComment.module.scss";
import { resendComment } from "../../../../core/store/postPopUpSlice/thunks";

export interface CommentProps {
  username?: string;
  id: number;
  avatar?: string | null;
  time: Date;
  text: string;
  likes: number;
  isLiked: boolean;
  isPending?: boolean;
  isError?: boolean;
}

const PostComment: React.FC<CommentProps> = ({
  id,
  avatar,
  text,
  time,
  isPending,
  isError,
  username,
}) => {
  const [localUsername, setLocalUsername] = useState(username);
  const myAvatar = useAppSelector(
    (state) => state.profile.profile?.avatar?.url
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLocalUsername(username);
  }, [username]);

  return (
    <div className={styles.commentWrapper}>
      <span hidden className={styles.commentId}>
        {id}
      </span>
      <div className={styles.leftCommentPart}>
        <div className={styles.commentAvatar}>
          <Avatar
            url={localUsername ? avatar : myAvatar}
            style={{ width: 40, height: 40 }}
          />
        </div>
        <p className={styles.commentText}>{text}</p>
        <p className={classNames([styles.time, "subtext"])}>
          <ReactTimeAgo date={time} locale="en-US" />
        </p>
      </div>
      {isPending && !isError && <Spinner small />}
      {isError && (
        <button
          className={styles.redoButton}
          type="button"
          onClick={() => dispatch(resendComment({ id, text }))}
        >
          <i className="fas fa-redo" />
        </button>
      )}
    </div>
  );
};

export default PostComment;
