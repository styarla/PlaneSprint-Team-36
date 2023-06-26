const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// API endpoints
app.get('/api/questions', (req, res) => {
  // Replace this with your logic to retrieve questions from the database
  const questions = [
    {
      id: 1,
      title: 'Sample Question 1',
      content: 'This is the content of sample question 1.',
      upvotes: 10,
      bestAnswer: null
    },
    {
      id: 2,
      title: 'Sample Question 2',
      content: 'This is the content of sample question 2.',
      upvotes: 5,
      bestAnswer: null
    }
  ];

  res.json(questions);
});

app.post('/api/questions', (req, res) => {
  // Replace this with your logic to handle new question submission
  // and save it to the database
  res.json({ message: 'Question submitted successfully.' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});