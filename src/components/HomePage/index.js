import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { get_all_posts } from "../../actions/posts";
import { connect } from "react-redux";
import { AiFillHome, AiTwotoneTags } from "react-icons/ai";
import { GiOpenFolder } from "react-icons/gi";
import { BiSolidHelpCircle } from "react-icons/bi";
import "./index.scss";

const HomePage = ({ isAuthenticated, all_Posts }) => {
  const [activeButton, setActiveButton] = useState("Recent Posts");
  const [allPosts, setAllPosts] = useState([]);
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

    setDisplayedPosts(all_Posts)
    setTotalPostsLength(all_Posts.length)

    if(isAuthenticated == null){
      console.log("p")
    }
  }, []);


  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    return () => {
      localStorage.setItem("scrollPosition", scrollPosition);
    };
  }, [scrollPosition]);

  // Retrieve the stored scroll position from localStorage
  useEffect(() => {
    const storedScrollPosition = parseInt(localStorage.getItem("scrollPosition"), 10);
    if (!isNaN(storedScrollPosition)) {
      // Scroll to the stored position
      window.scrollTo(0, storedScrollPosition);
    }
  }, []);


  const loadMorePosts = () => {
    const newPostsPerPage = postsPerPage + 5;
    setPostsPerPage(newPostsPerPage);
    setDisplayedPosts(allPosts.slice(0, newPostsPerPage));
  };

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
      <div className="main-page" >
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
            <button
              className={`menu-button ${
                activeButton === "Recent Posts" ? "active" : ""
              }`}
              onClick={() => setActiveButton("Recent Posts")}
            >
              Recent Posts
            </button>
            <button
              className={`menu-button ${
                activeButton === "Most Comments" ? "active" : ""
              }`}
              onClick={() => setActiveButton("Most Comments")}
            >
              Most Comments
            </button>
            <button
              className={`menu-button ${
                activeButton === "Most Liked" ? "active" : ""
              }`}
              onClick={() => setActiveButton("Most Liked")}
            >
              Most Liked
            </button>
            <button
              className={`menu-button ${
                activeButton === "All Posts" ? "active" : ""
              }`}
              onClick={() => setActiveButton("All Posts")}
            >
              All Posts
            </button>
          </div>
          <div className="homepage-bottom-page" id="scrollable-element" onScroll={handleScroll}>
            {displayedPosts.map((post, index) => (
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
                      src={post.website_link + "/favicon.ico"}
                      alt={post.title}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="load-all-posts">
            <ul className="load-posts">
              <div>
                {displayedPosts.length < totalPostsLength && (
                  <button onClick={loadMorePosts}>See More Posts</button>
                )}
              </div>
            </ul>
            {/* <ul className="load-posts">
              <div>
                {isAuthenticated.isAuthenticated ? postLink : loginLink}
              </div>
            </ul> */}
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
