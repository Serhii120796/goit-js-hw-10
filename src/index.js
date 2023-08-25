import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

const select = document.querySelector('.breed-select');
const container = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorr = document.querySelector('.error');

select.addEventListener('change', handlerChange);

fetchBreeds()
  .then(response => response.data)
  .then(cats => createBreedsList(cats))
  .catch(error => {
    errorr.classList.remove("visually-hidden");
    loader.classList.add("visually-hidden");
    return console.log(error)
  });

function createBreedsList(cats) {
  const marcup = cats
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  loader.classList.add("visually-hidden");
  select.classList.remove("visually-hidden");
  select.insertAdjacentHTML('beforeEnd', marcup);
}

function handlerChange(evt) {
  errorr.classList.add("visually-hidden");
  fetchCatByBreed(evt.target.value)
    .then(cat => createMarcup(...cat))
    .catch(error => {
      loader.classList.add("visually-hidden");
    errorr.classList.remove("visually-hidden");
        return console.log(error)
  })
    .finally(loader.classList.remove("visually-hidden"),
  container.classList.add("visually-hidden"));
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
  loader.classList.add("visually-hidden");
  container.innerHTML = marcup;
  container.classList.remove("visually-hidden");
}

