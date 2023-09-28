import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const elements = {
  select: document.querySelector('.breed-select'),
  loaderText: document.querySelector('.loader'),
  errorText: document.querySelector('.error').hidden = true,
  infoCat: document.querySelector('.cat-info'),
};

//================== 2 var ====================

function createBreedOptions(breeds) {
  return breeds
    .map(({ id, name }) => {
      return `<option class = "option" value="${id}">${name}</option>`;
    })
    .join('');
}

function displayCatInfo(catData) {
  return catData
    .map(({ url, breeds: [{ name, description, temperament }] }) => {
      return `<div class = "cat-photo">
        <img src="${url}" alt="${name}" ">
        </div>
        <div class = "cat-descript">
    <h3>${name}</h3>
    <p>${description}</p>
    <p><b>Temperament:&nbsp</b>${temperament}</p></div>`;
    })
    .join('');
}

function showErrorText(message) {
  elements.errorText.textContent = message;
  elements.errorText.hidden = false;

  setTimeout(() => {
    elements.errorText.hidden = true;
  }, 3000);
}

// ф-ція, яка ініціалізує бібл для  селекту з ідентиф - select: '#single',
function initializeSlimSelect() {
  new SlimSelect({
    select: '#single',
    settings: {
      showSearch: false,
      searchText: 'Ментор, вибачай, але нічого ти тут не побачиш!!!',
      searchPlaceholder: 'Знайдіть щось хороше!!',
      searchHighlight: true,
    },

    events: {
      afterChange: onBreedSelectChange,
    },
  });
}

function onBreedSelectChange(newVal) {
    elements.loaderText.hidden = false;
    elements.infoCat.innerHTML = '';
  
    fetchCatByBreed(newVal[0].value)
      .then((response) => {
        elements.infoCat.innerHTML = displayCatInfo(response);
      })
      .catch((error) => {
        Notiflix.Notify.failure(error.message);
      })
      .finally(() => {
        elements.loaderText.hidden = true;
      });
  }


fetchBreeds()
  .then(response => {
    elements.select.hidden = false;
    elements.select.innerHTML = createBreedOptions(response);
    initializeSlimSelect();
  })
  .catch(error => {
    showErrorText(error.message)})
    .finally(() => (elements.loaderText.hidden = true));
 


// ======================1 var ===== The first variant of the completed work====================

//   // виконується ф-ція для отримання списку порід. 1) якщо усп -  вибір породи (select) та відмальовується розмітка з опціями
// fetchBreeds()
//   .then(response => {
//     elements.select.hidden = false;
//     elements.select.innerHTML = response.map(({ id, name }) => {
//         return `<option class = "option" value="${id}">${name}</option>`;
//       })
//       .join('');

//     new SlimSelect({
//         select: '#single',
//       settings: {
//         showSearch: false,
//         searchText: 'Ментор, вибачай, але нічого ти тут не побачиш!!!',
//         searchPlaceholder: 'Знайдіть щось хороше!!',
//         searchHighlight: true,
//       },
//       events: {
//         afterChange: newVal => {
//           elements.loaderText.hidden = false;
//           elements.infoCat.innerHTML = '';

//           fetchCatByBreed(newVal[0].value)
//             .then(response => {
//               elements.infoCat.innerHTML = response
//                 .map(({ url, breeds: [{ name, description, temperament }] }) => {
//                   return `
//     <div class = "cat-photo">
//     <img src="${url}" alt="${name}" ">
//     </div>
//     <div class = "cat-descript">
// <h3>${name}</h3>
// <p>${description}</p>
// <p><b>Temperament:&nbsp</b>${temperament}</p></div>`;
//                 })
//                 .join('');
//             })
//             // обробка помилок під час виконання НТТР запитів
//             .catch(() => {
//               Notiflix.Notify.failure(elements.errorText.textContent);
//             })
//             .finally(() => (elements.loaderText.hidden = true));
//         },
//  }
// }
// )
//   })
//   .catch(() => {
//     Notiflix.Notify.failure(elements.errorText.textContent);
//   })
//   .finally(() => (elements.loaderText.hidden = true));
