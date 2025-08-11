// Simple note web app logic
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes') || '[]');
renderNotes();

noteForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const noteText = noteInput.value.trim();
  if (noteText) {
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = '';
    renderNotes();
  }
});

function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, idx) => {
    const li = document.createElement('li');
    li.textContent = note;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'ลบ';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => {
      notes.splice(idx, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      renderNotes();
    };
    li.appendChild(delBtn);
    notesList.appendChild(li);
  });
}