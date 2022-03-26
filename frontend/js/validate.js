function handleFormSubmit(event) {
  event.preventDefault();
  
  const data = new FormData(event.target);
  
  const formJSON = Object.fromEntries(data.entries());
  
  // let uri = 'https://wozniacki-booksapp.herokuapp.com/books/addBook?name='+formJSON.name;
  let uri = 'https://openlibrary.org/search.json?q='+formJSON.name;
    axios.post(uri)
    .then(function (response) {
    });
}

document.querySelector('form').addEventListener('submit', handleFormSubmit);