import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Blogs from "./components/single-blog/blogs";
import Nav from "./components/navigation/nav";
import BlogTitle from "./components/blog-title/blog-title";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import SignUpForm from "./components/sign-up/sign-up";
import MyBLogs from "./components/my-blogs/my-blog-preview";
import BlogPage from "./components/blog-page/blog-page";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Nav /> <BlogTitle />
            <Blogs />
          </>
        }
      />
      <Route
        path="/my-blogs"
        element={
          <>
            <Nav /> <BlogTitle />
            <MyBLogs />
          </>
        }
      />
      <Route
        path="/blog-page"
        element={
          <>
            <Nav />
            <BlogPage />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Login />
          </>
        }
      />
      <Route
        path="/sign-up"
        element={
          <>
            <SignUpForm />
          </>
        }
      />
    </Routes>
  );
}

export default App;
