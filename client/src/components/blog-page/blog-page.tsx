import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../../utils/backend-Domain";

import EditBLogModal from "../edit-blog-modal.tsx/edit-blog-modal";
import "./blog-post.css";
interface BlogPostPreviewProps {
  post: {
    _id: string;
    title: string;
    author: string;
    date: string;
    summary: string;
    content: string;
  };
}
function BlogPage() {
  const navigate = useNavigate();
  const blogId = localStorage.getItem("blogId");
  const token = localStorage.getItem("token");
  const [blog, setBlog] = useState<BlogPostPreviewProps["post"]>();

  const [showModal, setShowModal] = useState(false);

  function handleShowBlog() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleDeleteBlog = async () => {
    await axios.delete(`${DOMAIN}/blogs/${blogId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${DOMAIN}/blogs/${blogId}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      setBlog(data?.data?.blog);
    };
    getData();
  }, [blogId, token]);

  return (
    <div className="BlogPage">
      <header className="BlogHeader">
        <h1>My Blog</h1>
      </header>
      <div className="Banner"></div>
      <div className="Content">
        <div className="BlogPost">
          <h2>{blog?.title}</h2>
          <p>{blog?.content}</p>
          <div className="AuthorDate">
            <p>
              By {blog?.author} on {blog?.date?.slice(0, 10)}
            </p>
          </div>
          <div className="ButtonContainer">
            <button className="EditButton" onClick={handleShowBlog}>
              Edit
            </button>
            <button className="DeleteButton" onClick={handleDeleteBlog}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <>{showModal && <EditBLogModal onClose={handleCloseModal} />}</>
    </div>
  );
}

export default BlogPage;
