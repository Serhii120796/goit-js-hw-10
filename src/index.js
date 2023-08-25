import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

const select = document.querySelector('.breed-select');
const container = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');


select.addEventListener('change', handlerChange);

loader.classList.add("visually-hidden");
error.classList.add("visually-hidden");

fetchBreeds()
  .then(response => response.data)
  .then(cats => createBreedsList(cats))
  .catch(error => console.log(error));

function createBreedsList(cats) {
  const marcup = cats
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  select.insertAdjacentHTML('beforeEnd', marcup);
}

function handlerChange(evt) {
  // loader.classList.remove("visually-hidden");
  fetchCatByBreed(evt.target.value)
    .then(cat => createMarcup(...cat))
    .catch(error => console.log(error));
}

function createMarcup({ breeds, url }) {
  const { name, temperament, description } = breeds[0];
  const marcup = `
  <img src="${url}" alt="${name}" class="breed-img" width="${500}">
  <div class="breed-wraper">
    <h1 class="breed-name">${name}</h1>
    <p class="breed-description">${description}</p>
    <p class="breed-temperament"><span class="bold-text">Temperament: </span>${temperament}</p>
  </div>
  `;
// loader.classList.add("visually-hidden");
  container.innerHTML = marcup;
}

