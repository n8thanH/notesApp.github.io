// DOM Objects
const inputContainer = document.getElementById("inputContainer");
const notesTitleInput = inputContainer["noteTitle"];
const notesDescInput = inputContainer["noteDesc"];
const notesContainer = document.getElementById("notesContainer");
const deleteAllButton = document.getElementById("deleteAll");

deleteAllButton.addEventListener('click', () => deleteAll());

// Delete All Button
function deleteAll() {
    localStorage.clear();
    notes = [];
    notesContainer.innerHTML = '';
}

// Create an Array with the previous data or just a new blank array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Adding notes to the local storage
const addNote = (title, desc) => {
    notes.push({ title, desc });

    localStorage.setItem("notes", JSON.stringify(notes));
    return { title, desc };
};

    // Delete notes
function deleteNote(element, title, desc) {
    element.remove();
    const index = notes.indexOf({title, desc});
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
};

// Create and append elements
const createNoteElement = ({ title, desc }) => {
    // Create
    const noteDiv = document.createElement("div");
    const noteTitle = document.createElement("h2");
    const noteDesc = document.createElement("p");
    const deleteBtn = document.createElement("button");

    // Add Input
    noteTitle.innerText = title;
    noteDesc.innerText = desc;
    deleteBtn.innerText = "Delete";

    // Make delete button work
    deleteBtn.addEventListener('click', () => deleteNote(noteDiv, title, desc));

    // Append
    noteDiv.append(noteTitle, noteDesc, deleteBtn);
    notesContainer.appendChild(noteDiv);
    notesContainer.style.display = notes.length === 0 ? "none" : "flex";
};

// Load from storage on startup
notesContainer.style.display = notes.length === 0 ? "none" : "flex";
notes.forEach(createNoteElement);

// Specifying procedures for the form on submit
inputContainer.onsubmit = e => {
    e.preventDefault();
    const addNoteComponents = addNote(
        notesTitleInput.value,
        notesDescInput.value
    );

    createNoteElement(addNoteComponents);
    notesTitleInput.value = "";
    notesDescInput.value = "";
};