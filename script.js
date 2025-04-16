document.addEventListener('DOMContentLoaded', () => {
  const bouton = document.getElementById('genererBtn');
  bouton.addEventListener('click', generer);
});

function generer() {
  const themeInput = document.getElementById('theme');
  const resultatDiv = document.getElementById('resultat');

  if (!themeInput) {
    console.error("L'élément #theme est introuvable.");
    return;
  }

  const theme = themeInput.value;

  fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ theme })
  })
  .then(res => res.json())
  .then(data => {
    resultatDiv.innerText = data.histoire || "Aucune histoire générée.";
  })
  .catch(err => {
    resultatDiv.innerText = "Une erreur s’est produite.";
    console.error(err);
  });
}
