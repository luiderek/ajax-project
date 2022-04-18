const headbarMenu = document.querySelector('.headbar-menu-toggle');
const sidebarMenu = document.querySelector('.sidebar-modal');
const sidebarContainer = document.querySelector('.sidebar-container');

headbarMenu.addEventListener('click', function (event) {
  sidebarVisibilityToggle();
});

sidebarMenu.addEventListener('click', function (event) {
  if (event.target.className.includes('blur')) {
    sidebarVisibilityToggle();
  }
});

function sidebarVisibilityToggle() {
  sidebarMenu.classList.toggle('blur');
  sidebarContainer.classList.toggle('hidden');
}
