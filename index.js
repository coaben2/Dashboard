// Gérer la fenêtre modale
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModalButton = document.getElementsByClassName('close')[0];

function openModal(fileName) {
  fetch(fileName)
    .then(response => response.text())
    .then(content => {
      modalContent.innerHTML = content;
      modal.style.display = 'block';
    })
    .catch(err => console.error(err));
}

closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
  modalContent.innerHTML = '';
});

window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
  }
});
