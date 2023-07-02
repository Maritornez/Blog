import React, { useEffect } from "react"

import "./Style.css"

const Blog = ({ user, blogs, setBlogs, removeBlog }) => {
  useEffect(() => {
    const getBlogs = async () => {
      const requestOptions = {
        method: "GET",
      }
      return await fetch("https://localhost:7074/api/blogs/", requestOptions)
        .then((response) => response.json())
        .then(
          (data) => {
            console.log("Data:", data)
            setBlogs(data)
          },
          (error) => {
            console.log(error)
          }
        )
    }
    getBlogs()
  }, [setBlogs])

  const deleteItem = async ({ blogId }) => {
    const requestOptions = {
      method: "DELETE",
    }
    return await fetch(
      `https://localhost:7074/api/blogs/${blogId}`,
      requestOptions
    ).then(
      (response) => {
        if (response.ok) {
          removeBlog(blogId)
        }
      },
      (error) => console.log(error)
    )
  }

  return (
    <>
      <h3>Список блогов</h3>
      {blogs.map(({ blogId, url, post }) => (
        <div className="Blog" key={blogId} id={blogId}>
          <strong>{blogId}: {url}</strong>

          {user.isAuthenticated ? (
            <button onClick={() => deleteItem({ blogId })}>Удалить</button>
          ) : (
            ""
          )}

          {post.map(({ postId, title, content }) => (
            <div className="BlogText" key={postId} id={postId}>
              {title} <br />
              {content} <hr />
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default Blog
