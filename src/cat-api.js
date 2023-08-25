function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/breeds';
  const API_KEY =
    'live_QoAFpXJ0Tf8GdGNdEAmOE81aj5UOO9SoN4W537HZj7cZdaRCFoGeW4qsKpdPG0Al';

  const params = new URLSearchParams({
    'x-api-key': API_KEY,
  });

  return fetch(`${BASE_URL}${END_POINT}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/images/search';
  const API_KEY =
    "live_QoAFpXJ0Tf8GdGNdEAmOE81aj5UOO9SoN4W537HZj7cZdaRCFoGeW4qsKpdPG0Al";

  const params = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: breedId
  });

  return fetch(`${BASE_URL}${END_POINT}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

export { fetchBreeds };
export { fetchCatByBreed };
