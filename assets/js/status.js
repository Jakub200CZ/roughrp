const apiUrl = "https://rough.marsalek-dominik.cz/data.php";
const showPlayerData = (playerCount) => {
    const playerCountElement = document.getElementById('playerCount');
    const maxPlayers = 64;

    const childSettings = {
        class: 'playerCountNumber',
        content: `${playerCount}/${maxPlayers}`
    };

    updateParent(playerCountElement, 'Hráčů: ', childSettings);
};
const showStatus = (status) => {
    const statusElement = document.getElementById('serverStatus');
    let text = 'OFFLINE';
    let className = 'serverStatusOffline';
    if (status) {
        text = 'ONLINE';
        className = 'serverStatusOnline';
    }
    const childSettings = {
        class: className,
        content: text
    };

    updateParent(statusElement, 'Server: ', childSettings);
};

const updateParent = (parentElement, description, childSettings) => {
    parentElement.innerHTML = ''; //clears inner data before update
    const descriptionText = document.createTextNode(description);
    const childText = document.createTextNode(childSettings.content);
    parentElement.appendChild(descriptionText);
    const child = document.createElement('span');
    child.classList.add(childSettings.class);
    child.appendChild(childText);
    parentElement.appendChild(child);
}

const refresh = () => {
    fetch(`${apiUrl}`)
        .then(response => response.json())
        .then(data => {
            showStatus(data.isServerOnline);
            showPlayerData(data.playersOnline);
        })
        .catch(err => {
            showStatus(false);
            showPlayerData(0);
        });
}
refresh();

setInterval(() => {
    refresh();
}, 60 * 1000); //1 minutes