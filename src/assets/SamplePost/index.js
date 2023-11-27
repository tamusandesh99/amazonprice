import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./index.scss";
import { useNavigate, Link, Await } from "react-router-dom";
import { create_user_post } from "../../actions/posts";
import { make_sample_post } from "../../actions/posts";

import { TfiTrash } from "react-icons/tfi";
import { BiImageAdd } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";

const SamplePost = ({ make_sample_post }) => {
  const [postData, setPostData] = useState({
    username: "GuestID_1",
    title: "",
    description: "",
    images: [],
    links: [],
    likes: "",
    comments: [],
    date: new Date().toISOString(),
  });

  const { title, description, images, links } = postData;
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

  const handleLinkButtonClick = () => setShowInput(true);
  const handleLinkInputChange = (e) => setLink(e.target.value);

  const handleLinkInputBlur = () => {
    if (link.trim() === "") setShowInput(false);
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
      e.preventDefault();
    }
  };
  const removeLink = (index) => {
    const updatedLinks = [...selectedLink];
    updatedLinks.splice(index, 1);
    setSelectedLink(updatedLinks);
  };

  const onSubmit = async (e) => {
    try {
      
      make_sample_post(postData);

      const encodedTitle = encodeURIComponent(title).replace(/%20/g, "_");
      navigate(`/posts/${encodeURIComponent(encodedTitle)}`, {
        state: {
          username: postData.username,
          title: title,
          description: description,
          links: links,
          likes: postData.likes,
          comments: postData.comments,
          image: images,
        },
      });

      e.preventDefault();
    } catch {}
  };


  return (
    <>
      <div className="user-samplepost-container">
        <form className="user-post-form" onSubmit={onSubmit}>
          <span>* This is a sample post *</span>
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
              id="description"
              name="description"
              value={description}
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
                  <a onClick={addLink}>
                    {" "}
                    <IoAddCircle />{" "}
                  </a>
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
            <div className="label-container">
              <label className="image-upload-label">
                <input
                  type="file"
                  id="image"
                  className="image-upload-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <BiImageAdd className="image-icon" />
                Add Image
              </label>
              <label
                className="link-upload-label"
                onClick={handleLinkButtonClick}
              >
                <BsLink45Deg className="link-icon" />
                Add Link
              </label>
            </div>
          </div>
          <div className="form-group">
            <button type="submit">Post</button>
          </div>
          <p>
            Ready to turn your thoughts into real posts?{" "}
            <Link to="/register">Signup Now!</Link>
          </p>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userPosts: state.profile.posts,
});

export default connect(mapStateToProps, { make_sample_post })(SamplePost);
