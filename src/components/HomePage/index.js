import React, { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector, shallowEqual } from "react-redux";

import { get_all_posts, loadMorePosts } from "../../actions/posts";
import Rightside from "../Rightside";
import Leftside from "../Leftside";
import "./index.scss";

import { BiHeart as PostLikesIcon } from "react-icons/bi";
import { LiaCommentAltSolid as PostCommentsIcon } from "react-icons/lia";
import { FaComments } from "react-icons/fa";
import { FaStopwatch } from "react-icons/fa";
import { RiHeartsFill } from "react-icons/ri";
import { AiTwotoneFire } from "react-icons/ai";
import { BsFillCloudSlashFill } from "react-icons/bs";

import SkeletonLoad from "../SkeletonLoad";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HomePage = ({
  isAuthenticated,
  all_Posts,
  get_all_posts,
  sample_posts_state,
}) => {
  const [activeButton, setActiveButton] = useState("Hot");
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();
  let dispatcher = useDispatch();
  const page = useSelector((state) => state.limit.page, shallowEqual);

  useEffect(() => {
    // get_all_posts()
    //   .then((data) => {
    //     setAllPosts(data);
    //     setTotalPostsLength(data.length);
    //     setDisplayedPosts(data.slice(0, postsPerPage));
    //     console.log('post rendered')
    //   })
    //   .catch((error) => {
    //     console.error("Error loading posts:", error);
    //   });
    if (!all_Posts.length > 0) {
      const posts = get_all_posts();
    } else {
      setIsLoading(false);
      setDisplayedPosts(all_Posts);
      setOriginalOrder(all_Posts);
    }
  }, [isAuthenticated]);

  const sortPosts = (order) => {
    if (order === "Most_Liked") {
      const sortedPosts = [...originalOrder].sort((a, b) => b.likes - a.likes);
      setDisplayedPosts(sortedPosts);
    } else if (order === "Most_Comments") {
      const sortedPosts = [...originalOrder].sort(
        (a, b) => b.comments.length - a.comments.length
      );
      setDisplayedPosts(sortedPosts);
    } else if (order === "Recent_Posts") {
      const sortedPosts = [...originalOrder].sort((a, b) => b.id - a.id);
      setDisplayedPosts(sortedPosts);
    } else if (order === "Hot") {
      const sortedPosts = [...originalOrder].sort((a, b) => {
        if (a.comments === undefined) {
          return b;
        } else if (b.comments == undefined) {
          return a;
        } else {
          const scoreA =
            (a.likes + a.comments.length * 2) / (Date.now() - a.timestamp);
          const scoreB =
            (b.likes + b.comments.length * 2) / (Date.now() - b.timestamp);
          return scoreB - scoreA;
        }
      });
      setDisplayedPosts(sortedPosts);
    } else if (order === "Sample_Posts") {
      setDisplayedPosts(sample_posts_state);
    } else {
      //nothing
    }
    setActiveButton(order);
  };

  const handleButtonClick = (
    username,
    title,
    description,
    images,
    links,
    likes,
    comments,
    date
  ) => {
    const defaultLikes = likes !== undefined && likes !== "" ? likes : 0;
    const defaultComments =
      comments !== undefined && comments !== "" ? comments : [];
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "_");

    const postData = {
      post: {
        title: title,
        description: description,
        images: images,
        links: links,
        likes: defaultLikes,
        comments: defaultComments,
        date: date,
      },
      username: username,
    };

    navigate(`/posts/${encodeURIComponent(encodedTitle)}`, {
      state: postData,
    });
  };

  const loginLink = (
    <Fragment>
      <div className="nav-item">
        <Link className="link-item" to="/login">
          Login to make a post
        </Link>
      </div>
    </Fragment>
  );
  const postLink = (
    <Fragment>
      <div className="nav-item">
        <Link className="link-item" to="/submitpost">
          Submit Post
        </Link>
      </div>
    </Fragment>
  );
  return (
    <>
      <div className="main-page">
        <div className="left-homepage">
          <Leftside />
        </div>
        <div className="center-homepage">
          <div className="homepage-top-menu">
            <button
              className={`menu-button ${
                activeButton === "Hot" ? "active" : ""
              }`}
              onClick={() => sortPosts("Hot")}
            >
              <AiTwotoneFire className="homepage-top-menu-icons" />
              Hot
            </button>
            <button
              className={`menu-button ${
                activeButton === "Recent_Posts" ? "active" : ""
              }`}
              onClick={() => sortPosts("Recent_Posts")}
            >
              <FaStopwatch className="homepage-top-menu-icons" />
              Recent Posts
            </button>
            <button
              className={`menu-button ${
                activeButton === "Most_Liked" ? "active" : ""
              }`}
              onClick={() => sortPosts("Most_Liked")}
            >
              <RiHeartsFill className="homepage-top-menu-icons" />
              Most Liked
            </button>
            <button
              className={`menu-button ${
                activeButton === "Most_Comments" ? "active" : ""
              }`}
              onClick={() => sortPosts("Most_Comments")}
            >
              <FaComments className="homepage-top-menu-icons" />
              Most Comments
            </button>
            <button
              className={`menu-button ${
                activeButton === "Sample_Posts" ? "active" : ""
              }`}
              onClick={() => sortPosts("Sample_Posts")}
            >
              <BsFillCloudSlashFill className="homepage-top-menu-icons" />
              Sample Posts
            </button>
          </div>
          {isLoading ? (
            <div classname="loading-skeleton">
              <SkeletonLoad posts={4}/>
            </div>
          ) : (
            <div className="homepage-bottom-page" id="scrollable-element">
              {displayedPosts.map((post, index) => (
                <div
                  className="single-post"
                  onClick={() =>
                    handleButtonClick(
                      post.username,
                      post.title,
                      post.description,
                      post.images,
                      post.links,
                      post.likes,
                      post.comments,
                      post.timestamp
                    )
                  }
                  key={index}
                >
                  <div className="post-info">
                    <p className="post-username">{post.username} </p>
                    <p className="post-username">{post.timestamp}</p>
                    <p className="post-title">{post.title}</p>
                    <p className="post-description">{post.description}</p>
                    <div className="post-likes-comments">
                      <p>
                        <PostLikesIcon className="post-icons" />{" "}
                        {post.likes || 0}
                      </p>
                      <p>
                        <PostCommentsIcon className="post-icons" />{" "}
                        {post.comments ? post.comments.length : 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="right-homepage">
          <Rightside />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  all_Posts: state.posts.all_posts,
  sample_posts_state: state.posts.sample_posts,
  pageNum: state.limit.page,
});

export default connect(mapStateToProps, { get_all_posts })(HomePage);
