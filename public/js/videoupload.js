const form = document.querySelector('form');
const seriesBtn = document.querySelector('.sris-btn');

const movies = document.querySelector('.movies');
const series = document.querySelector('.series');
const mvs = document.querySelector('.mvs');
const sris = document.querySelector('.sris');

let mi = document.querySelector('.mi');
let inputFile = document.querySelector('.movieImg');

sris.style.display = 'none';
mvs.style.display = 'block';
movies.classList.add('type-color-change');


const addEpisodeBtn = document.querySelector('.add-episode');
const episodes = document.querySelector('.eps');
let count = 2;

addEpisodeBtn.addEventListener('click', (e) => {
  // e.preventDefault();
  episodes.innerHTML += `<div><span class='ep-wrapper'>Episode ${count++}</span> | <input type="file" class="ep-file" name='epfile'></div>`
})

movies.addEventListener('click', (e) => {
  sris.style.display = 'none';
  series.classList.remove('type-color-change');
  mvs.style.display = 'block';
  movies.classList.add('type-color-change');

})

series.addEventListener('click', (e) => {
  sris.style.display = 'block';
  mvs.style.display = 'none';
  movies.classList.remove('type-color-change');
  series.classList.add('type-color-change')
});

document.querySelector('.close-upload-form').addEventListener('click', (e) => {
  document.querySelector('.fit').style.display = 'none';
})

function imageChange() {
  let imgLink = URL.createObjectURL(inputFile.files[0]);

  mi.src = imgLink;
}

form.addEventListener('submit', async function(e) {


  e.preventDefault();

  let formBtn = document.querySelector('.mvs-btn');
  formBtn.innerHTML = 'Uploading'

  const Data = new FormData(this);

  try {

    let res = await fetch('/admin/moviesupload', {
      method: 'POST',
      body: Data
    });

    let data = await res.json();

    if (data.error) {
      console.log(data.error);
    } else {
      formBtn.innerHTML = data.message;
    }
  } catch (err) {
    console.log(err);
  }

});


window.addEventListener('load', () => {
  document.querySelector('.moviefile').value = '';
})