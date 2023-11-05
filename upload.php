<?php
// Assurez-vous que le dossier de destination existe et a les autorisations d'écriture nécessaires
$targetDirectory = 'uploads/';

if (!file_exists($targetDirectory)) {
  mkdir($targetDirectory, 0777, true);
}

// Générer un nom de fichier unique
$imageName = uniqid() . '_' . $_FILES['image']['name'];
$targetFilePath = $targetDirectory . $imageName;

// Déplacer le fichier téléchargé vers le dossier de destination
if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
  // Renvoyer le chemin de l'image relative au dossier du site
  echo json_encode(['imagePath' => $targetFilePath]);
} else {
  echo "Erreur lors du téléchargement de l'image.";
}
?>
