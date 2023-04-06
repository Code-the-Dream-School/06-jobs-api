import "./blogs.css";
import BlogPreview from "../blog-preview/blog-preview";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMAIN from "../../utils/backend-Domain";
interface BlogPostPreviewProps {
  post: {
    _id: string;
    title: string;
    author: string;
    date: string;
    summary: string;
  }[];
}
const Blogs: React.FC = (): JSX.Element => {
  const [data, setData] = useState<BlogPostPreviewProps["post"]>();
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${DOMAIN}/blogs`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setData(data?.data?.blogs);
    };
    getData();
  }, [token]);

  return (
    <div className="blog-post-list-container">
      {data?.map((post) => (
        <BlogPreview key={post?._id} post={post} />
      ))}
    </div>
  );
};
export default Blogs;
