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
});

function getJSOMFromAPI(endpoint) {
  const xhr = new XMLHttpRequest();
  const targetUrl = encodeURIComponent('https://api.jikan.moe/v4/manga' + '?min_score=.5&q=' + endpoint);
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    // console.log('xhr.status:', xhr.status);
    if (xhr.response.data.length) {
      // console.log('xhr.response.data:', xhr.response.data);
      for (let i = 0; i < 2; i++) {
        // console.log(xhr.response.data[i].title);
        for (let j = 0; j < xhr.response.data[i].genres.length; j++) {
          // console.log('genres: ' + xhr.response.data[i].genres[j].name);
        }
        // console.log(xhr.response.data[i].images.jpg.image_url);
        // console.log(xhr.response.data[i].synopsis);
      }
    } else {
      // console.log('query found nothing.');
    }
  });
  xhr.send();
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
  // $img.setAttribute('src', object.imageurl);
  $cardText.className = 'card-text';
  const $h4 = document.createElement('h4');
  // $h4.textContent = object.title;
  const $p = document.createElement('p');
  // $p.textContent = object.description;

  $cardText.appendChild($h4);
  $cardText.appendChild($p);
  $cardImage.appendChild($img);
  $card.appendChild($cardImage);
  $card.appendChild($cardText);

  return $card;
}

$cardContainer.appendChild(cardObjectToDOM());
