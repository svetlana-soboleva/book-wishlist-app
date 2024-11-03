# 📚 Book Wishlist API

Welcome to the Book Wishlist API project! This is a simple application built using **Spring Boot** that allows users to search for books using the **Google Books API** and maintain a wishlist of their favorite books. This project is designed for learning purposes and will eventually be expanded with a **React** frontend.

## 🚀 Features

- Search for books using keywords.
- Save books to a user's wishlist.
- Each user can maintain their own list of liked books.
- Interaction with the Google Books API to fetch book details.

## 🛠️ Technologies Used

- **Backend**: Spring Boot
- **Database**: PostgreSQL
- **Containerization**: Docker
- **API**: Google Books API
- **Data Access**: Spring Data JPA
- **Dependency Management**: Maven

## 🖥️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/book-wishlist-api.git
   cd book-wishlist-api

### 2. Configure Your Environment

Make sure you have **Java JDK 11+**, **Docker**, and **Maven** installed on your machine.

1. **Create the `application.properties` file**:
    - Navigate to `src/main/resources`.
    - Create a file named `application.properties` and add the following configuration:

   ```properties
   google.books.api.key=YOUR_GOOGLE_BOOKS_API_KEY
   2. **Create the `application.yaml` file**:
      ```bash
      debug: true
      spring:
        sql:
          init:
            platform: postgresql
        output:
          ansi:
            enabled: always
        datasource:
          url: jdbc:postgresql://localhost:5432/DBNAME
          username: USERNAME
          password: PASSWORD
          hikari:
            connectionTimeout: 20000
            maximumPoolSize: 5
        jpa:
          defer-datasource-initialization: true
          hibernate:
            ddl-auto: create-drop
      logging:
        level:
          org:
            springframework:
              boot:
                autoconfigure: ERROR
          
2. **Create the `docker-compose.yml`**:
   ```bash
   version: '3.8'
   
   services:
     postgres:
       image: 'postgres:15'
       container_name: 'books-postgres'
       environment:
         - POSTGRES_USER=USERNAME
         - POSTGRES_PASSWORD=PASSWORD
         - POSTGRES_DB=DATABASE
       volumes:
         - ./data/pgdata:/var/lib/postgresql/data
       ports:
         - 5432:5432
       restart: always
   

3. Add your Google Books API key 

## 📚 API Endpoints

### User Endpoints

#### 1. **Create User**

- **Endpoint:** `POST /api/users/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }

### Get User Details

- **Endpoint:** `GET /api/users/{userId}`
- **Description:** Retrieves details for a specific user.

#### Path Parameters:
- `userId`: The ID of the user whose details are to be retrieved. This should be a valid user ID present in the database.    

## Book Endpoints

### 1. Search Books
- **Endpoint:** `GET /api/1/search-books?q=harry+potter&startIndex=0&maxResults=5`
- **Description:** Searches for books using the Google Books API.

### 2. Like a Book
- **Endpoint:** `POST /api/{userId}/like-book/{bookId}`
- **Description:** Adds a book to the user's liked books list.

#### Path Parameters:
- **`userId`**: The ID of the user who is liking the book.
- **`bookId`**: The unique ID of the book (from Google Books).

#### Response:
- **201 Created**:
   - **Description:** The book was successfully added to the user's liked books list.
   - **Example Response Body:**
     ```json
     {
       "message": "Book successfully added to liked list."
     }
     ```