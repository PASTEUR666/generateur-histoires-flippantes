document.getElementById('generateBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ param: 'valeur' }) // Si tu veux envoyer des paramètres
        });

        if (!response.ok) {
            throw new Error('Une erreur s\'est produite.');
        }

        const data = await response.json();
        document.getElementById('storyText').innerText = data.histoire; // Afficher l'histoire générée
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite. Réessayez !');
    }
});
