const $headbarMenu = document.querySelector('.headbar-menu-toggle');
const $sidebarMenu = document.querySelector('.sidebar-modal');
const $sidebarContainer = document.querySelector('.sidebar-container');

$headbarMenu.addEventListener('click', function (event) {
  sidebarVisibilityToggle();
});

$sidebarMenu.addEventListener('click', function (event) {
  if (event.target.className.includes('blur')) {
    sidebarVisibilityToggle();
  }
});

function sidebarVisibilityToggle() {
  $sidebarMenu.classList.toggle('blur');
  $sidebarContainer.classList.toggle('hidden');
}

const $sidebarSearchbar = document.querySelector('form#search');

$sidebarSearchbar.addEventListener('submit', function (event) {
  event.preventDefault();
  getJSOMFromAPI($sidebarSearchbar.elements[0].value);
  $sidebarSearchbar.reset();
});

function getJSOMFromAPI(endpoint) {
  const xhr = new XMLHttpRequest();
  // &order_by="popularity"&sort="asc"
  // figure out the correct use of more of the parameters later
  const targetUrl = encodeURIComponent('https://api.jikan.moe/v4/manga' + '?min_score=.4&q=' + endpoint);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log('xhr.status:', xhr.status);
    // console.log('xhr.response:', xhr.response);
  });
  xhr.send();
}
