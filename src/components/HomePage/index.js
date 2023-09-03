import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { get_top_posts } from "../../actions/posts";
import { connect } from "react-redux";
import { AiFillHome, AiTwotoneTags } from "react-icons/ai";
import { GiOpenFolder } from "react-icons/gi";
import { BiSolidHelpCircle } from "react-icons/bi";
import "./index.scss";

const HomePage = (isAuthenticated) => {
  const [topPosts, setTopPosts] = useState([]);
  useEffect(() => {
    get_top_posts()
      .then((data) => {
        setTopPosts(data);
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
      });
  }, []);

  let navigate = useNavigate();

  const handleButtonClick = (webLink, username, title, tech_stack) => {
    navigate(`/posts/${encodeURIComponent(webLink)}`, {
      state: {
        username: username,
        title: title,
        tech_stack: tech_stack,
      },
    });
  };

  const postButton = () => {
    if (isAuthenticated.isAuthenticated) {
      navigate("/submitpost");
    } else {
      navigate("/register");
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const loginLink = (
    <Fragment>
      <div className="nav-item">
        <Link to="/login">Login to make a post</Link>
      </div>
    </Fragment>
  );
  const postLink = (
    <Fragment>
      <div className="nav-item">
        <Link to="/submitpost">Submit Post</Link>
      </div>
    </Fragment>
  );

  return (
    <>
      <div className="main-page">
        <div className="left-homepage">
          <div
            className="icon-text-container"
            onClick={() => navigateTo("/")}
          >
            <AiFillHome className="left-content icon" />
            <button className="left-content icon-text">Home</button>
          </div>
          <div
            className="icon-text-container"
            onClick={() => navigateTo("/posts")}
          >
            <GiOpenFolder className="left-content icon" />
            <button className="left-content icon-text">Posts</button>
          </div>
          <div
            className="icon-text-container"
            onClick={() => navigateTo("/")}
          >
            <AiTwotoneTags className="left-content icon" />
            <button className="left-content icon-text">Tags</button>
          </div>
          <div
            className="icon-text-container"
            onClick={() => navigateTo("/")}
          >
            <BiSolidHelpCircle className="left-content icon" />
            <button className="left-content icon-text">Help</button>
          </div>
        </div>
        <div className="center-homepage">
          <p>Rate my website</p>
          {topPosts.map((post, index) => (
            <div
              className="single-post"
              onClick={() =>
                handleButtonClick(
                  post.website_link,
                  post.username,
                  post.title,
                  post.tech_stack
                )
              }
              key={index}
            >
              <div className="post-info">
                <p className="post-username">{post.username}</p>
                <p className="post-title">{post.title}</p>
                <p className="post-tech-stack">{post.tech_stack}</p>
              </div>
              <div className="website-preview">
                <button
                  className="preview-button"
                  onClick={() =>
                    handleButtonClick(
                      post.website_link,
                      post.username,
                      post.title,
                      post.tech_stack
                    )
                  }
                >
                  <img
                    src="https://www.youtube.com/favicon.ico"
                    alt="YouTube Favicon"
                  />
                </button>
              </div>
            </div>
          ))}
          <div className="load-all-websites">
            <ul className="load-websites">
              <div>
                <Link to="/posts">see all posts</Link>
              </div>
            </ul>
            <ul className="load-websites">
              <div>
                {isAuthenticated.isAuthenticated ? postLink : loginLink}
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
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  topPosts: state.posts.top_posts,
});

export default connect(mapStateToProps)(HomePage);
