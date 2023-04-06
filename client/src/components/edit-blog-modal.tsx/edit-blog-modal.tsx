import axios from "axios";
import React, { useEffect, useState } from "react";
import DOMAIN from "../../utils/backend-Domain";
import "./edit-blog-modal.css";

function EditBLogModal(props: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const token: string | null = localStorage.getItem("token");
  const blogId = localStorage.getItem("blogId");

  useEffect(() => {
    const addData = async () => {
      const data = await axios.get(`${DOMAIN}/blogs/${blogId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setTitle(data.data.blog.title);
      setContent(data.data.blog.content);
      // setImageUrl(data.data.blog.imageUrlUrl)
    };
    addData();
  }, [blogId, token]);

  const onEditBlog = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await axios.patch(
      `${DOMAIN}/blogs/${blogId}`,
      { title, content, imageUrl },
      { headers: { authorization: `Bearer ${token}` } }
    );
    window.location.reload();
  };

  console.log({ title, content });
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

          <label htmlFor="imageUrl">imageUrl URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <div className="modal-buttons">
            <button type="button" onClick={props.onClose}>
              Cancel
            </button>
            <button type="submit" onClick={onEditBlog}>
              Edit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBLogModal;
