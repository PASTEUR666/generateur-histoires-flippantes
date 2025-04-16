document.getElementById("generateBtn").addEventListener("click", async () => {
  const storyContainer = document.getElementById("storyContainer");
  storyContainer.innerText = "Chargement de l’histoire...";

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    storyContainer.innerText = data.story;
  } catch (error) {
    storyContainer.innerText = "Une erreur s’est produite.";
    console.error(error);
  }
});
