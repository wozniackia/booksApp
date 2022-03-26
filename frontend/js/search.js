const button = document.getElementById('search-button');
const bar = document.getElementById('search-bar');
const album = document.getElementsByClassName('album')
const cover = document.getElementById('bookCover')
const title = document.getElementById('bookName')
const author = document.getElementById('bookAuthor')
const rating = document.getElementById('bookRating')
const log = () => {
    let query = bar.value
    axios.get('https://wozniacki-booksapp.herokuapp.com/books?name='+query)
  .then(function (response) {
    if(response.data.name) {
        if(album[0].classList.contains('visually-hidden')) {
          album[0].classList.remove('visually-hidden')
        }
        cover.src = response.data.cover
        title.innerHTML = response.data.name
        author.innerHTML = response.data.author[0]
        rating.innerHTML = response.data.average
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

button.onclick = log