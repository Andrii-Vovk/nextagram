import { useEffect, useState } from "react";

import { updateProfile } from "../../../core/services/requests";
import { useAppSelector } from "../../../core/store/hooks";
import buttons from "../../style/buttons.module.scss";
import EditPopUp from "../EditPopUp/EditPopUp";
import NewPostPopUp from "../NewPostPopUp/NewPostPopUp";
import Avatar, { AvatarProps } from "../StoriesAvatar/StoriesAvatar";
import thousandstoK from "../common/functions";

import styles from "./ProfileCard.module.scss";

export type ProfileType = {
  followers: number;
  following: number;
  firstName: string;
  lastName: string;
  jobTitle?: string;
  description?: string;
  avatar?: AvatarProps;
  username?: string;
};

export interface ProfileCardProps {
  profile: ProfileType;
  variant?: "Homepage" | "Profilepage";
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, variant }) => {
  const [profileState, setProfileState] = useState(profile);

  useEffect(() => {
    setProfileState(profile);
  }, [profile]);

  const showLinks = variant === "Homepage";

  const token = useAppSelector((state) => state.auth.authToken);

  const [isEditPopUpShown, setIsEditPopUpShown] = useState(false);
  const [isNewPopUpShown, setIsNewPopUpShown] = useState(false);

  function closeFunc() {
    setIsEditPopUpShown(!isEditPopUpShown);
  }
  function closeNewPostFunc() {
    setIsNewPopUpShown(!isNewPopUpShown);
  }

  async function updateProfileRequest(
    requestProfile: ProfileType
  ): Promise<void> {

    let res: ProfileType | null = null; 

    if (token) {
      res = await updateProfile(requestProfile, token);
    }

    if (res) {
      res.avatar = profileState.avatar;
      setProfileState(res);
    }
  }

  return (
    <>
      {isNewPopUpShown && <NewPostPopUp closeFunc={closeNewPostFunc} />}

      {isEditPopUpShown && (
        <EditPopUp
          profile={profileState}
          closeFunc={closeFunc}
          updateFunc={updateProfileRequest}
        />
      )}
      <div className={styles.profileCardWrapper}>
        <div className={styles.firstLine}>
          <div className={styles.followersPart}>
            <h3>{thousandstoK(profileState.followers)}</h3>
            <h4>Followers</h4>
          </div>
          <Avatar
            url={
              profileState.avatar
                ? profileState.avatar.url
                : "https://via.placeholder.com/150"
            }
            bordered
            withPlus
            style={
              profileState.avatar
                ? profileState.avatar.style
                : { width: 88, height: 88 }
            }
          />
          <div className={styles.followersPart}>
            <h3>{thousandstoK(profileState.following)}</h3>
            <h4>Following</h4>
          </div>
        </div>

        <div className={styles.secondLine}>
          {profile.jobTitle && (
            <h3>{`${profileState.firstName} ${profileState.lastName} - ${profileState.jobTitle}`}</h3>
          )}
          {!profile.jobTitle && (
            <h3>{`${profileState.firstName} ${profileState.lastName}`}</h3>
          )}
        </div>

        <div className={styles.thirdLine}>
          <p>{profileState.description}</p>
        </div>

        <div className={styles.forthLine}>
          <button
            type="button"
            onClick={() => closeFunc()}
            className={buttons.whiteBtn}
          >
            Edit Profile
          </button>
          <button
            type="button"
            className={buttons.blueBtn}
            onClick={closeNewPostFunc}
          >
            New Post
          </button>
        </div>

        {showLinks && (
          <>
            <div className={styles.refs}>
              <a href="https://google.com">About</a>
              <a href="https://google.com">Help</a>
              <a href="https://google.com">Privacy</a>
              <a href="https://google.com">Terms</a>
              <a href="https://google.com">Locations</a>
              <a href="https://google.com">Language</a>
            </div>
            <div className={styles.refs}>
              <a href="https://google.com">&copy; 2020 Linkstagram</a>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
