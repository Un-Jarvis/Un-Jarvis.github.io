function fixedSidebar() {
    // Get the sidebar
    var sidebar = document.getElementById("sidebar");
    // Get the offset position of the sidebar
    var sidebarOffset = sidebar.offsetTop;

    if (window.pageYOffset > sidebarOffset - 85.65) {
        sidebar.classList.add("fixedSidebar");
    } else {
        sidebar.classList.remove("fixedSidebar");
    }
}