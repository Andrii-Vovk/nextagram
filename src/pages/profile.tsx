import React, { useEffect, useState } from "react";
import { getPostsByUsername } from "../core/services/requests";

import { useAppSelector } from "../core/store/hooks";
import ApiPostToPropsPost from "../core/utils/ApiPostToPropsPost";
import { PlaceholderProfileProps } from "../core/utils/placeholders/placeholders";
import Navbar from "../ui/components/Navbar/Navbar";
import { PostPropsType } from "../ui/components/Post/Post";
import ProfileCard from "../ui/components/ProfileCard/ProfileCard";
import ProfilePhotoGrid from "../ui/components/ProfilePhotoGrid/ProfilePhotoGrid";
import useFetchProfile from "../ui/hooks/useFetchProfile";
import styles from "../ui/style/profilepage.module.scss";

const ProfilePage: React.FC = () => {
  

  const myProfile = useAppSelector((state) => state.profile.profile);
  const token = useAppSelector((state) => state.auth.authToken)

  const [posts, setPosts] = useState<PostPropsType[] | null>(null);


  useFetchProfile();

  useEffect(() => {
    async function getPosts() {
      if(myProfile?.username && token) {

        const apiPosts = await getPostsByUsername(myProfile?.username, token)
        if (apiPosts) {
          const convertedPosts = apiPosts?.map((item) =>
            ApiPostToPropsPost(item)
          );
          setPosts(convertedPosts);
        }
      }
    }

    getPosts()
  }, [])

  return (
    <>
      <Navbar variant="Profilepage" />
      <ProfileCard
        profile={myProfile || PlaceholderProfileProps}
        variant="Profilepage"
      />
      <div className={styles.gridWrapper}>
        <ProfilePhotoGrid posts={posts} />
      </div>
    </>
  );
};

export default ProfilePage;
