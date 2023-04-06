import "./my-blog-preview.css";
import BlogPreview from "../blog-preview/blog-preview";
import { useEffect, useState } from "react";
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

const MyBLogs: React.FC = (): JSX.Element => {
  const [data, setData] = useState<BlogPostPreviewProps["post"]>();
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${DOMAIN}/blogs/my-blogs`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setData(data?.data?.blogs);
    };
    getData();
  }, [token]);
  console.log(data);

  return (
    <div className="blog-post-list-container">
      {data?.map((post) => (
        <BlogPreview key={post._id} post={post} />
      ))}
    </div>
  );
};
export default MyBLogs;
