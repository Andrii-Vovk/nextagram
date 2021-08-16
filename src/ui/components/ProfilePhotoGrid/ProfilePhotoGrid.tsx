import { PostPropsType } from "../Post/Post";
import RespPhoto from "../common/ResponsivePhoto/ResponsivePhoto";

import styles from "./ProfilePhotoGrid.module.scss";

export interface ProfilePhotoGridProps {
  posts: PostPropsType[] | null;
}

const ProfilePhotoGrid: React.FC<ProfilePhotoGridProps> = ({ posts }) => {
  return (
    <>
      {(posts?.length === 0 || !posts) && (
        <h3 className={styles.noPosts}>No posts here!</h3>
      )}
      {(posts && posts.length !== 0) && <div className={styles.photoGrid}>
        {posts &&
          posts.map((item) => (
            <RespPhoto key={item.id} url={item.imageUrl[0]} />
          ))}
      </div>}
    </>
  );
};

export default ProfilePhotoGrid;
