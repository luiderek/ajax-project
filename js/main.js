/* global data */
/* exported data */

const $headbarMenu = document.querySelector('.headbar-menu-toggle');
const $sidebarMenu = document.querySelector('.sidebar-modal');
const $sidebarContainer = document.querySelector('.sidebar-container');
const $cardContainer = document.querySelector('.card-container');

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
  sidebarVisibilityToggle();
});

function getJSOMFromAPI(endpoint) {
  const xhr = new XMLHttpRequest();
  // 12 and 49 are nsfw genres.
  const targetUrl = encodeURIComponent('https://api.jikan.moe/v4/manga' + '?limit=8&sfw=true&genres_exclude=12,49&q=' + endpoint);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.response.data.length) {
      data.entries = [];
      for (let i = 0; i < xhr.response.data.length; i++) {
        const viewObject = {
          title: xhr.response.data[i].title,
          image: xhr.response.data[i].images.jpg.image_url,
          synopsis: xhr.response.data[i].synopsis
        };
        data.entries.push(viewObject);
      }
      cardContainerClearDOM();
      renderDataObject();
    } else {
      // query finds nothing
    }
  });
  xhr.send();
}

function renderDataObject() {
  for (const entry of data.entries) {
    $cardContainer.appendChild(cardObjectToDOM(entry));
  }
}

function cardContainerClearDOM() {
  const $cardNodeList = document.querySelectorAll('.card');
  for (const node of $cardNodeList) {
    node.remove();
  }
}

function cardObjectToDOM(object) {
// <div class="card">
//   <div class="card-image">
//     <img src="https://cdn.myanimelist.net/images/manga/5/IMAGENUMBER.jpg" alt="">
//   </div>
//   <div class="card-text">
//     <h4>Title Text</h4>
//     <p>Description Text</p>
//   </div>
// </div>

  const $card = document.createElement('div');
  $card.className = 'card';
  const $cardImage = document.createElement('div');
  $cardImage.className = 'card-image';
  const $cardText = document.createElement('div');
  const $img = document.createElement('img');
  $cardText.className = 'card-text';
  const $h4 = document.createElement('h4');
  const $p = document.createElement('p');

  if (object) {
    $img.setAttribute('src', object.image);
    $h4.textContent = object.title;
    $p.textContent = object.synopsis;
  }

  $cardText.appendChild($h4);
  $cardText.appendChild($p);
  $cardImage.appendChild($img);
  $card.appendChild($cardImage);
  $card.appendChild($cardText);

  return $card;
}
