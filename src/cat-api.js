import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_QoAFpXJ0Tf8GdGNdEAmOE81aj5UOO9SoN4W537HZj7cZdaRCFoGeW4qsKpdPG0Al';
const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  const END_POINT = '/breeds';

  return axios.get(`${BASE_URL}${END_POINT}`);
}

function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';

  const params = new URLSearchParams({
    breed_ids: breedId,
  });

    return axios.get(`${BASE_URL}${END_POINT}?${params}`);
  }

export { fetchBreeds };
export { fetchCatByBreed };
