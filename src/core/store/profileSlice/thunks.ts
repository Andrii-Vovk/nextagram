import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMyProfile } from "../../services/requests";
import ApiProfieToPropsProfile from "../../utils/ApiPorfileToPropsProfile";

 const fetchProfile = createAsyncThunk('profile/fetchProfile', async (token: string) => {
    const response = await getMyProfile(token);
    return ApiProfieToPropsProfile(response, 'Homepage');
  })

  export default fetchProfile;