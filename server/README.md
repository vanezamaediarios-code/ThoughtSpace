# ThoughtSpace API Documentation

## App Base URL

https://thoughtspace-1.onrender.com

---

## Admin User

email: "admin@mail.com"

password: "admin123"

## Regular User

email: "vase@mail.com"

password: "password"

email: "flask@mail.com"

password: "password"

---

## References

### Endpoints

### Users

#### [POST] - "/users/register"

Sample Request Body

{
"username": "vaseline",
"email": "vase@mail.com",
"password": "password"
}

#### [POST] - "/users/login"

Sample Request Body

{
"email": "vase@mail.com",
"password": "password"
}

#### [GET] - "/users/details"

No Request Body

#### [PATCH] - "/users/:id/set-as-admin"

No Request Body

---

### Blog Posts

#### [POST] - "/blogs/addBlogPost"

Sample Request Body

{
"title": "My First Blog",
"content": "This is my first blog post."
}

#### [GET] - "/blogs/getBlogs"

No Request Body

#### [GET] - "/blogs/getBlogPost/:blogId"

No Request Body

#### [PATCH] - "/blogs/:blogId/updateBlogPost"

Sample Request Body

{
"title": "Updated Blog Title",
"content": "Updated blog content."
}

#### [DELETE] - "/blogs/:blogId/deleteBlogPost"

No Request Body

---

### Comments

#### [POST] - "/blogs/addComment"

Sample Request Body

{
"blogId": "sampleBlogId",
"comment": "This is a sample comment."
}

#### [GET] - "/blogs/getComments/:blogId"

No Request Body

---

## Features

### User Resources

* User registration
* User authentication
* Retrieve user details
* Set user as admin

### Blog Resources

* Create blog post
* Retrieve all blog posts
* Retrieve a single blog post
* Update blog post
* Delete blog post (Admin only)

### Comment Resources

* Add comment to a blog post
* Retrieve comments from a blog post
