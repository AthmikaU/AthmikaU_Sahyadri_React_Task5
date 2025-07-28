// Task 5: Request Logging Middleware for Book Management Application
// Submitted by: Athmika U, Sahyadri College of Engineering & Management

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// logging middleware
function requestLogger(options = {}) {
  const {
    logFilePath = path.join(__dirname, 'logs', 'requests.log'),
    format = 'text', // or 'json'
  } = options;

  return (req, res, next) => {
    res.on('finish', () => {
      // const timestamp = new Date().toISOString();
      const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

      const logData = {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        timestamp,
      };

      let logEntry;
      if (format === 'json') {
        logEntry = JSON.stringify(logData) + '\n';
      } else {
        logEntry = `[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} \n`;
      }

      fs.mkdir(path.dirname(logFilePath), { recursive: true }, (mkdirErr) => {
        if (mkdirErr) {
          console.error('Failed to create log directory:', mkdirErr);
          return;
        }

        fs.appendFile(logFilePath, logEntry, (err) => {
          if (err) console.error('Error writing to log file:', err);
        });
      });
    });

    next();
  };
}

// apply middleware globally
app.use(
  requestLogger({
    format: 'text', // or 'json'
    logFilePath: path.join(__dirname, 'logs', 'requests.log'),
  })
);

// in-memory book store
let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' },
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET one book by id
app.get('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author required' });
  }

  const exists = books.some(
    (book) =>
      book.title.toLowerCase() === title.toLowerCase() &&
      book.author.toLowerCase() === author.toLowerCase()
  );

  if (exists) {
    return res.status(409).json({ error: 'Book with this title and author already exists' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) a book
app.put('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { title, author } = req.body;

  if (title) {
    const duplicate = books.find((b) => b.title.toLowerCase() === title.toLowerCase() && b.id !== book.id);
    if (duplicate) return res.status(409).json({ error: 'Duplicate book title not allowed' });
    book.title = title;
  }

  if (author) book.author = author;

  res.json(book);
});

// DELETE book
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const removed = books.splice(index, 1);
  res.json({ message: 'Book deleted', book: removed[0] });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});