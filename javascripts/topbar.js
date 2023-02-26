function initTopbar(input) {
    var topbar = document.getElementById("topbar");
    topbar.innerHTML = `
        <nav class="navbar">
            <a id="home" href="../index.html">Home</a>
            <a id="projects" href="../projects.html">Projects</a>
            <div class="dropdown">
                <button id="pictures">Pictures</button>
                <div class="dropdown-content boxShadow">
                    <a href="../pictures/pictures_bns.html">Blade & Soul</a>
                    <a href="../pictures/pictures_photo.html">Photographs</a>
                </div>
            </div>
            <a id="games" href="../games/jumperGame/game.html">Game</a>
        </nav>
    `;

    var active = document.getElementById(input);
    active.classList.add("active");
}

function initTopbarFromRoot(input) {
    var topbar = document.getElementById("topbar");
    topbar.innerHTML = `
        <nav class="navbar">
            <a id="home" href="index.html">Home</a>
            <a id="projects" href="projects.html">Projects</a>
            <div class="dropdown">
                <button id="pictures">Pictures</button>
                <div class="dropdown-content boxShadow">
                    <a href="pictures/pictures_bns.html">Blade & Soul</a>
                    <a href="pictures/pictures_photo.html">Photographs</a>
                </div>
            </div>
            <a id="games" href="games/jumperGame/game.html">Game</a>
        </nav>
    `;

    var active = document.getElementById(input);
    active.classList.add("active");
}