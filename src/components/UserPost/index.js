import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./index.scss";
import { useNavigate, Link, Await } from "react-router-dom";
import axios from "axios";
import { create_user_post } from "../../actions/posts";
import Cookies from "js-cookie";
import { TfiTrash } from "react-icons/tfi";
import { BiImageAdd } from "react-icons/bi";

const UserPost = ({ userPosts }) => {
  const [postData, setPostData] = useState({
    title: "",
    website_link: "",
    tech_stack: "",
  });

  const { title, website_link, tech_stack } = postData;
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedLink, setSelectedLink] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

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

  const handleLinkButtonClick = () => {
    setShowInput(true);
  };

  const handleLinkInputChange = (e) => {
    setLink(e.target.value);
  };

  const handleLinkInputBlur = () => {
    if (link.trim() === "") {
      setShowInput(false);
    }
    setInputFocused(false); 
  };

  const addLink = () => {
    if (urlPattern.test(link)) {
      setSelectedLink([...selectedLink, { url: link }]);
      setLink("");
    } else {
      alert("Invalid URL. Please enter a valid URL.");
    }
  };

  const handleLinkInputKeyDown = (e) => {
    if (e.key === "Enter") {
      addLink();
      e.preventDefault(); // Prevent the default Enter behavior (like form submission)
    }
  };
  const removeLink = (index) => {
    const updatedLinks = [...selectedLink];
    updatedLinks.splice(index, 1);
    setSelectedLink(updatedLinks);
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
          <div className="form-group">
            <div
              className={`post-without-link ${
                selectedLink.length > 0 ? "post-with-link" : ""
              }`}
            >
              {selectedLink.map((link, index) => (
                <div key={index} className="link-preview-container">
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.url}
                  </a>
                  <h2
                    onClick={() => removeLink(index)}
                    className="remove-link-button"
                  >
                    <TfiTrash />
                  </h2>
                </div>
              ))}
            </div>

            <div className="link-input-container">
              {showInput ? (
                <div>
                  <input
                    type="url"
                    className="link-input"
                    placeholder="Paste your link here"
                    value={link}
                    onChange={handleLinkInputChange}
                    autoFocus
                    onBlur={handleLinkInputBlur}
                    onKeyDown={handleLinkInputKeyDown}
                    // Add this onBlur event
                  />
                  <a onClick={addLink}>Add Link</a>
                </div>
              ) : (
                ""
              )}
            </div>

            <div
              className={`post-without-images ${
                selectedImages.length > 0 ? "post-with-images" : ""
              }`}
            >
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
            <label className="image-upload-label">
              <input
                type="file"
                id="image"
                className="image-upload-input"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <BiImageAdd />
              Add Image
            </label>
            <label
              className="link-upload-label"
              onClick={handleLinkButtonClick}
            >
              <BiImageAdd />
              Add Link
            </label>
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
