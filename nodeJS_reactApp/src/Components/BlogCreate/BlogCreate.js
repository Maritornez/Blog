import React from "react"

const BlogCreate = ({ user, addBlog }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const { value } = e.target.elements.url

    const blog = { url: value }

    const createBlog = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      }

      const response = await fetch(
        "https://localhost:7074/api/blogs/",
        requestOptions
      )
      return await response.json().then(
        (data) => {
          console.log(data)
          // response.status === 201 && addBlog(data)
          if (response.ok) {
            addBlog(data)
            e.target.elements.url.value = ""
          }
        },
        (error) => console.log(error)
      )
    }
    createBlog()
  }

  return (
    <>
      {user.isAuthenticated ? (
        <>
          <h3>Создание нового блога</h3>
          <form onSubmit={handleSubmit}>
            <label>URL: </label>
            <input type="text" name="url" placeholder="Введите Url:" />
            <button type="submit">Создать</button>
          </form>
        </>
      ) : (
        ""
      )}
    </>
  )
}

export default BlogCreate
