import classNames from "classnames";
import { CSSProperties } from "react";

import styles from "./StoriesAvatar.module.scss";

export interface AvatarProps {
  url?: string | null;
  bordered?: boolean;
  withPlus?: boolean;
  style?: CSSProperties;
  onClick?: (where: string) => unknown;
  username?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  url,
  bordered,
  withPlus,
  style,
  onClick,
  username
}) => {

  const classes = classNames([
    styles.avatarContainer,
    {
      [styles.avatarContainerBordered]: bordered,
      [styles.avatarWithPlus]: withPlus,
    },
  ]);

 return (
      <div
        onClick={onClick ? () => onClick(`/profiles/${username}` || '/') : undefined}
        onKeyDown={onClick ? () => onClick(`/profiles/${username}` || '/') : undefined}
        tabIndex={0}
        role="button"
        className={classes}
        style={style}
      >
        <img
          src={url || "https://via.placeholder.com/400"}
          alt="Avatar"
          className={styles.storiesAvatar}
        />
      </div>
  );
};

export default Avatar;
