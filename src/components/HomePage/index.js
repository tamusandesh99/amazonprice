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

const HomePage = ({ isAuthenticated, all_Posts, get_all_posts, username }) => {
  const [activeButton, setActiveButton] = useState("Hot");
  // const [allPosts, setAllPosts] = useState([]);

  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [totalPostsLength, setTotalPostsLength] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [initialized, setInitialized] = useState(false);

  let navigate = useNavigate();
  let dispatcher = useDispatch();
  // const scrollContainerRef = useRef();

  const page = useSelector((state) => state.limit.page, shallowEqual);

  // useEffect(() => {
  //   console.log(page);
  //   dispatcher(loadMorePosts(page));
  //   setDisplayedPosts(all_Posts);
  // }, [page]);

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
      setDisplayedPosts(all_Posts);
      setOriginalOrder(all_Posts);
      setTotalPostsLength(all_Posts.length);
    }
  }, [isAuthenticated]);

  const sortPosts = (order) => {
    if (order === "Most Liked") {
      const sortedPosts = [...displayedPosts].sort((a, b) => b.likes - a.likes);
      setDisplayedPosts(sortedPosts);
    } else if (order === "Most Comments") {
      const sortedPosts = [...displayedPosts].sort(
        (a, b) => b.comments.length - a.comments.length
      );
      setDisplayedPosts(sortedPosts);
    } else if (order === "Recent Posts") {
      const sortedPosts = [...displayedPosts].sort((a, b) => b.id - a.id);
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
    } else {
      //nothing
    }
    setActiveButton(order);
  };

  const handleButtonClick = (
    link,
    username,
    title,
    description,
    likes,
    comments,
    images,
    date
  ) => {
    console.log(username)
    
    const defaultLikes = likes !== undefined && likes !== "" ? likes : 0;
    const defaultComments =
      comments !== undefined && comments !== "" ? comments : [];
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "_");
    navigate(`/posts/${encodeURIComponent(encodedTitle)}`, {
      state: {
        username: username,
        title: title,
        description: description,
        link: link,
        likes: defaultLikes,
        comments: defaultComments,
        images: images,
        date: date,
      },
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
                activeButton === "Recent Posts" ? "active" : ""
              }`}
              onClick={() => sortPosts("Recent Posts")}
            >
              <FaStopwatch className="homepage-top-menu-icons" />
              Recent Posts
            </button>
            <button
              className={`menu-button ${
                activeButton === "Most Liked" ? "active" : ""
              }`}
              onClick={() => sortPosts("Most Liked")}
            >
              <RiHeartsFill className="homepage-top-menu-icons" />
              Most Liked
            </button>
            <button
              className={`menu-button ${
                activeButton === "Most Comments" ? "active" : ""
              }`}
              onClick={() => sortPosts("Most Comments")}
            >
              <FaComments className="homepage-top-menu-icons" />
              Most Comments
            </button>
            <button
              className={`menu-button ${
                activeButton === "Most Comments" ? "active" : ""
              }`}
              onClick={() => sortPosts("Most Comments")}
            >
              <FaComments className="homepage-top-menu-icons" />
              Sample Posts
            </button>
          </div>
          <div className="homepage-bottom-page" id="scrollable-element">
            {displayedPosts.map((post, index) => (
              <div
                className="single-post"
                onClick={() =>
                  handleButtonClick(
                    post.link,
                    post.username,
                    post.title,
                    post.description,
                    post.likes,
                    post.comments,
                    post.images,
                    post.date
                  )
                }
                key={index}
              >
                <div className="post-info">
                  <p className="post-username">{post.username}</p>
                  <p className="post-username">{post.date}</p>
                  <p className="post-title">{post.title}</p>
                  <p className="post-description">{post.description}</p>
                  <div className="post-likes-comments">
                    <p>
                      <PostLikesIcon className="post-icons" /> {post.likes || 0}
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
          <div className="load-all-posts">
            <ul className="load-posts">
              <div>
                <button
                  onClick={() => {
                    dispatcher({ type: "increment" });
                  }}
                >
                  next page
                </button>
              </div>
            </ul>
          </div>
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
  username: state.profile.username,
  all_Posts: state.posts.all_posts,
  pageNum: state.limit.page,
});

export default connect(mapStateToProps, { get_all_posts })(HomePage);
