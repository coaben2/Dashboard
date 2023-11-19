const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [
    // Ajoutez ici les intents dont vous avez besoin
    'MEMBERS', // Pour accéder aux informations sur les membres du serveur
    'PRESENCES' // Pour accéder aux informations de présence des membres du serveur (en option)
  ]
});
const TOKEN = '123';
const GUILD_ID = '456'; 

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  updateStats(); // Mettre à jour les statistiques une fois que le bot est prêt
});

function updateStats() {
  const guild = client.guilds.cache.get(GUILD_ID);

  if (guild) {
    const totalMembers = guild.memberCount;
    const onlineMembers = guild.members.cache.filter(member => member.presence.status === 'online').size;
    const offlineMembers = guild.members.cache.filter(member => member.presence.status === 'offline').size;
    const idleMembers = guild.members.cache.filter(member => member.presence.status === 'idle').size;

    console.log(`Nombre total de membres : ${totalMembers}`);
    console.log(`Membres en ligne : ${onlineMembers}`);
    console.log(`Membres hors ligne : ${offlineMembers}`);
    console.log(`Membres absents : ${idleMembers}`);
  }
}

client.login(TOKEN).catch(console.error);
// JavaScript pour charger le contenu du fichier texte et afficher le texte et l'image
// ...

// Afficher la liste des fichiers texte
const fileList = document.getElementById('file-list');
fetchFileList();

async function fetchFileList() {
  const response = await fetch('file-list.php'); // Remplacez par votre méthode de récupération de la liste de fichiers
  const fileNames = await response.json();

  fileNames.forEach(fileName => {
    const fileLink = document.createElement('a');
    fileLink.textContent = fileName;
    fileLink.href = '#'; // Pour éviter que la page se recharge
    fileLink.addEventListener('click', () => openModal(fileName));
    fileList.appendChild(fileLink);
    fileList.appendChild(document.createElement('br'));
  });
}

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
