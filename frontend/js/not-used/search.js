const button = document.getElementById('search-button');
const bar = document.getElementById('search-bar');
const container = document.getElementById('container')
const log = () => {
    let query = bar.value
    axios.get('https://wozniacki-booksapp.herokuapp.com/books?name='+query)
  .then(function (response) {
    if(response.data.name) {
        let data = response.data
        let name = data.name
        let author = data.author
        let date = data.release_date
        let rating = data.average
        let br = '<br>'
        container.innerHTML = 'Name: '+name+br+'Author: '+author+br+'Published: '+date+br+'Rating: '+rating;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

button.onclick = log