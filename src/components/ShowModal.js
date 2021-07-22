import React, { useEffect, useState } from "react";
import "../css/ShowModal.css";
import Post from "./Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, getPosts, getPostId } from "../features/modal";
import { fetchMorePosts } from "../features/modal";

function ShowModal() {
  const dispatch = useDispatch();
  const [loding, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const postId = useSelector(getPostId);
  const posts = useSelector(getPosts);
  const [postIndex, setPostIndex] = useState(null);
  const [isEndReadchedIndex, setIsEndReached] = useState(-1);

  useEffect(() => {
    setLoading(true);
    console.log(posts);
    const postIndex = posts.findIndex((post) => post.id === postId);
    setPostIndex(postIndex);
  }, []);

  useEffect(() => {
    setLoading(true);
    setPost(posts[postIndex]);
    setLoading(false);
  }, [postIndex]);

  const goToNext = async () => {
    if (isEndReadchedIndex < postIndex) {
      setLoading(true);
      if (posts.length - 1 > postIndex) {
        setPostIndex(postIndex + 1);
        // await dispatch(setPostId(posts[postIndex + 1].id));
      } else {
        const res = await dispatch(
          fetchMorePosts(posts[postIndex].calendardatetime)
        );
        console.log(res);
        if (res.payload.responseobjects[0].posts === null) {
          setIsEndReached(postIndex);
        } else {
          setPostIndex(postIndex + 1);
        }
      }
      setLoading(false);
    }
  };

  const goToPrevious = () => {
    if (postIndex > 0) {
      setPostIndex(postIndex - 1);
    }
  };

  return (
    <div className="modal__container">
      <span className="close-btn">
        <FontAwesomeIcon
          onClick={() => dispatch(closeModal())}
          style={{ fontSize: "30px" }}
          icon={faWindowClose}
        />
      </span>
      <span className="arrow-right">
        <FontAwesomeIcon
          onClick={() => goToNext()}
          style={{ fontSize: "30px" }}
          icon={faArrowRight}
        />
      </span>
      <span className="arrow-left">
        <FontAwesomeIcon
          onClick={() => goToPrevious()}
          style={{ fontSize: "30px" }}
          icon={faArrowLeft}
        />
      </span>

      {loding === true ? (
        "Loading ..."
      ) : post ? (
        <Post
          id={post.id}
          rating={post.rating}
          photo={post.media[0].mediaurl}
          text={post.text}
          date={post.calendardatetime}
          typeofday={post.typeofday}
        />
      ) : null}
    </div>
  );
}

export default ShowModal;
