import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPostById, getCommentById } from "../core/services/requests";
import { setError } from "../core/store/errorSlice/errorSlice";
import { useAppDispatch, useAppSelector } from "../core/store/hooks";
import {
  changePopUp,
  changeStatus,
} from "../core/store/postPopUpSlice/postPopUpSlice";
import { setStateToPending } from "../core/store/postsSlice/postsSlice";
import fetchPosts from "../core/store/postsSlice/thunks";
import { fetchProfiles } from "../core/store/usersSlice/usersSlice";
import ApiCommentsToPropsComments from "../core/utils/ApiCommentsToPropsComments";
import ApiPostToPropsPost from "../core/utils/ApiPostToPropsPost";
import { PlaceholderProfileProps } from "../core/utils/placeholders/placeholders";
import { CommentAnswer } from "../typings/CommentAnswer";
import PostPopUp from "../ui/components/common/PostPopUp/PostPopUp";
import Navbar from "../ui/components/Navbar/Navbar";
import Post, { PostPropsType } from "../ui/components/Post/Post";
import ProfileCard from "../ui/components/ProfileCard/ProfileCard";
import Spinner from "../ui/components/spinner/Spinner";
import StoriesLine from "../ui/components/StoriesLine/StoriesLine";
import useFetchProfile from "../ui/hooks/useFetchProfile";
import styles from "../ui/style/homepage.module.scss";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.authToken);

  const allProfiles = useAppSelector((state) => state.users);
  const apiMyProfile = useAppSelector((state) => state.profile.profile);
  const myProfileStatus = useAppSelector((state) => state.profile.status);

  const allPosts = useAppSelector((state) => state.posts);

  const { post, status } = useAppSelector((state) => state.popUp);

  const [pageState, setPageState] = useState(1);

  useFetchProfile();

  useEffect(() => {
    async function getAllPostsUseEffect() {
      if (allPosts.status === "pending") {
        dispatch(fetchPosts(pageState));
        setPageState(pageState + 1);
      }
    }
    getAllPostsUseEffect();
  }, [dispatch, allPosts.status]);

  useEffect(() => {
    async function getAllProfilesUseEffect() {
      if (allProfiles.status !== "loaded" && token) {
        dispatch(fetchProfiles(token));
      }
    }
    getAllProfilesUseEffect();
  }, [dispatch, allProfiles.status, token]);

  useEffect(() => {
    async function getPopup() {
      const location = window.location;

      if (location.hash) {
        try {
          const id = parseInt(location.hash.slice(1), 10);
          const res = await getPostById(id);
          const commRes = await getCommentById(id);
          if (res) {
            const convertedRes = ApiPostToPropsPost(res);
            if (commRes)
              convertedRes.comments = commRes.map((item: CommentAnswer) =>
                ApiCommentsToPropsComments(item)
              );
            dispatch(changePopUp(convertedRes));
            dispatch(changeStatus());
          }
          if (!res) throw new Error("This post doesnt exist");
        } catch (error) {
          dispatch(setError(error.message));
        }
      }
    }

    getPopup();
  }, [dispatch]);

  return (
    <>
      {status === "opened" && post && <PostPopUp post={post} />}

      <Navbar variant="Homepage" />
      <div className={styles.layoutParent}>
        <div className={styles.layoutLeft} id="div-to-scroll">
          <StoriesLine profiles={allProfiles.profiles} />

          <InfiniteScroll
            dataLength={allPosts.posts.length}
            hasMore={!allPosts.lastPage}
            next={() => dispatch(setStateToPending())}
            loader={<Spinner />}
            endMessage={<h3>You scrolled to the bottom!</h3>}
            className={styles.noScrollbar}
          >
            {allPosts.posts.map((item: PostPropsType) => (
              <Post key={item.id} post={item} />
            ))}
          </InfiniteScroll>
        </div>
        <div className={styles.layoutRight}>
          {myProfileStatus === "loaded" ? (
            <ProfileCard
              profile={apiMyProfile || PlaceholderProfileProps}
              variant="Homepage"
            />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
