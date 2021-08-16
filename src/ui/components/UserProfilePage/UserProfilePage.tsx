import { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  getPostsByUsername,
  getUserByUsername,
} from "../../../core/services/requests";
import { useAppSelector } from "../../../core/store/hooks";
import ApiPostToPropsPost from "../../../core/utils/ApiPostToPropsPost";
import { PlaceholderProfileProps } from "../../../core/utils/placeholders/placeholders";
import Navbar from "../Navbar/Navbar";
import { PostPropsType } from "../Post/Post";
import ProfileCard, { ProfileCardProps } from "../ProfileCard/ProfileCard";
import ProfilePhotoGrid from "../ProfilePhotoGrid/ProfilePhotoGrid";
import Spinner from "../spinner/Spinner";

const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const [profile, setProfile] = useState<ProfileCardProps | null>(null);
  const [posts, setPosts] = useState<PostPropsType[] | null>(null);
  const [error, setError] = useState<string | null>(null)

  const token = useAppSelector((state) => state.auth.authToken);

  useEffect(() => {
    async function getData() {
      if (token) {
        const apiProfile = await getUserByUsername(username, token);
        if(!apiProfile) setError("Error");
        setProfile(apiProfile);

        const apiPosts = await getPostsByUsername(username, token);
        if (apiPosts) {
          const convertedPosts = apiPosts?.map((item) =>
            ApiPostToPropsPost(item)
          );
          setPosts(convertedPosts);
        }
      }
    }

    getData();
  }, [token, username]);

  return (
    <>
      <Navbar variant="Profilepage" />
      {profile && (
        <>
          <ProfileCard
            profile={profile?.profile || PlaceholderProfileProps}
            variant="Profilepage"
          />
          <div className="grid-wrapper">
            <ProfilePhotoGrid posts={posts} />
          </div>
        </>
      )}
      {error === null ? !profile && <Spinner /> : <h3>User Not Found</h3>}
    </>
  );
};

export default UserProfilePage;
