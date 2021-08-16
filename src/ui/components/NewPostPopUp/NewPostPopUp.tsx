/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AwsS3 from "@uppy/aws-s3";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";
import React, { useState } from "react";

import { API_ADRESS, createPostRequest } from "../../../core/services/requests";
import { useAppDispatch, useAppSelector } from "../../../core/store/hooks";
import buttons from "../../style/buttons.module.scss";

import styles from "./styles.module.scss";

import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { addPost } from "../../../core/store/postsSlice/postsSlice";
import ApiPostToPropsPost from "../../../core/utils/ApiPostToPropsPost";

interface PopUpProps {
  closeFunc(): void;
}

interface PhotoAttributes {
  image: {
    id?: string;
    storage: string;
    metadata: {
      filename: string;
      size: number;
      mimeType?: string;
    };
  };
}

export interface ApiPostAttributes {
  post: { description?: string; photosAttributes?: PhotoAttributes[] };
}

const NewPostPopUp: React.FC<PopUpProps> = ({ closeFunc }) => {
  const [postAttributes, setPostAttributes] = useState<
    PhotoAttributes[] | null
  >(null);

  const [description, setDescription] = useState("");

  const token = useAppSelector((state) => state.auth.authToken);

  const dispatch = useAppDispatch();


  const uppy = Uppy<Uppy.StrictTypes>({
    meta: { type: "[photo]" },
    restrictions: { maxNumberOfFiles: 5 },
    autoProceed: true,
  });

  uppy.use(AwsS3, {
    companionUrl: API_ADRESS,
  });

  uppy.on("complete", (result: { successful: any[]; }) => {
    console.log('successful uppy result', result.successful)
    const photoAttributes: PhotoAttributes[] = result.successful.map(
      (item) => ({
        image: {
          id: item.id,
          storage: 'cache',
          metadata: {
            filename: item.name,
            size: item.size,
            mimeType: item.type,
          },
        },
      })
    );
    console.log(photoAttributes);
    setPostAttributes(photoAttributes);
  });

  async function handleSubmit(e: React.SyntheticEvent) {
    e?.preventDefault();

    if (postAttributes && postAttributes?.length > 0 && token) {
      const postArgs: ApiPostAttributes = {
        post: { description, photosAttributes: postAttributes },
      };
      console.log("inside function!", postArgs);

      const res = await createPostRequest(postArgs, token);
      console.log("dispatching!", res);
      if(res) {
        dispatch(addPost(ApiPostToPropsPost(res)));
      }
    }
    closeFunc();
  }

  return (
    <>
      <button
        className={styles.grayOverlay}
        onClick={closeFunc}
        type="button"
      />
      <div className={styles.wrapper}>
        <div id="photo-area" className={styles.photoWrapper}>
          <DragDrop uppy={uppy} />
        </div>

        <form
          action="/"
          className={styles.form}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="description">
            Description
            <textarea
              name="description"
              id="description"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
          </label>
          <div className={styles.buttons}>
            <button
              type="button"
              className={buttons.whiteBtn}
              onClick={closeFunc}
            >
              Cancel
            </button>
            <button type="submit" className={buttons.blueBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPostPopUp;
