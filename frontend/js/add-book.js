function hideModal () {
  modal.style.display = "none";
}

function handleFormSubmit(event) {
  document.getElementById('listName').classList.add("placeholder");
  document.getElementById('listAuthor').classList.add("placeholder");
  document.getElementById('listDate').classList.add("placeholder");
  document.getElementById('buttonRequest').classList.add("placeholder");
  event.preventDefault();
  let uri = 'https://openlibrary.org/search.json?q='+bookName.value;
  axios.get(uri)
    .then(function (response) {
      sendRequest = () => {
        let uri2 = 'https://wozniacki-booksapp.herokuapp.com/books/addBook?name='+response.data.docs[0]["title"]
        axios.post(uri2)
          .then(function (response) {
            console.log('yupi')
            modal.style.display = "block";
          })
      }
      document.getElementById('listName').classList.remove("placeholder");
      document.getElementById('listAuthor').classList.remove("placeholder");
      document.getElementById('listDate').classList.remove("placeholder");
      document.getElementById('buttonRequest').classList.remove("placeholder");
      document.getElementById('listName').innerHTML = response.data.docs[0]["title"]
      document.getElementById('listAuthor').innerHTML = response.data.docs[0]["author_name"][0]
      document.getElementById('listDate').innerHTML = response.data.docs[0]["first_publish_year"]
      document.getElementById('buttonRequest').onclick = sendRequest
      lista.classList.remove("visually-hidden");
    });
}

const lista = document.getElementById('lista')
const bookName = document.getElementById('bookName')
const formularz = document.getElementById('formularz')
const modal = document.getElementById('bookAddedModal')
const closeModal = document.getElementById('closeModal').onclick = hideModal
formularz.addEventListener('submit', handleFormSubmit);
