const bookCover1 = document.getElementById('bookCover1')
const bookName1 = document.getElementById('bookName1')
const bookCover2 = document.getElementById('bookCover2')
const bookName2 = document.getElementById('bookName2')
const bookCover3 = document.getElementById('bookCover3')
const bookName3 = document.getElementById('bookName3')
const bookCover4 = document.getElementById('bookCover4')
const bookName4 = document.getElementById('bookName4')
const bookCover5 = document.getElementById('bookCover5')
const bookName5 = document.getElementById('bookName5')
const bookCover6 = document.getElementById('bookCover6')
const bookName6 = document.getElementById('bookName6')
const bookCover7 = document.getElementById('bookCover7')
const bookName7 = document.getElementById('bookName7')
const bookCover8 = document.getElementById('bookCover8')
const bookName8 = document.getElementById('bookName8')
const bookCover9 = document.getElementById('bookCover9')
const bookName9 = document.getElementById('bookName9')

function fetchRatings(pageNum) {
    axios.get('https://wozniacki-booksapp.herokuapp.com/books')
        .then(function( response) {
            for(let i = (pageNum-1)*9; i < 9*pageNum; i++) {
                if(response.data[i].average != 0) {
                    document.getElementById(`bookRating${i-((pageNum-1)*9-1)}`).innerHTML = `Average: ${response.data[i].average}`
                } else {
                    document.getElementById(`bookRating${i-((pageNum-1)*9-1)}`).innerHTML = `No ratings yet :(`
                }
            }
        })
}

function fetchCovers(pageNum) {
  axios.get('https://wozniacki-booksapp.herokuapp.com/books?items='+(9*pageNum))
  .then(function (response) {
      bookName1.innerHTML = response.data[0+(pageNum-1)*9].name
      bookCover1.src = response.data[0+(pageNum-1)*9].cover
      bookName2.innerHTML = response.data[1+(pageNum-1)*9].name
      bookCover2.src = response.data[1+(pageNum-1)*9].cover
      bookName3.innerHTML = response.data[2+(pageNum-1)*9].name
      bookCover3.src = response.data[2+(pageNum-1)*9].cover
      bookName4.innerHTML = response.data[3+(pageNum-1)*9].name
      bookCover4.src = response.data[3+(pageNum-1)*9].cover
      bookName5.innerHTML = response.data[4+(pageNum-1)*9].name
      bookCover5.src = response.data[4+(pageNum-1)*9].cover
      bookName6.innerHTML = response.data[5+(pageNum-1)*9].name
      bookCover6.src = response.data[5+(pageNum-1)*9].cover
      bookName7.innerHTML = response.data[6+(pageNum-1)*9].name
      bookCover7.src = response.data[6+(pageNum-1)*9].cover
      bookName8.innerHTML = response.data[7+(pageNum-1)*9].name
      bookCover8.src = response.data[7+(pageNum-1)*9].cover
      bookName9.innerHTML = response.data[8+(pageNum-1)*9].name
      bookCover9.src = response.data[8+(pageNum-1)*9].cover
  })
  .catch(function (error) {
    console.log(error);
  });
}

fetchCovers(1);
fetchRatings(1)