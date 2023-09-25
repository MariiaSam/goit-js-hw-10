import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { elements } from './elements';
import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  'live_msdyLXd6fQ4XqkQOafThG3QlqI9pVAyJsQYWr21gOKoQrJvn3mlevFEdkllUWaMq';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

fetchBreeds().then(response => {
elements.selectCat.hidden = false;
elements.selectCat.innerHTML = response.map(({ id, name }) => {
    return `<option class = "option" value="${id}">${name}</option>`;
  }).join('');
  new SlimSelect({
    select: '#selectElement',
    settings: {
        showSearch: false,
        searchText: 'Ментор, вибачай, але нічого ти тут не побачиш!!!',
        searchPlaceholder: 'Знайдіть щось хороше!!',
        searchHighlight: true
      }, 
      events:{
        afterChange: newVal => {
        elements.loaderText.hidden = false;
    elements.infoCat.innerHTML = "";
fetchCatByBreed(newVal[0].value).then(response => {
elements.infoCat.innerHTML = response.map(({ url, beeds: [{ name, description, temperament}] }) => {
    return `
    <div class = "cat_photo">
    <img src="${url}" alt="${name}" ">
    </div>
    <div class = "cat_descript">
<h3>${name}</h3>
<p>${description}</p>
<p><b>Temperament:&nbsp</b>${temperament}</p></div>`;
}
).join("");
}).catch(() =>{
    Notiflix.Notify.failure(elements.errorText.textContent);
}).finally(() => (elements.loaderText.hidden = true))
}   
    }
  })
}).catch(() => {
    Notiflix.Notify.failure(elements.errorText.textContent);
}).finally(() => (elements.loaderText.hidden = true))