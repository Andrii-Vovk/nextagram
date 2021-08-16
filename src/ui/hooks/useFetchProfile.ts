import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import fetchProfile from "../../core/store/profileSlice/thunks";

const useFetchProfile = (): void => {
  const token = useAppSelector((state) => state.auth.authToken);
  const ProfileStatus = useAppSelector((state) => state.profile.status);

  const dispatch = useAppDispatch();
  if (ProfileStatus !== "loaded" && token) {
    dispatch(fetchProfile(token));
  }
};

export default useFetchProfile;
