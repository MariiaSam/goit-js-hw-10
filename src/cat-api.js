import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_msdyLXd6fQ4XqkQOafThG3QlqI9pVAyJsQYWr21gOKoQrJvn3mlevFEdkllUWaMq';

  const  API_KEY = 'live_msdyLXd6fQ4XqkQOafThG3QlqI9pVAyJsQYWr21gOKoQrJvn3mlevFEdkllUWaMq';

const urlBreeds = 'https://api.thecatapi.com/v1/breeds';
const urlCat = 'https://api.thecatapi.com/v1/images';

export function fetchBreeds() {
  return axios.get(`${urlBreeds}`).then(response => {
  if(!response.status === 200) {
    throw new Error (response.statusText);
  } 
return response.data;
})
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${urlCat}?breed_ids=${breedId}}`).then(response => {
    if(!response.status === 200) {
      throw new Error (response.statusText);
    } 
  return response.data;
  })
}