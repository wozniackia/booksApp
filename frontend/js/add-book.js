function hideModal () {
  modal.style.display = "none";
}

function handleFormSubmit(event) {
  button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
  // document.getElementById('listName').classList.add("placeholder");
  // document.getElementById('listAuthor').classList.add("placeholder");
  // document.getElementById('listDate').classList.add("placeholder");
  // document.getElementById('buttonRequest').classList.add("placeholder");
  event.preventDefault();
  let uri = 'https://openlibrary.org/search.json?q='+bookName.value;
  axios.get(uri)
    .then(function (response) {
      button.innerHTML = 'Search'
      sendRequest = () => {
        document.getElementById('addButton').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
        let uri2 = 'https://wozniacki-booksapp.herokuapp.com/books/addBook?name='+String(response.data.docs[0]["title"]).replaceAll(' ','+')
        axios.post(uri2)
          .then(function (response) {
            document.getElementById('addButton').innerHTML = 'Add'
            modal.style.display = "block";
          })
      }
      // document.getElementById('listName').classList.remove("placeholder");
      // document.getElementById('listAuthor').classList.remove("placeholder");
      // document.getElementById('listDate').classList.remove("placeholder");
      // document.getElementById('buttonRequest').classList.remove("placeholder");
      document.getElementById('listName').innerHTML = response.data.docs[0]["title"]
      document.getElementById('listAuthor').innerHTML = response.data.docs[0]["author_name"][0]
      document.getElementById('listDate').innerHTML = response.data.docs[0]["first_publish_year"]
      document.getElementById('addButton').onclick = sendRequest
    });
}

const button = document.getElementById('searchButton')
const lista = document.getElementById('lista')
const bookName = document.getElementById('bookName')
const formularz = document.getElementById('formularz')
const modal = document.getElementById('bookAddedModal')
const closeModal = document.getElementById('closeModal').onclick = hideModal
formularz.addEventListener('submit', handleFormSubmit);
