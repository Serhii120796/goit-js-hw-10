import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const container = document.querySelector('.cat-info');

fetchBreeds()
  .then(response => createBreedsList(response.data))
  .catch(error => {
    loader.style.display='none';
    errorMessage.style.display='block';
    console.log('Error', error.message);
  });

function createBreedsList(cats) {
  const breedsList = cats.map(({ id, name }) => {
    return { value: id, text: name };
  });
  loader.style.display='none';
  select.style.display='flex';

  new SlimSelect({
    select: '.breed-select',
    data: breedsList,
  });

  select.addEventListener('change', handlerChange);
}

function handlerChange(evt) {
  errorMessage.style.display='none';
  loader.style.display='block';
  container.style.display='none';
  fetchCatByBreed(evt.target.value)
    .then(response => createMarcup(...response.data))
    .catch(error => {
      loader.style.display='none';
      errorMessage.style.display='block';
      console.log('Error', error.message);
    })
}

function createMarcup({ breeds, url }) {
  const { name, temperament, description } = breeds[0];
  const marcup = `
  <img src="${url}" alt="${name}" class="cat-img" height="400">
  <div class="breed-cart">
    <h2 class="breed-name">${name}</h2>
    <p class="breed-description">${description}</p>
    <p class="breed-temperament"><span class="bold-text">Temperament: </span>${temperament}</p>
  </div>
  `;
  loader.style.display='none';
  container.innerHTML = marcup;
  container.style.display='flex';
}
