import { fetchBreeds, fetchCatByBreed } from './cat-api';
import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';



const elements = {
    select: document.querySelector('.breed-select'),
    loaderText: document.querySelector('.loader'),
   errorText: document.querySelector('.error').hidden = true,
    infoCat: document.querySelector('.cat-info'),
  };

fetchBreeds()
  .then(response => {
    elements.select.hidden = false;
    elements.select.innerHTML = response.map(({ id, name }) => {
        return `<option class = "option" value="${id}">${name}</option>`;
      })
      .join('');

    new SlimSelect({
        select: '#single',
      settings: {
        showSearch: false,
        searchText: 'Ментор, вибачай, але нічого ти тут не побачиш!!!',
        searchPlaceholder: 'Знайдіть щось хороше!!',
        searchHighlight: true,
      },
      events: {
        afterChange: newVal => {
          elements.loaderText.hidden = false;
          elements.infoCat.innerHTML = '';

          fetchCatByBreed(newVal[0].value)
            .then(response => {
              elements.infoCat.innerHTML = response
                .map(({ url, breeds: [{ name, description, temperament }] }) => {
                  return `
    <div class = "cat-photo">
    <img src="${url}" alt="${name}" ">
    </div>
    <div class = "cat-descript">
<h3>${name}</h3>
<p>${description}</p>
<p><b>Temperament:&nbsp</b>${temperament}</p></div>`;
                })
                .join('');
            })
            .catch(() => {
              Notiflix.Notify.failure(elements.errorText.textContent);
            })
            .finally(() => (elements.loaderText.hidden = true));
        },
 }
}
)
  })
  .catch(() => {
    Notiflix.Notify.failure(elements.errorText.textContent);
  })
  .finally(() => (elements.loaderText.hidden = true));