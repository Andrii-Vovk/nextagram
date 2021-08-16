import { ProfileAnswer } from "../../typings/ProfileAnswer";
import { ProfileCardProps } from "../../ui/components/ProfileCard/ProfileCard";

function ApiProfieToPropsProfile(
    profile: ProfileAnswer,
    variant: "Homepage" | "Profilepage"
  ): ProfileCardProps {
    let ConvertedProfile: ProfileCardProps | null = null;
  
    const convertedAvatar = profile?.profilePhotoUrl
      ? {
          url: profile?.profilePhotoUrl,
          bordered: true,
          withPlus: true,
          style: { height: 88, width: 88 },
        }
      : {
          url: "https://via.placeholder.com/88",
          bordered: true,
          withPlus: true,
          style: { height: 88, width: 88 },
        };
  
    if (profile) {
      ConvertedProfile = {
        profile: {
          followers: profile.followers,
          following: profile.following,
          firstName: profile.firstName ? profile.firstName : "",
          lastName: profile.lastName ? profile.lastName : "",
          jobTitle: profile.jobTitle,
          description: profile.description,
          avatar: convertedAvatar,
          username: profile.username
        },
        variant,
      };
    }
  
    return ConvertedProfile as ProfileCardProps;
  }

export default ApiProfieToPropsProfile;