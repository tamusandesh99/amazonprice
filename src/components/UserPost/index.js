import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./index.scss";
import { useNavigate, Link, Await } from "react-router-dom";
import axios from "axios";
import { create_user_post } from "../../actions/posts";
import Cookies from "js-cookie";
import { TfiTrash } from "react-icons/tfi";

const UserPost = ({ userPosts }) => {
  const [postData, setPostData] = useState({
    title: "",
    website_link: "",
    tech_stack: "",
  });

  const { title, website_link, tech_stack } = postData;
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  const onChange = (e) =>
    setPostData({ ...postData, [e.target.name]: e.target.value });

  const handleImageUpload = (event) => {
    const newFiles = Array.from(event.target.files); // Convert the FileList to an array
    setSelectedImages([...selectedImages, ...newFiles]);
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
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
          <div className="form-group user-post-image">
          <div className={`post-without-images ${selectedImages.length > 0 ? 'post-with-images' : ''}`}>
              {selectedImages.map((image, index) => (
                <div key={index} className="image-preview-container">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected Image"
                    className="image-preview"
                  />
                  <h2
                    onClick={() => removeImage(index)}
                    className="remove-image-button"
                  >
                    <TfiTrash />
                  </h2>
                </div>
              ))}
            </div>
            <input
              type="file"
              id="image"
              className="image-upload-input"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="form-group">
            <button type="submit">Post</button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Signup</Link>
          </p>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userPosts: state.profile.posts,
});

export default connect(mapStateToProps, { create_user_post })(UserPost);
