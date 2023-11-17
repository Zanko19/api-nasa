// Remplacez le contenu du fichier script.js par le code ci-dessous

document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'IhgIRdXRBb5EFoHOUBcCLDQO822YVcDectqkRG0Q';
    let currentDate = new Date(); // Initialise avec la date actuelle
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formatDate(currentDate)}`;

    // Fonction pour formater la date au format AAAA-MM-JJ
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Fonction pour mettre à jour l'interface avec les données de l'API
    function updateUI(data) {
        document.getElementById('title').textContent = data.title;
        document.getElementById('date').textContent = `Date: ${data.date}`;
        document.getElementById('apod-image').src = data.url;
        document.getElementById('explanation').textContent = data.explanation;
    }

    // Fonction pour récupérer les données de l'API en fonction de la date
    function fetchAPODData(date) {
        const apiUrlWithDate = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
        fetch(apiUrlWithDate)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                updateUI(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Bouton "Previous"
    document.getElementById('prevButton').addEventListener('click', function () {
        currentDate.setDate(currentDate.getDate() - 1);
        const formattedDate = formatDate(currentDate);
        fetchAPODData(formattedDate);
    });

    // Bouton "Next"
    document.getElementById('nextButton').addEventListener('click', function () {
        currentDate.setDate(currentDate.getDate() + 1);
        const formattedDate = formatDate(currentDate);
        fetchAPODData(formattedDate);
    });

    // Bouton "Search"
    document.getElementById('searchButton').addEventListener('click', function () {
        const selectedDate = document.getElementById('dateInput').value;
        fetchAPODData(selectedDate);
    });

    // Appeler la fonction pour récupérer les données de l'API avec la date actuelle
    fetchAPODData(formatDate(currentDate));
});
