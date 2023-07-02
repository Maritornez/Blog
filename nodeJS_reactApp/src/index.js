import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Blog from "./Components/Blog/Blog"
import BlogCreate from "./Components/BlogCreate/BlogCreate"
import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const addBlog = (blog) => setBlogs([...blogs, blog])
  const removeBlog = (removeId) =>
    setBlogs(blogs.filter(({ blogId }) => blogId !== removeId))
  const [user, setUser] = useState({ isAuthenticated: false, userName: "" })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<h3>Главная страница</h3>} />
          <Route
            path="/blogs"
            element={
              <>
                <BlogCreate user={user} addBlog={addBlog} />
                <Blog
                  user={user}
                  blogs={blogs}
                  setBlogs={setBlogs}
                  removeBlog={removeBlog}
                />
              </>
            }
          />
          <Route
            path="/login"
            element={<LogIn user={user} setUser={setUser} />}
          />
          <Route path="*" element={<h3>404</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
