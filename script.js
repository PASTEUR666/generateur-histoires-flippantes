async function generer() {
  const themeInput = document.getElementById("theme");
  const theme = themeInput.value;

  try {
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme })
    });

    const data = await response.json();
    document.getElementById("histoire").innerText = data.histoire || "Erreur : Aucune histoire générée.";
  } catch (error) {
    console.error("Erreur lors de la génération :", error);
    document.getElementById("histoire").innerText = "Une erreur s’est produite.";
  }
}
