// server.js
const express = require('express');
const app = express();
const port = 3000; // Ou un port de votre choix

const Discord = require('discord.js');
const client = new Discord.Client();

function getStats() {
  const guild = client.guilds.cache.get(GUILD_ID);
  if (guild) {
    const totalMembers = guild.memberCount;
    const onlineMembers = guild.members.cache.filter(member => member.presence.status === 'online').size;
    const offlineMembers = guild.members.cache.filter(member => member.presence.status === 'offline').size;
    const idleMembers = guild.members.cache.filter(member => member.presence.status === 'idle').size;

    return {
      totalMembers,
      onlineMembers,
      offlineMembers,
      idleMembers
    };
  }
}

// Connexion au bot Discord et démarrage du serveur Node.js
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
  });
});

client.login(TOKEN).catch(console.error);

// Route pour fournir les statistiques du serveur via une API
app.get('/api/stats', (req, res) => {
  const stats = getStats();
  res.json(stats);
});

app.get('/api/stats', (req, res) => {
  const stats = getStats();
  res.json(stats);
});

const path = require('path');
const fs = require('fs');

const txtDir = path.join(__dirname, 'txt');

app.get('/titles', (req, res) => {
  fs.readdir(txtDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la lecture des fichiers.');
    } else {
      const htmlFiles = files.filter(file => path.extname(file) === '.html');
      res.json(htmlFiles.map(file => path.basename(file, '.html')));
    }
  });
});

app.use(express.static('public')); // Permet de servir d'autres fichiers statiques comme vos fichiers HTML

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});