import "./nav.css";
import { IoMdLogIn } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddBlogModal from "../blog-modal/add-blog-modal";

const Nav = () => {
  // const [searchQuery, setSearchQuery] = useState();

  // const handleSearch = (event: any) => {
  //   setSearchQuery(event.target.value);
  // };

  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   // Perform search with searchQuery
  //   console.log(`Search for ${searchQuery}`);
  // };

  const [showModal, setShowModal] = useState(false);

  function handleAddBlog() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo navbar-logo">
          <Link to={"/"}>
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="search-container">
          {window.location.href === "http://localhost:3000/my-blogs" ? (
            <Link onClick={handleAddBlog} className="my-blogs" to="/my-blogs">
              Add Blog
            </Link>
          ) : (
            <Link className="my-blogs" to="/my-blogs">
              My Blogs
            </Link>
          )}
        </div>
        <div className="login pointer">
          <Link to={"/login"}>
            Login
            <IoMdLogIn />
          </Link>
        </div>
      </nav>
      <>{showModal && <AddBlogModal onClose={handleCloseModal} />}</>
    </>
  );
};

export default Nav;
