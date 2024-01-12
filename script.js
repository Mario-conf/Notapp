document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('add');
    const notesContainer = document.getElementById('notes-container');
    const body = document.body;
    const noteTemplate = document.getElementById('note-template');
  
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    if (notes.length > 0) {
      notes.forEach(note => addNewNote(note.text));
    }
  
    addBtn.addEventListener('click', () => addNewNote());
  
    function addNewNote(text = '') {
      const templateContent = noteTemplate.content.cloneNode(true);
      const note = templateContent.querySelector('.note');
      const main = templateContent.querySelector('.main');
      const textArea = templateContent.querySelector('textarea');
  
      textArea.value = text;
      main.innerHTML = marked(text);
  
      const deleteBtn = templateContent.querySelector('.delete');
      const editBtn = templateContent.querySelector('.edit');
  
      deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
      });
  
      editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
      });
  
      textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
      });
  
      notesContainer.appendChild(templateContent);
      updateLS();
    }
  
    function updateLS() {
      const notesText = document.querySelectorAll('.note textarea');
      const updatedNotes = [];
  
      notesText.forEach((noteTextArea) => {
        updatedNotes.push({ text: noteTextArea.value });
      });
  
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  
    const toggleModeButton = document.getElementById('toggleMode');
    toggleModeButton.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
    });
  });
  