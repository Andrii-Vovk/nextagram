/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import { PostPropsType } from "../Post/Post";
import RespPhoto from "../common/ResponsivePhoto/ResponsivePhoto";

import styles from "./ImageRotator.module.scss";

export interface ImageRotatorProps {
  post: PostPropsType;
  imageClickFunc?: () => void;
}

const ImageRotator: React.FC<ImageRotatorProps> = ({
  post,
  imageClickFunc,
}) => {
  const [postState, setPostState] = useState(post);
  const [currentPhotoId, setCurrentPhotoId] = useState(0);

  function handleAdd() {
    setCurrentPhotoId((currentPhotoId + 1) % postState.imageUrl.length);
  }

  function handleSubtract() {
    currentPhotoId - 1 < 0
      ? setCurrentPhotoId(post.imageUrl.length - 1)
      : setCurrentPhotoId(currentPhotoId - 1);
  }

  return (
    <div className={styles.wrapper}>
      <RespPhoto url={post.imageUrl[currentPhotoId]} onClick={imageClickFunc} />
      {post.imageUrl.length > 1 && (
        <>
          <button
            className={styles.leftButton}
            type="button"
            onClick={handleSubtract}
          />
          <button
            className={styles.rightButton}
            type="button"
            onClick={handleAdd}
          />
        </>
      )}
    </div>
  );
};

export default ImageRotator;
