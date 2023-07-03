// Retrieve notes from local storage or initialize an empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to save notes to local storage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to create a note object
function createNoteObject(title, content) {
  return {
    title: title,
    content: content,
    timestamp: new Date().toLocaleString()
  };
}

// Function to add a new note
function addNote() {
  const noteTitleInput = document.getElementById("noteTitle");
  const noteContentInput = document.getElementById("noteContent");

  const title = noteTitleInput.value;
  const content = noteContentInput.value;

  const note = createNoteObject(title, content);
  notes.push(note);

  saveNotes();

  noteTitleInput.value = "";
  noteContentInput.value = "";

  renderNoteList();
}

// Function to delete a note
function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNoteList();
}

// Function to render the note list
function renderNoteList() {
  const noteListElement = document.getElementById("noteList");

  // Clear the existing content of the note list
  noteListElement.innerHTML = "";

  // Create and append note elements for each note
  notes.forEach(function (note, index) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    const titleElement = document.createElement("h2");
    titleElement.textContent = note.title;

    const contentElement = document.createElement("p");
    contentElement.textContent = note.content;

    const timestampElement = document.createElement("p");
    timestampElement.textContent = note.timestamp;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      deleteNote(index);
    });

    noteElement.appendChild(titleElement);
    noteElement.appendChild(contentElement);
    noteElement.appendChild(timestampElement);
    noteElement.appendChild(deleteButton);

    noteListElement.appendChild(noteElement);
  });
}

// Event listener for the note form submission
document.getElementById("noteForm").addEventListener("submit", function (event) {
  event.preventDefault();
  addNote();
});

// Render the initial note list
renderNoteList();
