import { createAsyncThunk } from "@reduxjs/toolkit";

import { PostAnswer } from "../../../typings/PostAnswer";
import { getAllPosts } from "../../services/requests";
import ApiPostToPropsPost from "../../utils/ApiPostToPropsPost";

const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    async (page: number = 1) => {
      const response = await getAllPosts(page);
      return {
        post: response?.map((item: PostAnswer) => ApiPostToPropsPost(item)),
      };
    }
  );
  
  export default fetchPosts;