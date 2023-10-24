import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./index.scss";
import { useNavigate, Link, Await } from "react-router-dom";
import axios from "axios";
import { create_user_post } from "../../actions/posts";
import Cookies from "js-cookie";

const UserPost = ({ userPosts }) => {
  const [postData, setPostData] = useState({
    title: "",
    website_link: "",
    tech_stack: "",
  });

  const { title, website_link, tech_stack } = postData;
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) =>
    setPostData({ ...postData, [e.target.name]: e.target.value });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const removeImage = () => {
    setSelectedImage(null); // Clear the selected image
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("e");
    //  create_user_post(title, website_link, tech_stack); need fix here
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({ title, website_link, tech_stack });

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/post/create`,
        body,
        config
      );
      window.alert("Post successfully created!");
      setSuccessMessage("Post successfully created!");
      navigate("/"); // Redirect to /home after successful post
    } catch (error) {
      console.error(error);
      setSuccessMessage("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className="user-post-container">

        <form className="user-post-form" onSubmit={onSubmit}>
          <p>Make a post</p>
          <div className="form-group">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Title"
              required
            />
          </div>

          <div className="form-group">
            <textarea
              type="text"
              id="tech_stack"
              name="tech_stack"
              value={tech_stack}
              onChange={onChange}
              placeholder="Description"
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="image">Image Upload</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
                className="image-preview"
              />
            )}
            <button onClick={removeImage} className="remove-image-button">
              Remove Image
            </button>
          </div> */}
          <div className="form-group">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
      <p>
        Don't have an account? <Link to="/register">Signup</Link>
      </p>
    </>
  );
};

const mapStateToProps = (state) => ({
  userPosts: state.profile.posts,
});

export default connect(mapStateToProps, { create_user_post })(UserPost);
