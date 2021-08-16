import axios from "axios";
import { toCamel, toSnake } from "snake-camel";

import { CommentAnswer } from "../../typings/CommentAnswer";
import { PostAnswer } from "../../typings/PostAnswer";
import { ProfileAnswer } from "../../typings/ProfileAnswer";
import { SignUpAnswer } from "../../typings/SignUpAnswer";
import { ApiPostAttributes } from "../../ui/components/NewPostPopUp/NewPostPopUp";
import {
  ProfileCardProps,
  ProfileType,
} from "../../ui/components/ProfileCard/ProfileCard";
import ApiProfieToPropsProfile from "../utils/ApiPorfileToPropsProfile";

export const API_ADRESS = "https://linkstagram-api.ga/";

export async function getAllPosts(page = 1): Promise<PostAnswer[] | null> {
  const res = await axios.get(`${API_ADRESS}posts/?page=${page}`);
  const { data } = res;
  return data.map((item: { [key: string]: unknown }) => toCamel(item));
}

export async function getMyProfile(token: string): Promise<ProfileAnswer> {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const res = await axios.get(`${API_ADRESS}account`, config);
  return toCamel(res.data) as ProfileAnswer;
}

export async function getCommentById(
  id: number
): Promise<CommentAnswer[] | null> {
  try {
    const res = await axios.get(`${API_ADRESS}posts/${id}/comments`);

    const { data } = res;
    return data.map((item: { [key: string]: unknown }) => toCamel(item));
  } catch (error) {
    return null;
  }
}

export async function getPostById(
  id: number
): Promise<PostAnswer | null> {
  try {
    const res = await axios.get(`${API_ADRESS}posts/${id}`);

    const { data } = res;
    return toCamel(data) as PostAnswer;
  } catch (error) {
    return null;
  }
}

export async function signUpRequest(
  _email: string,
  _username: string,
  _password: string
): Promise<SignUpAnswer | null> {
  const payload = {
    login: _email,
    username: _username,
    password: _password,
  };

  try {
    const res = await axios.post(`${API_ADRESS}create-account`, payload);

    return res.data;
  } catch (error) {
    return null;
  }
}

export async function logInRequest(
  _email: string,
  _password: string
): Promise<SignUpAnswer | null> {
  const payload = {
    login: _email,
    password: _password,
  };

  try {
    const res = await axios.post(`${API_ADRESS}login`, payload);
    return {
      success: res.data.success,
      headers: { authorization: res.headers.authorization },
    };
  } catch (error) {
    return null;
  }
}

export async function updateProfile(
  profile: ProfileType,
  token: string
): Promise<ProfileType | null> {
  const config = {
    first_name: profile.firstName,
    last_name: profile.lastName,
    description: profile.description,
    job_title: profile.jobTitle,
  };

  const headers = {
    authorization: token,
  };

  try {
    const res = await axios.patch<ProfileType>(`${API_ADRESS}account`, config, {
      headers,
    });

    return toCamel(res.data) as ProfileType;
  } catch (error) {
    return null;
  }
}

export async function getUserByUsername(
  username: string,
  token: string
): Promise<ProfileCardProps | null> {
  const config = {
    headers: {
      authorization: token,
    },
  };

  try {
    const res = await axios.get<ProfileType>(
      `${API_ADRESS}profiles/${username}`,
      config
    );
    return ApiProfieToPropsProfile(
      toCamel(res.data) as ProfileAnswer,
      "Profilepage"
    );
  } catch (error) {
    return null;
  }
}

export async function getPostsByUsername(
  username: string,
  token: string
): Promise<PostAnswer[] | null> {
  const config = {
    headers: {
      authorization: token,
    },
  };

  try {
    const res = await axios.get(
      `${API_ADRESS}profiles/${username}/posts`,
      config
    );
    const { data } = res;
    return data.map((item: { [key: string]: unknown }) => toCamel(item));
  } catch (error) {
    return null;
  }
}

export async function getAllProfiles(
  token: string
): Promise<ProfileAnswer[] | null> {
  const config = {
    headers: {
      authorization: token,
    },
  };

  try {
    const res = await axios.get(`${API_ADRESS}profiles/`, config);
    const { data } = res;
    return data.map((item: { [key: string]: unknown }) => toCamel(item));
  } catch (error) {
    return null;
  }
}

export async function createPostRequest(
  post: ApiPostAttributes,
  token: string
): Promise<PostAnswer | null> {
  try {
    console.log("snaked:", toSnake(post));
    const res = await axios.post(`${API_ADRESS}posts`, toSnake(post), {
      headers: {
        authorization: token,
      },
    });
    console.log("response to post:", toCamel(res.data) as PostAnswer);
    return toCamel(res.data) as PostAnswer;
  } catch (error) {
    return null;
  }
}

export async function deletePostRequest(
  postId: number,
  token: string
): Promise<boolean> {
  try {
    await axios.delete(`${API_ADRESS}/posts/${postId}`, {
      headers: {
        authorization: token,
      },
    });
    return true
  } catch (error) {
    return false;
  }
}

export async function setLike(postId: number, token: string): Promise<boolean> {
  try {
    await axios.post(
      `${API_ADRESS}/posts/${postId}/like`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    return true;
  } catch (error) {
    return false;
  }
}

export async function removeLike(
  postId: number,
  token: string
): Promise<boolean> {
  try {
    await axios.delete(`${API_ADRESS}/posts/${postId}/like`, {
      headers: {
        authorization: token,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}


export async function postComment(
  comment: string,
  postId: number,
  token: string
): Promise<boolean> {
  try {
    await axios.post(`${API_ADRESS}posts/${postId}/comments`, {message: comment}, {
      headers: {
        authorization: token,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}