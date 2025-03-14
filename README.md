# Blog API

A RESTful API for managing blog posts and tags using Node.js and MongoDB. This API allows users to create, read, update, and delete blog posts, as well as manage tags associated with those posts.

## Features

- Create, read, update, and delete blog posts
- Associate multiple tags with each post
- Filter posts by keyword and tags
- Sort and paginate posts
- Store images in Base64 format in MongoDB

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- body-parser

## Prerequisites

- Node.js (v12 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## Get started
Clone the repository:
   git clone https://github.com/priyankaparthiban/blog
   cd blog-api

Install the dependencies:
    npm install

Create a .env file in the root directory and add your MongoDB connection string:

    MONGODB_URI=mongodb://<username>:<password>@localhost:27017/<<databasename>>

    PORT=5000

Start the MongoDB server (if running locally):
    mongod

Start the application:
    node server.js

## Postman Collection
You can import the attached Postman collection to test the API

## API Documentation

### Base URL
 http://localhost:5000/api
 
 
### Endpoints

#### 1. Get All Posts

- **URL**: `/posts`
- **Method**: `GET`
- **Query Parameters**:
  - `keyword` (optional): Filter posts by keyword in title or description.
  - `tag` (optional): Filter posts by a specific tag.
  - `sort` (optional): Sort posts by creation date (`asc` or `desc`).
  - `page` (optional): Page number for pagination (default is 1).
  - `limit` (optional): Number of posts per page (default is 10).

- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "title": "My First Post",
        "desc": "This is the description of my first post.",
        "image": "data:image/png;base64,...",
        "tags": ["tag1", "tag2"],
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "_id": "60d5ec49f1b2c8b1f8e4e1a1"
      }
    ]
    ```

- **Error Response**:
  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "Error message describing the issue."
    }
    ```

---

#### 2. Create a New Post

- **URL**: `/posts`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "title": "My First Post",
      "desc": "This is the description of my first post.",
      "image": "data:image/png;base64,...",
      "tags": ["tag1", "tag2"]
  }
 - **Success Response**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    [
      {
        "title": "My First Post",
        "desc": "This is the description of my first post.",
        "image": "data:image/png;base64,...",
        "tags": ["tag1", "tag2"],
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "_id": "60d5ec49f1b2c8b1f8e4e1a1"
      }
    ]
    ```

- **Error Response**:
  - **Code**: `400 Bad Request`
  - **Content**:
    ```json
    {
      "message": "Invalid image format. Must be Base64"
    }
    ```
  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "Error message describing the issue."
    }
    ```
