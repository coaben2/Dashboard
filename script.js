// script.js
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const blogContent = document.getElementById('blog-content');
  
    // Fonction pour charger le contenu d'une histoire
    function loadStory(title) {
      fetch(`txt/${title}.html`)
        .then(response => response.text())
        .then(content => {
          blogContent.innerHTML = content;
        })
        .catch(err => console.error(err));
    }
  
    // Fonction pour obtenir la liste des titres depuis le serveur
    function getTitles() {
      fetch('/titles')
        .then(response => response.json())
        .then(titles => {
          titles.forEach(title => {
            const button = document.createElement('button');
            button.textContent = title;
            button.addEventListener('click', () => loadStory(title));
            sidebar.querySelector('.titles-container').appendChild(button);
          });
        })
        .catch(err => console.error(err));
    }
  
    // Appeler la fonction pour obtenir les titres
    getTitles();
  });
  
  // Fonction pour réduire ou élargir la colonne gauche
  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.width = sidebar.style.width === '200px' ? '50px' : '200px';
  }
