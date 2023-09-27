import axios from 'axios';
// бібліотека для виконання HTTP запитів на api котів

axios.defaults.headers.common['x-api-key'] =
  'live_msdyLXd6fQ4XqkQOafThG3QlqI9pVAyJsQYWr21gOKoQrJvn3mlevFEdkllUWaMq';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

// ф-ція для отримання списку порід
export function fetchBreeds() {
  return axios.get('breeds').then(({ data }) => {
    return data;
  });
}

// ф-ція ідентифікатор породиь  => СПИСОК об, які предст котів певної породи
export function fetchCatByBreed(breedId) {
  return axios.get(`images/search?breed_ids=${breedId}`).then(({ data }) => {
    return data;
  });
}
