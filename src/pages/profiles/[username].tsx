import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

import { getUserByUsername, getPostsByUsername } from "../../core/services/requests";
import { useAppSelector } from "../../core/store/hooks";
import ApiPostToPropsPost from "../../core/utils/ApiPostToPropsPost";
import { PlaceholderProfileProps } from "../../core/utils/placeholders/placeholders";
import Navbar from "../../ui/components/Navbar/Navbar";
import { PostPropsType } from "../../ui/components/Post/Post";
import ProfileCard, { ProfileCardProps } from "../../ui/components/ProfileCard/ProfileCard";
import ProfilePhotoGrid from "../../ui/components/ProfilePhotoGrid/ProfilePhotoGrid";
import Spinner from "../../ui/components/spinner/Spinner";
import styles from "../../ui/style/profilepage.module.scss";


const UserProfilePage: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const stringUsername = username as string;

  const [profile, setProfile] = useState<ProfileCardProps | null>(null);
  const [posts, setPosts] = useState<PostPropsType[] | null>(null);
  const [error, setError] = useState<string | null>(null)

  const token = useAppSelector((state) => state.auth.authToken);

  useEffect(() => {
    async function getData() {
      if (token && username) {
        const apiProfile = await getUserByUsername(stringUsername, token);
        if(!apiProfile) setError("Error");
        setProfile(apiProfile);

        const apiPosts = await getPostsByUsername(stringUsername, token);
        if (apiPosts) {
          const convertedPosts = apiPosts?.map((item) =>
            ApiPostToPropsPost(item)
          );
          setPosts(convertedPosts);
        }
      }
    }

    getData();
  }, [token, stringUsername, username]);

  return (
    <>
      <Navbar variant="Profilepage" />
      {profile && (
        <>
          <ProfileCard
            profile={profile?.profile || PlaceholderProfileProps}
            variant="Profilepage"
          />
          <div className={styles.gridWrapper}>
            <ProfilePhotoGrid posts={posts} />
          </div>
        </>
      )}
      {error === null ? !profile && <Spinner /> : !profile && <h3>User Not Found</h3>}
    </>
  );
};

export default UserProfilePage;
