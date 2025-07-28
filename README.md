# Book Management API – Request Logging Middleware

**Task 5: Implement Request Logging Middleware in Express**  
**Submitted by:** Athmika U  
**College:** Sahyadri College of Engineering & Management  
**Contact:** [athmikubhat@gmail.com](mailto:athmikubhat@gmail.com)

---

## Overview

This is a simple Book Management API built using **Node.js** and **Express**. It includes a custom **request logging middleware** that logs each HTTP request to a file with details such as method, URL, timestamp, and status code. This helps in monitoring, debugging, and analyzing API usage.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AthmikaU/AthmikaU_Sahyadri_React_Task5.git
cd AthmikaU_Sahyadri_React_Task5
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
node AthmikaU_Sahyadri_React_Task5.js
```

Your server will be running at:
```
http://localhost:3000
```

---

## Project Structure

```
📁 logs/
   └── requests.log       # Log file (auto-created)

📁 endpoint-test-results/       # Contains screenshots of all API endpoints tested using Postman

📄 AthmikaU_Sahyadri_React_Task5.js   # Main Express app with middleware
📄 package.json

```

---


## Request Logging Middleware

### What it Does

This middleware logs every HTTP request made to the server. It captures and saves the following information for each request:

* Request Method (GET, POST, PUT, DELETE)
* Request URL
* Timestamp (in Indian Standard Time)
* Response Status Code

Logs are saved to `logs/requests.log`.

---

### Where to Find Logs

Log file path:

```
logs/requests.log
```

---

## How to Interpret Logs

Each log entry (in **text format**) follows this pattern:

```sql
[Timestamp] METHOD URL STATUS
```

- Example:

```text
[28/7/2025, 9:34:29 am] GET /books 200
```

* `Timestamp`: When the request was made
* `METHOD`: HTTP request type
* `URL`: Endpoint hit
* `STATUS`: Server response status code

---

### Log Format (Text)

```text
[28/7/2025, 9:34:29 am] GET /books 200
[28/7/2025, 9:37:35 am] GET /books/30 404
[28/7/2025, 9:38:27 am] POST /books 201
[28/7/2025, 9:38:38 am] POST /books 409
[28/7/2025, 9:44:29 am] PUT /books/1 200
[28/7/2025, 9:44:56 am] PUT /books/10 404
[28/7/2025, 9:46:58 am] DELETE /books/4 200
[28/7/2025, 9:47:25 am] DELETE /books/4 404
```

---

### JSON Log Format

Each log entry (in **JSON format**) follows this structure:

```json
{
  "method": "METHOD",
  "url": "/endpoint",
  "statusCode": "STATUS",
  "timestamp": "DD/MM/YYYY, hh:mm:ss am/pm"
}
```

- Example logs:

```json
{"method":"GET","url":"/books","statusCode":200,"timestamp":"27/7/2025, 7:18:05 pm"}
{"method":"GET","url":"/books/30","statusCode":404,"timestamp":"27/7/2025, 7:18:41 pm"}
{"method":"POST","url":"/books","statusCode":201,"timestamp":"27/7/2025, 7:20:07 pm"}
{"method":"POST","url":"/books","statusCode":409,"timestamp":"27/7/2025, 7:20:17 pm"}
{"method":"PUT","url":"/books/1","statusCode":200,"timestamp":"27/7/2025, 7:20:21 pm"}
{"method":"PUT","url":"/books/10","statusCode":404,"timestamp":"27/7/2025, 7:20:47 pm"}
{"method":"DELETE","url":"/books/4","statusCode":200,"timestamp":"27/7/2025, 7:21:14 pm"}
{"method":"DELETE","url":"/books/4","statusCode":404,"timestamp":"27/7/2025, 7:21:17 pm"}
```

## Status Code Meanings

- To understand the meaning of each HTTP status code (200, 404, 201, etc.), refer to the official documentation here:
 [MDN Web Docs: HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)

---

## API Endpoints

### ➤ Get all books
```http
GET http://localhost:3000/books
```
Returns:
```json
[
  {
    "id": 1,
    "title": "Atomic Habits",
    "author": "James Clear"
  },
  {
    "id": 2,
    "title": "Deep Work",
    "author": "Cal Newport"
  }
]
```

---

### ➤ Get book by ID
```http
GET http://localhost:3000/books/1
```
Returns:
```json
{
  "id": 1,
  "title": "Atomic Habits",
  "author": "James Clear"
}
```

---

### ➤ Add a new book
```http
POST http://localhost:3000/books
```
Body:
```json
{
  "title": "The Pragmatic Programmer",
  "author": "Andy Hunt"
}
```
```json
{
  "title": "Book Title",
  "author": "Author"
}
```

---

### ➤ Update book by ID
```http
PUT http://localhost:3000/books/1
```
Body:
```json
{
  "title": "Atomic Habits (Updated)"
}
```

---

### ➤ Delete book
```http
DELETE http://localhost:3000/books/4
```
Response:
```json
{
  "message": "Book deleted successfully."
}
```

---

## Testing the Middleware

Use **Postman** or `curl` to test:

```bash
curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-d '{"title": "Clean Code", "author": "Robert C. Martin"}'
```

Test all methods:
- `GET /books`
- `GET /books/:id` (valid & invalid ID)
- `POST /books` 
- `PUT /books/:id` (valid & invalid ID)
- `DELETE /books/:id` (valid & invalid ID)

Then check:
```
logs/requests.log
```

Verify that each request is logged correctly with all required info.


## `endpoint-test-results/`

- This folder contains screenshots of all API endpoints tested using Postman.

- `Purpose:` Visually demonstrate that all CRUD operations were tested and passed.

- Includes screenshots of:

   - GET /books

   - GET /books/1

   - POST /books

   - PUT /books/1

   - DELETE /books/4

---

## Deployment

### Pre-Deployment Checklist

- Ensure logging middleware is loaded before route handlers
- Add `logs/` to `.gitignore`
- Set correct file permissions for logs
- Use environment variables for log config (if extended)

### Deployment Options

- Cloud platforms like Render, Railway, Vercel (use file-based logs cautiously)

---

## Monitoring and Post-Deployment Checks

After deployment:

- **Confirm**: Requests are being logged in production
- **Monitor**: Log file size, frequency of writes
- **Ensure**: No slowdown due to synchronous logging

---

## Summary

This middleware helps capture and persist detailed request logs to support monitoring, debugging, and audit tracking in Book Management Application.

- Developed with minimal dependencies  
- Tested across all HTTP verbs  
- Ready for production deployment

---

## Contact

For queries or feedback, feel free to reach me:  
  [athmikubhat@gmail.com](mailto:athmikubhat@gmail.com) 

---
