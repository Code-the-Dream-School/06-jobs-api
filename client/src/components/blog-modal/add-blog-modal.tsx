import axios from "axios";
import React, { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import DOMAIN from "../../utils/backend-Domain";
import "./add-blog-modal.css";

function AddBlogModal(props: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const token: string | null = localStorage.getItem("token");
  const onAddPost = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = await axios.post(
      `${DOMAIN}/blogs`,
      { title, content, image },
      { headers: { authorization: `Bearer ${token}` } }
    );
    window.location.reload();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Blog Post</h2>
        <form>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="content">content</label>
          <textarea
            id="content"
            name="content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <div className="modal-buttons">
            <button type="button" onClick={props.onClose}>
              Cancel
            </button>
            <button type="submit" onClick={onAddPost}>
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlogModal;
