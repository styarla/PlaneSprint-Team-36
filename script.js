// Firebase configuration
const firebaseConfig = {
    // Add your Firebase config here
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get reference to the Firebase database
  const database = firebase.database();
  
  // Create new question button event listener
  document.getElementById("newQuestionBtn").addEventListener("click", function() {
    document.getElementById("modal").style.display = "block";
  });
  
  // Close modal event listener
  document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
  });
  
  // Submit question event listener
  document.getElementById("submitQuestionBtn").addEventListener("click", function() {
    const questionInput = document.getElementById("questionInput").value;
    const imageInput = document.getElementById("imageInput").files;
  
    // Upload images to Firebase storage (if any)
    const imageUrls = [];
    if (imageInput.length > 0) {
      for (let i = 0; i < imageInput.length; i++) {
        const imageFile = imageInput[i];
        const storageRef = firebase.storage().ref().child('images/' + imageFile.name);
        const uploadTask = storageRef.put(imageFile);
        uploadTask.on('state_changed', null, null, function() {
          // Upload completed, get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            imageUrls.push(downloadURL);
  
            // Once all images are uploaded, save the question to the database
            if (imageUrls.length === imageInput.length) {
              saveQuestion(questionInput, imageUrls);
            }
          });
        });
      }
    } else {
      // No images, save the question to the database
      saveQuestion(questionInput, imageUrls);
    }
  
    // Reset the modal inputs
    document.getElementById("questionInput").value = "";
    document.getElementById("imageInput").value = "";
    document.getElementById("modal").style.display = "none";
  });
  
  // Function to save a question to the database
  function saveQuestion(question, images) {
    const questionData = {
      question: question,
      images: images,
      answers: []
    };
  
    database.ref('questions').push(questionData);
  }
  
  // Function to render questions from the database
  function renderQuestions(questions) {
    const questionList = document.getElementById("questionList");
    questionList.innerHTML = "";
  
    questions.forEach(function(question) {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
      questionDiv.innerHTML = "<p>" + question.question + "</p>";
  
      if (question.images.length > 0) {
        question.images.forEach(function(imageUrl) {
          const img = document.createElement("img");
          img.src = imageUrl;
          questionDiv.appendChild(img);
        });
      }
  
      const answersDiv = document.createElement("div");
      answersDiv.classList.add("answers");
  
      question.answers.forEach(function(answer) {
        const answerDiv = document.createElement("div");
        answerDiv.innerHTML = "<p>" + answer + "</p>";
        answersDiv.appendChild(answerDiv);
      });
  
      questionDiv.appendChild(answersDiv);
  
      questionList.appendChild(questionDiv);
    });
  }
  
  // Event listener for search input
  document.getElementById("searchInput").addEventListener("input", function() {
    const searchQuery = this.value.toLowerCase();
    const questionsRef = database.ref('questions');
    questionsRef.once('value', function(snapshot) {
      const questions = [];
      snapshot.forEach(function(childSnapshot) {
        const question = childSnapshot.val();
        if (question.question.toLowerCase().includes(searchQuery)) {
          questions.push({
            id: childSnapshot.key,
            question: question.question,
            images: question.images,
            answers: question.answers
          });
        }
      });
      renderQuestions(questions);
    });
  });
  
  // Event listener for database changes
  database.ref('questions').on('value', function(snapshot) {
    const questions = [];
    snapshot.forEach(function(childSnapshot) {
      const question = childSnapshot.val();
      questions.push({
        id: childSnapshot.key,
        question: question.question,
        images: question.images,
        answers: question.answers
      });
    });
    renderQuestions(questions);
  });