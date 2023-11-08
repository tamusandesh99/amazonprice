import React, { Fragment, useState, useEffect } from "react";
import SinglePost from "../SinglePost";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";

import { AiFillHome, AiTwotoneTags } from "react-icons/ai";
import { GiOpenFolder } from "react-icons/gi";
import { BiSolidHelpCircle } from "react-icons/bi";
import { BiHeart as PostLikesIcon } from "react-icons/bi";
import { LiaCommentAltSolid as PostCommentsIcon } from "react-icons/lia";
import { FaComments } from "react-icons/fa";
import { FaStopwatch } from "react-icons/fa";
import { RiHeartsFill } from "react-icons/ri";
import { AiTwotoneFire } from "react-icons/ai";

const HomePage = ({ isAuthenticated, all_Posts }) => {
  const [activeButton, setActiveButton] = useState("Recent Posts");
  // const [allPosts, setAllPosts] = useState([]);

  const [displayedPosts, setDisplayedPosts] = useState([]);

  const [totalPostsLength, setTotalPostsLength] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [scrollPosition, setScrollPosition] = useState(0);

  let navigate = useNavigate();
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

    setDisplayedPosts(all_Posts);
    setTotalPostsLength(all_Posts.length);
  }, [isAuthenticated]);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  const sortPosts = (order) => {
    if (order === "Most Liked") {
      const sortedPosts = [...displayedPosts].sort((a, b) => b.likes - a.likes);
      setDisplayedPosts(sortedPosts);
      setActiveButton(order);
    } else if (order === "Most Comments") {
      const sortedPosts = [...displayedPosts].sort(
        (a, b) => b.comments.length - a.comments.length
      );
      setDisplayedPosts(sortedPosts);
      setActiveButton(order);
    } else if (order === "Recent Posts") {
      const sortedPosts = [...displayedPosts].sort((a, b) => b.id - a.id);
      setDisplayedPosts(sortedPosts);
      setActiveButton(order);
    } else {
      console.log("whatever");
    }
  };

  // const loadMorePosts = () => {
  //   const newPostsPerPage = postsPerPage + 5;
  //   setPostsPerPage(newPostsPerPage);
  //   setDisplayedPosts(allPosts.slice(0, newPostsPerPage));
  // };

  const handleButtonClick = (
    link,
    username,
    title,
    description,
    likes,
    comments,
    image
  ) => {
    navigate(`/posts/${encodeURIComponent(title)}`, {
      state: {
        username: username,
        title: title,
        description: description,
        link: link,
        likes: likes,
        comments: comments,
        image: image,
      },
    });
  };

  const postButton = () => {
    if (isAuthenticated) {
      navigate("/submitpost");
    } else {
      navigate("/login");
    }
  };

  const navigateTo = (path) => {
    navigate(path);
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
          <div className="icon-text-container" onClick={() => navigateTo("/")}>
            <div className="icon-text-container-inner">
              <AiFillHome className="left-content icon" />
              <button className="left-content icon-text">Home</button>
            </div>
          </div>
          <div
            className="icon-text-container"
            onClick={() => navigateTo("/posts")}
          >
            <div className="icon-text-container-inner">
              <GiOpenFolder className="left-content icon" />
              <button className="left-content icon-text">Posts</button>
            </div>
          </div>
          <div className="icon-text-container" onClick={() => navigateTo("/")}>
            <div className="icon-text-container-inner">
              <AiTwotoneTags className="left-content icon" />
              <button className="left-content icon-text">Tags</button>
            </div>
          </div>
          <div className="icon-text-container" onClick={() => navigateTo("/")}>
            <div className="icon-text-container-inner">
              <BiSolidHelpCircle className="left-content icon" />
              <button className="left-content icon-text">Help</button>
            </div>
          </div>
        </div>
        <div className="center-homepage">
          <div className="homepage-top-menu">
            {/* <button
              className={`menu-button ${
                activeButton === "All Posts" ? "active" : ""
              }`}
              onClick={() => sortPosts("All Posts")}
            >
              All Posts
            </button> */}
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
                activeButton === "Most Comments" ? "active" : ""
              }`}
              onClick={() => sortPosts("Most Comments")}
            >
              <FaComments className="homepage-top-menu-icons" />
              Most Comments
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
                activeButton === "Most Liked" ? "active" : ""
              }`}
              onClick={() => sortPosts("Most Liked")}
            >
              <AiTwotoneFire className="homepage-top-menu-icons" />
              Hot (Coming Soon)
            </button>
          </div>
          <div
            className="homepage-bottom-page"
            id="scrollable-element"
            onScroll={handleScroll}
          >
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
                    post.image
                  )
                }
                key={index}
              >
                <div className="post-info">
                  <p className="post-username">{post.username}</p>
                  <p className="post-title">{post.title}</p>
                  <p className="post-tech-stack">{post.description}</p>
                  <div className="post-likes-comments">
                    <p>
                      <PostLikesIcon className="post-icons" /> {post.likes}
                    </p>
                    <p>
                      <PostCommentsIcon className="post-icons" />{" "}
                      {post.comments.length}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="load-all-posts">
            <ul className="load-posts">
              <div>
                {/* {displayedPosts.length < totalPostsLength && (
                  <button onClick={loadMorePosts}>See More Posts</button>
                )} */}
              </div>
            </ul>
          </div>
        </div>
        <div className="right-homepage">
          <button onClick={postButton} className="">
            Make a post
          </button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisc, varius a, semper
            congue, euismod non, mi.
          </p>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  all_Posts: state.posts.all_posts,
});

export default connect(mapStateToProps)(HomePage);
