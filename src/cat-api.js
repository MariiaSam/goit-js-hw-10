import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_msdyLXd6fQ4XqkQOafThG3QlqI9pVAyJsQYWr21gOKoQrJvn3mlevFEdkllUWaMq';
// // axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export async function fetchBreeds() {
  const { data } = await axios.get('breeds');
    return data;
}

export async function fetchCatByBreed(breedId) {
    const { data } = await axios.get(`images/search?breed_ids=${breedId}`);
    return data;
  }