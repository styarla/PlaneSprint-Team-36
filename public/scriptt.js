//Sample questions
const questions = [
    {
      id: 1,
      title: 'Sample Question 1',
      content: 'This is the content of sample question 1.',
      upvotes: 10,
      bestAnswer:null
    },
    {
      id: 2,
      title: 'Sample Question 2',
      content: 'This is the content of sample question 2.',
      upvotes: 5,
      bestAnswer: null
    }
  ];
  
  // Function to render the questions
  function renderQuestions() {
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = '';
  
    questions.forEach(question => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
  
      const title = document.createElement('h3');
      title.textContent = question.title;
  
      const content = document.createElement('p');
      content.textContent = question.content;
  
      const upvotes = document.createElement('p');
      upvotes.textContent = `Upvotes: ${question.upvotes}`;
  
      questionDiv.appendChild(title);
      questionDiv.appendChild(content);
      questionDiv.appendChild(upvotes);
      questionsContainer.appendChild(questionDiv);
    });
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const titleInput = document.getElementById('questionTitle');
    const contentInput = document.getElementById('questionContent');
  
    const newQuestion = {
      id: questions.length + 1,
      title: titleInput.value,
      content: contentInput.value,
      upvotes: 0,
      bestAnswer: null
    };
  
    questions.push(newQuestion);
  
    titleInput.value = '';
    contentInput.value = '';
  
    renderQuestions();
  }
  
  // Event listener for form submission
  const newQuestionForm = document.getElementById('newQuestionForm');
  newQuestionForm.addEventListener('submit', handleFormSubmit);
  
  // Initial rendering of questions
  renderQuestions();