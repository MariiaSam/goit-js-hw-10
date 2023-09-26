import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_msdyLXd6fQ4XqkQOafThG3QlqI9pVAyJsQYWr21gOKoQrJvn3mlevFEdkllUWaMq';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios.get('breeds').then(({ data }) => {
    return data;
  });
}

export function fetchCatByBreed(breedId) {
    return axios.get(`images/search?breed_ids=${breedId}`).then(({ data }) => {
      return data;
    });
  }