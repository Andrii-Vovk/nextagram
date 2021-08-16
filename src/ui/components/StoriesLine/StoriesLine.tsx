/* eslint-disable react/no-array-index-key */
import { useRouter } from "next/dist/client/router";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";
import Avatar from "../StoriesAvatar/StoriesAvatar";

import styles from "./StoriesLine.module.scss";

export interface StoriesLineProps {
  profiles?: ProfileCardProps[];
}

const StoriesLine: React.FC<StoriesLineProps> = ({ profiles }) => {
  let arr: React.HTMLProps<HTMLElement>[] = [];

  const history = useRouter();

  function redirectTo(where: string) {
    history.push(where);
  }

  if (profiles) {
    arr = profiles.map((item, index) => (
      <li key={index}>
        <Avatar
          url={item.profile.avatar?.url || null}
          bordered
          onClick={redirectTo}
          username={item.profile.username}
        />
      </li>
    ));
  }
  return (
    <>
      <div className={styles.storiesGridWrapper}>
        <ul className={styles.storiesGrid}>{arr}</ul>
      </div>
    </>
  );
};

export default StoriesLine;
