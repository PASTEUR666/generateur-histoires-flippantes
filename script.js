function generer() {
  const prompt = document.getElementById("prompt").value;

  fetch('http://localhost:3001/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("resultat").innerText = data.story;
  })
  .catch(error => {
    console.error('Erreur:', error);
    document.getElementById("resultat").innerText = "Une erreur s’est produite.";
  });
}
