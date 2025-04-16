function generer() {
  const theme = document.getElementById("theme").value;
  const messageContainer = document.getElementById("message-container");

  // Vérifie si l'élément existe
  if (!messageContainer) {
    console.error("L'élément message-container est introuvable.");
    return;
  }

  if (!theme) {
    messageContainer.innerHTML = "Veuillez entrer un thème pour générer une histoire.";
    return;
  }

  // Afficher un message de chargement
  messageContainer.innerHTML = "Chargement de l'histoire...";

  fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theme: theme }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.histoire) {
        messageContainer.innerHTML = data.histoire;
      } else {
        messageContainer.innerHTML = "Aucune histoire générée. Réessayez plus tard.";
      }
    })
    .catch((error) => {
      console.error("Erreur:", error);
      messageContainer.innerHTML = "Une erreur s'est produite. Essayez encore.";
    });
}
